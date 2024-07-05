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
  ```shell
  export GH_TOKEN=<YOUR TOKEN>
  ```
  This step is only needed temporarily until all packages are available open source
- Flux: [Install the Flux CLI](https://fluxcd.io/flux/installation/) on macOS or Linux using Homebrew:
    ```sh
    brew install fluxcd/tap/flux
    ```

## Repository structure

The Git repository contains the following top directories:

- **apps** dir contains Helm releases with a custom configuration per cluster
- **infrastructure** dir contains common infra tools such as ingress-nginx and cert-manager

## Bootstrap local environment

The `start.sh` contains all steps needed to bootstrap the local environment. The script will automate the following steps:
- Create kind cluster called `openmfp`
- install flux
- prepare secrets
- apply flux deployment configuration

For minimal footprint and UI only you can run
```sh
sh ./start.sh min
```

For all openmfp components currently integrated you can run
```sh
sh ./start.sh all
```

Once the process is completed you can access the environment using http://localhost:8000
