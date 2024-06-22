1. Connect to a cluster or create one with `kind create cluster --config kind-config.yaml`
1. (Temporary Credentials required) Export your PAT `export GH_TOKEN=<YOURPAT>`
1. run `./start.sh`
1. Run again resources `kubectl apply -k ./`
1. Access portal using `http://localhost`

# TODO

1. Keycloak realm initialisation (currently we use the master realm)
1. Dynamic oidc configuration for internal portal
1. It does not work when the portal is exposed on 8080, as the token call does not seem to send a port, it is fixed when switching to port 80
1. Currently it seems the used TOKEN url is wrong, see https://github.com/openmfp/portal/blob/3163ea955995109d2a0728e004ee202aedc2f711/backend/libs/portal-lib/src/auth/auth.service.ts#L112, we need to make this configurable
1. Portal chart needs ContentConfiguration