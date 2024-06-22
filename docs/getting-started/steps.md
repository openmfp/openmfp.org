1. Connect to a cluster or create one with `kind create cluster --config kind-config.yaml`
1. Install flux `flux install --components source-controller,helm-controller`
1. (Temporary Credentials required) `flux create secret oci ghcr-credentials --url ghcr.io --username aaronschweig --password $(gh auth token) -n openmfp-system`
1. Keycloak secret `k create secret generic portal-client-secret-openmfp -n openmfp-system --from-literal secret=<client-secret>` // I want to automatate this
1. Apply resources `kubectl apply -k apps/local`


# TODO

1. Keycloak realm initialisation
1. Keycloak needs a client
1. Dynamic oidc configuration for internal portal