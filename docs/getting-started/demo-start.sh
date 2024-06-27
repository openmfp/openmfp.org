#!/bin/sh
set -e
COL='\033[92m'
COL_RES='\033[0m'

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
  kind create cluster --config kind-config.yaml --name openmfp
    echo -e "$COL Creating kind cluster. Complete $COL_RES"
fi

# Install flux
echo "$COL Installing flux $COL_RES"
flux install --components source-controller,helm-controller
echo "$COL Installing flux. Complete $COL_RES"

# Prepare installation namespace
echo "$COL Creating openmfp-system namespace $COL_RES"
kubectl apply -k ./infrastructure/namespace

echo "$COL creating secret for ghcr.io $COL_RES"
flux create secret oci ghcr-credentials -n openmfp-system --url ghcr.io --username $(gh api user | jq -r '.login') --password $GH_TOKEN

echo "$COL creating secret for keycloak $COL_RES"
kubectl create secret generic keycloak-admin -n openmfp-system --from-literal=secret=admin --dry-run=client -o yaml | kubectl apply -f -


