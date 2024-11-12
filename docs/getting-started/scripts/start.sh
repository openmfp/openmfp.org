#!/bin/sh

set -e
COL='\033[92m'
COL_RES='\033[0m'
# argument to select the installation flavor, options are all or min, verify if the argument was provided
if [ "${1}" != "all" ] && [ "${1}" != "min" ] && [ "${1}" != "remote" ]; then
    echo "Invalid installation flavor provided, please provide either all (start.sh all) or min (start.sh min)"
    exit 1
fi

# Check for input argument GH_TOKEN and echo message in case not provided
if [ -z "${GH_TOKEN}" ]; then
    echo "Please provide the GitHub Token as an environment variable"
    exit 1
fi

# Check if kind cluster kind is already running, exit if yes
if [ $(kind get clusters | grep -c openmfp) -gt 0 ]; then
    echo -e "$COL Kind cluster already running, using existing $COL_RES"
    kind export kubeconfig --name openmfp
else
  echo -e "$COL Creating kind cluster $COL_RES"
  if [ "${1}" == "remote" ]; then
    kind create cluster --config kind/remote-config.yaml --name openmfp --image=kindest/node:v1.30.2
  else
    webhook-config/gen-certs.sh
    kind create cluster --config kind/webhook-config.yaml --name openmfp --image=kindest/node:v1.30.2
  fi
fi

# Install flux
echo "$COL Installing flux $COL_RES"
flux install --components source-controller,helm-controller

# Prepare installation namespace
echo "$COL Creating openmfp-system namespace $COL_RES"
kubectl apply -k infrastructure/namespace

echo "$COL Creating necessary secrets $COL_RES"
if [ "${1}" != "remote" ]; then
    kubectl create secret tls ora-iam-authorization-webhook -n openmfp-system --key webhook-config/tls.key --cert webhook-config/tls.crt --dry-run=client -o yaml | kubectl apply -f -
fi
flux create secret oci ghcr-credentials -n openmfp-system --url ghcr.io --username $(gh api user | jq -r '.login') --password $GH_TOKEN
kubectl create secret generic keycloak-admin -n openmfp-system --from-literal=secret=admin --dry-run=client -o yaml | kubectl apply -f -


echo "$COL starting deployments $COL_RES"
kubectl apply -k flavors/local-${1}

if [ "${1}" = "all" ]; then
    # wait for cert-manager to be ready
    sleep 5
    kubectl wait --namespace cert-manager \
      --for=condition=Ready pods \
      --selector=app.kubernetes.io/instance=cert-manager \
      --timeout=120s

    sleep 80
    echo "Waiting for kcp-front-proxy to become ready"
    kubectl wait --namespace openmfp-system \
        --for=condition=Ready pods \
        --selector=app.kubernetes.io/component=front-proxy \
        --timeout=720s

    KCP_CA_SECRET=openmfp-kcp-front-proxy-cert
    KCP_ADMIN_SECRET=kcp-cluster-admin-client-cert
    kubectl get secret $KCP_CA_SECRET -n openmfp-system -o=jsonpath='{.data.tls\.crt}' | base64 -d > kcp/ca.crt
    kubectl --kubeconfig=$PWD/kcp/admin.kubeconfig config set-cluster workspace.kcp.io/current --server https://kcp.dev.local:8443/clusters/root --certificate-authority=kcp/ca.crt
    kubectl get secret $KCP_ADMIN_SECRET -n openmfp-system -o=jsonpath='{.data.tls\.crt}' | base64 -d > kcp/client.crt
    kubectl get secret $KCP_ADMIN_SECRET -n openmfp-system -o=jsonpath='{.data.tls\.key}' | base64 -d > kcp/client.key
    chmod 600 kcp/client.crt kcp/client.key
    kubectl --kubeconfig=$PWD/kcp/admin.kubeconfig config set-credentials kcp-admin --client-certificate=kcp/client.crt --client-key=kcp/client.key
    kubectl --kubeconfig=$PWD/kcp/admin.kubeconfig config set-context workspace.kcp.io/current --cluster=workspace.kcp.io/current --user=kcp-admin
    kubectl --kubeconfig=$PWD/kcp/admin.kubeconfig config use-context workspace.kcp.io/current

    echo "\033[0;31mIMPORTANT:\033[0m Waiting for kcp-front-proxy to be ready"
    kubectl wait --namespace openmfp-system \
      --for=condition=Ready pods \
      --selector=app.kubernetes.io/component=front-proxy \
      --timeout=720s

    echo "\033[0;31mIMPORTANT:\033[0m Please create an entry in your /etc/hosts with the following line: `127.0.0.1       kcp.dev.local`"
    echo "Once kcp is up and running, run '\033[0;32mexport KUBECONFIG=$(pwd)/kcp/admin.kubeconfig\033[0m' to gain access to the root workspace."
fi
