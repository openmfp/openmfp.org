# Extending Luigi Global Context

The `luigiExtendedGlobalContextConfigService` option allows you to inject custom data into the
[Luigi's global context](https://docs.luigi-project.io/docs/navigation-parameters-reference?section=globalcontext) . 
This data becomes available to all micro-frontends integrated into the portal.


## Default Context Data

By default, the Portal UI Library automatically populates the global context with the following information:

```json
{
  "portalContext": { ... }, // data retrieved from the portal backend with /rest/config call
  "portalBaseUrl": "[https://your-portal.com](https://your-portal.com)",
  "userId": "unique-user-id",
  "userEmail": "user@example.com",
  "token": "id-token-string"
}
```

## LuigiExtendedGlobalContextConfigService Interface

```ts
export interface LuigiExtendedGlobalContextConfigService {
    createLuigiExtendedGlobalContext(): Promise<any>;
}
```

## Provide your implemented service

Your implementation should define the additional properties you want to share across your micro-frontend ecosystem, 
such as environment flags or global configuration strings.

```ts
import {
    LuigiExtendedGlobalContextConfigService
} from '@openmfp/portal-ui-lib';
import { Injectable } from '@angular/core';

@Injectable()
export class LuigiExtendedGlobalContextConfigServiceImpl
    implements LuigiExtendedGlobalContextConfigService {

    /**
     * Defines custom data to be appended to the default Luigi global context.
     */
    async createLuigiExtendedGlobalContext(): Promise<any> {
        // You could also fetch data from an API here
        return {
            isLocal: true,
            analyticsConfig: 'production-v1',
            themeVariant: 'dark'
        };
    }
}
```

## Registering the service during application bootstrap

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import {
    PortalComponent,
    PortalOptions,
    providePortal,
} from '@openmfp/portal-ui-lib';
import {
    LuigiExtendedGlobalContextConfigServiceImpl
} from './global-context.service';

const portalOptions: PortalOptions = {
    // Reference the service class here. The library handles instantiation.
    luigiExtendedGlobalContextConfigService: LuigiExtendedGlobalContextConfigServiceImpl,
    // ... other portal options
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));
```

