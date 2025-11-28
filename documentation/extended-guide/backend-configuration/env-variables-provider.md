# Passing additional env variables to the portal

To provide additional environment variables to the portal, you need to implement the `EnvVariablesService` 
interface and provide it to the portal options.

## EnvVariablesService Interface

The interface is defined as follows:

```ts
export interface EnvVariablesService {
    getEnv: (
        request: Request,
        response: Response,
    ) => Promise<Record<string, object>>;
}
```

The `getEnv` method is called by the application during environment variables retrieval (`/rest/envconfig` call) and receives the following parameters:
* `request`: the incoming request object
* `response`: the outgoing response object

## Provide your implemented service to the portal options

```ts
import { Module } from '@nestjs/common';
import { PortalModule, PortalModuleOptions } from '@openmfp/portal-server-lib';

const portalOptions: PortalModuleOptions = {
    envVariablesProvider: EnvVariablesServiceImpl
};

@Module({
    imports: [PortalModule.create(portalOptions)],
})
export class AppModule {}
```
