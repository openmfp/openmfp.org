1. Connect to a cluster or create one with `kind create cluster --config kind-config.yaml`
1. (Temporary Credentials required) Export your PAT `export GH_TOKEN=<YOURPAT>`
1. run `./start.sh`
1. Run again resources `kubectl apply -k ./`
1. Access portal using `http://localhost`

# TODO

1. Keycloak realm initialisation
1. Keycloak needs a client
1. Dynamic oidc configuration for internal portal