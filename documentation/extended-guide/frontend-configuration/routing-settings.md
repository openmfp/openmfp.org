# Customizing Luigi Routing Configuration

To customize the routing behavior within Luigi (e.g., hash usage, modal URL parameters, or 404 error handling), 
you must implement the `RoutingConfigService` interface and provide your custom service during 
the application bootstrap. This service allows you to override any default
[Luigis routing settings](https://docs.luigi-project.io/docs/navigation-parameters-reference?section=routing-parameters)

## RoutingConfigService Interface

The `RoutingConfigService` interface defines two synchronous methods used to configure 
routing at different stages of the Luigi lifecycle:

```ts
export interface RoutingConfigService {
    getInitialRoutingConfig(): any;
    getRoutingConfig(): any;
}
```

## Provide your implemented service

```ts
import { Injectable, inject } from '@angular/core';
import { RoutingConfigService } from '@openmfp/portal-ui-lib';

@Injectable()
export class CustomRoutingConfigService implements RoutingConfigService {

    /**
     * Defines the initial Luigi routing configuration.
     */
    getInitialRoutingConfig(): any {
        return {
            useHashRouting: false,
            showModalPathInUrl: false,
            modalPathParam: 'modalPathParamDisabled',
            skipRoutingForUrlPatterns: [/.*/],
            pageNotFoundHandler: () => {},
        };
    }

    /**
     * Defines the routing configuration after initialization.
     */
    getRoutingConfig(): any {
        return {
            useHashRouting: false,
            showModalPathInUrl: true,
            modalPathParam: 'modal',
            pageNotFoundHandler: (
                notFoundPath: string,
                isAnyPathMatched: boolean,
            ) => {
                return {
                    redirectTo: 'error/404',
                    keepURL: true,
                };
            },
        };
    }
}
```

* The `getInitialRoutingConfig()` is invoked while constructing the initial Luigi configuration object.
* The `getRoutingConfig()` is invoked during the Luigi lifecycle hook luigiAfterInit. This configuration adds additional setup to the root of the Luigi configuration object.

## Registering the service during application bootstrap

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import {
    PortalComponent,
    PortalOptions,
    providePortal,
} from '@openmfp/portal-ui-lib';
import { CustomRoutingConfigService } from './custom-routing-config.service'; // Import your new service

const portalOptions: PortalOptions = {
    // Reference the service class here. The library will instantiate it.
    routingConfigService: CustomRoutingConfigService,
    // ... other portal options
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));
```

