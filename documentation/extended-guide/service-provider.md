# Registering a Service Provider

A service provider is one of the main custom services that **needs** to be implemented and registered in the server. 
Its purpose is to read and provide the necessary configuration data used to display the ui parts of the application.
When nothing is provided, the application will use the default configuration displaying the ui parts with the documentation. 

## ServiceProviderService Interface

The interface is defined as follows:

```ts
export interface ServiceProviderService {
    getServiceProviders(
        token: string,
        entities: string[],
        context: Record<string, any>,
    ): Promise<ServiceProviderResponse>;
}
```

The `getServiceProviders` method is called by the application during configuration retrieval (`/rest/config` or `/rest/config/:entity` call) and receives the following parameters:
* `token`: the id token of the logged user.
* `entities`: the list of entities for which the user will retrieve configuration data.
* `context`: the context of the application containing the incoming request query parameters.


## Provide your implemented service to the portal options

```ts
import { Module } from '@nestjs/common';
import {
  PortalModule,
  PortalModuleOptions,
} from '@openmfp/portal-server-lib';

const portalOptions: PortalModuleOptions = {
  serviceProviderService: ServiceProviderServiceImpl
};

@Module({
  imports: [PortalModule.create(portalOptions)],
})
export class AppModule {}
```
