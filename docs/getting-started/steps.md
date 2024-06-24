1. (Temporary Credentials required) Export your PAT `export GH_TOKEN=<YOURPAT>`
1. run `./start.sh`
1. Access portal using `http://localhost:8080`

# TODO

1. Portal chart needs ContentConfiguration and the k8s client needs to be merged, we need to avoid loading gardener by default (BE)
2. investigate why email is not displayed in UI (AS)
3. fix claims mapping for first_name and last_name and mail (AS)
2. (optional) Make logout work
3. prepare demo crd gateway (AS)
4. deploy crd gateway (AS)
4. prepare demo chart with demo contentConfigurations, demo accounts
5. Prepare account UI's ....
6. investigate nginx or istio usage for improved security