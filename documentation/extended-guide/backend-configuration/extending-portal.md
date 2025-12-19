# Extending portal

It might be required to extend the portal with additional custom controllers or providers. 
To do so, you can implemement them according to the nest.js requirements and add to the portal with the following options.
Optionally, you can as well create a separate module for your custom controllers and providers.

## Provide your implemented services to the portal options

```ts
import { Module } from '@nestjs/common';
import { PortalModule, PortalModuleOptions } from '@openmfp/portal-server-lib';

const portalOptions: PortalModuleOptions = {
    additionalControllers: [GithubTokenController],
    additionalProviders: [IAMService]
};

@Module({
    imports: [PortalModule.create(portalOptions)],
})
export class AppModule {}
```
