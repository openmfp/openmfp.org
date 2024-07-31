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
