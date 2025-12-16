# Adding portal context providers

To provide additional data or configuration to integrated micro frontends via luigi context, 
you can add a service that implements the `PortalContextProvider` interface.

## PortalContextProvider Interface

The interface is defined as follows:

```ts
export interface PortalContextProvider {
    getContextValues(
        request: Request,
        response: Response,
        portalContext: Record<string, any>,
    ): Promise<Record<string, any>>;
}
```

The `getContextValues` method is called by the application during configuration retrieval (`/rest/config` call) and receives the following parameters:
* `request`: the incoming request object
* `response`: the outgoing response object
* `portalContext`: already created portal context object containing all the environment variables prefixed with [OPENMFP_PORTAL_CONTEXT_](https://github.com/openmfp/portal-server-lib/blob/main/README.md#consuming-the-library)

The return value is available afterward in the micro frontends in the [luigi context](https://github.com/openmfp/portal-ui-lib/blob/main/docs/readme-luigi-context.md) under the property `portalContext`.

```json
{
    "portalContext": {
        "avatarUrl": "http://example.com/avatar",
        "iamUrl": "http://example.com/iam"
    }
}
```

## Provide your implemented service to the portal options

```ts
import { Module } from '@nestjs/common';
import { PortalModule, PortalModuleOptions } from '@openmfp/portal-server-lib';

const portalOptions: PortalModuleOptions = {
    portalContextProvider: PortalContextProviderImpl
};

@Module({
    imports: [PortalModule.create(portalOptions)],
})
export class AppModule {}
```
