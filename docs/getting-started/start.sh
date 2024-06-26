#!/bin/sh
set -ex

# Check for input argument GH_TOKEN and echo message in case not provided
if [ -z "${GH_TOKEN}" ]; then
    echo "Please provide the GitHub Token as an environment variable"
    exit 1
fi

# Check if kind cluster kind is already running, exit if yes
if [ $(kind get clusters | grep -c openmfp) -gt 0 ]; then
    echo "Kind cluster already running, using existing"
    kind export kubeconfig --name openmfp
else
  kind create cluster --config kind-config.yaml --name openmfp
fi

# Install flux
flux install --components source-controller,helm-controller

# Prepare installation namespace
kubectl apply -k ./infrastructure/namespace

set +x
echo "creating secret for ghcr.io"
flux create secret oci ghcr-credentials -n openmfp-system --url ghcr.io --username $(gh api user | jq -r '.login') --password $GH_TOKEN

echo "creating secret for keycloak"
kubectl create secret generic keycloak-admin -n openmfp-system --from-literal=secret=admin --dry-run=client -o yaml | kubectl apply -f -
set -x

kubectl apply -k ./


