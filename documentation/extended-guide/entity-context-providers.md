# Adding entity context providers

With any entity you define in your application, you can add an entity context provider that will be called by the portal to 
retrieve additional data based on that entity and entity's identity retrieved from the context.

## EntityContextProvider Interface

The interface is defined as follows:

```ts
export interface EntityContextProvider {
    getContextValues(
        token: string,
        context: Record<string, any>,
    ): Promise<Record<string, any>>;
}
```

The `getContextValues` method is called by the application during configuration retrieval of the entity (`/rest/config/:entity` call) and receives the following parameters:
* `token`: the id token of the logged user.
* `context`: the context of the application containing the incoming request query parameters.

The return value is available afterward in the Micro frontends in the luigi context under the property `entityContext`.

## Provide your implemented service to the portal options

```ts
import { Module } from '@nestjs/common';
import { PortalModule, PortalModuleOptions } from '@openmfp/portal-server-lib';

const portalOptions: PortalModuleOptions = {
    entityContextProviders: {
        project: ProjectEntityContextProvider,
        team: TeamEntityContextProvider,
    },
};

@Module({
    imports: [PortalModule.create(portalOptions)],
})
export class AppModule {}
```
