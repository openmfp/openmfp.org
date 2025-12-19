# Customizing Entity Error Handling

The `errorComponentConfig` option allows you to define custom navigation 
behavior when the library fails to retrieve an entity configuration. 
By default, the library displays a simple alert with the error message. 
By providing this configuration, 
you can instead redirect users to custom error pages or "not found" views.

## ErrorComponentConfig Interface

```ts
export interface ErrorComponentConfig {
    /**
     * Triggered when an entity configuration retrieval fails.
     * @param entityDefinition The definition of the entity that failed to load.
     * @param errorCode The HTTP status code returned by the server (e.g., 404, 500).
     * @param additionalContext Optional metadata regarding the failure.
     * @returns An array of LuigiNode objects to be displayed as a fallback.
     */
    handleEntityRetrievalError(
        entityDefinition: EntityDefinition,
        errorCode: number,
        additionalContext?: Record<string, string>,
    ): LuigiNode[];
}
```

## Provide your implemented service

```ts
import { ErrorComponentConfig, EntityDefinition, LuigiNode } from '@openmfp/portal-ui-lib';

const errorComponentConfig: ErrorComponentConfig = {
    handleEntityRetrievalError: (
        entityDefinition: EntityDefinition,
        errorCode: number,
        additionalContext?: Record<string, string>,
    ): LuigiNode[] => {
        if (errorCode === 404) {
            return [
                {
                    pathSegment: 'not-found',
                    label: 'Not Found',
                    viewUrl: '/assets/not-found.html',
                },
            ];
        }

        return [
            {
                pathSegment: 'error',
                label: 'Error',
                viewUrl: `/assets/error.html?code=${errorCode}`,
            },
        ];
    },
};
```

## Registering the service during application bootstrap

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import {
    PortalComponent,
    PortalOptions,
    providePortal,
} from '@openmfp/portal-ui-lib';
import { errorComponentConfig } from './error-config';

const portalOptions: PortalOptions = {
    // Pass the configuration object directly
    errorComponentConfig: errorComponentConfig,
    // ... other portal options
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));

```
