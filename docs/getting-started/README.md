# OpenMFP - Getting Started

[![test](https://github.com/fluxcd/flux2-kustomize-helm-example/workflows/test/badge.svg)](https://github.com/fluxcd/flux2-kustomize-helm-example/actions)
[![e2e](https://github.com/fluxcd/flux2-kustomize-helm-example/workflows/e2e/badge.svg)](https://github.com/fluxcd/flux2-kustomize-helm-example/actions)
[![license](https://img.shields.io/github/license/fluxcd/flux2-kustomize-helm-example.svg)](https://github.com/fluxcd/flux2-kustomize-helm-example/blob/main/LICENSE)

For this example we create a functioning local setup using kind.
The end goal is to leverage Flux and Kustomize to manage the cluster.

We will configure Flux to install, test and upgrade a demo app using
`OCIRepository` and `HelmRelease` custom resources.
Flux will monitor the Helm repository, and it will automatically
upgrade the Helm releases to their latest chart version based on semver ranges.

## Prerequisites

- [Docker](https://www.docker.com) or [podman](https://podman.io): install either docker or podman in order to run the kind cluster
- [jq](https://jqlang.github.io/jq/): install for example using Homebrew:
  ```sh
  brew install jq
  ```
- GitHub CLI: In order to interact with Github via CLI: [Github CLI]([https://kind.sigs.k8s.io/docs/user/quick-start/](https://cli.github.com/))
  On macOS or Linux using Homebrew:
  ```sh
  brew install gh
  ```
- Kind: In order to have a local kubernetes cluster you can use kind. Kind Installation: [Kind Quick Start](https://kind.sigs.k8s.io/docs/user/quick-start/)
  On macOS or Linux using Homebrew:
  ```sh
  brew install kind
  ```
- Github Token: You'll need a GitHub account and a [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line). that can create repositories (minimum permissions `read:packages`).
  ```sh
  export GH_TOKEN=<YOUR TOKEN>
  ```
  This step is only needed temporarily until all packages are available open source
- Flux: [Install the Flux CLI](https://fluxcd.io/flux/installation/) on macOS or Linux using Homebrew:
    ```sh
    brew install fluxcd/tap/flux
    ```
- [kubectl-kcp](https://docs.kcp.io/kcp/v0.24/setup/kubectl-plugin/).

## Repository structure

The Git repository contains the following top directories:

- **apps** dir contains Helm releases with a custom configuration per cluster
- **infrastructure** dir contains common infra tools such as ingress-nginx and cert-manager

## Bootstrap local environment

The `scripts/start.sh` contains all steps needed to bootstrap the local environment. The script will automate the following steps:
- Create kind cluster called `openmfp`
- install flux
- prepare secrets
- apply flux deployment configuration

For minimal footprint and UI only you can run
```sh
./scripts/start.sh min
```

For all openmfp components currently integrated you can run
```sh
./scripts/start.sh all
```

Once the process is completed you can access the environment using http://localhost:8000


## Bootstrap remote environment

This flavor is meant to reuse many components from a already running openmfp environment. This is particularly useful 
for local development of micro frontend applications. After running the installation script using:
```sh
sh ./start.sh remote
```

You need to configure the keycloak client secret that the portal running ont he kind cluster should use
```sh
CLIENT_ID=$(echo "<CLIENT>" | base64)
CLIENT_SECRET=$(echo "<SECRET>" | base64)

echo "
apiVersion: v1
data:
  id: $CLIENT_ID
  secret: $CLIENT_SECRET
kind: Secret
metadata:
  name: portal-client-secret-openmfp
  namespace: openmfp-system
type: Opaque
" | kubectl apply -f -
```
