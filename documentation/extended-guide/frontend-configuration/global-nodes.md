# Defining Custom Global Nodes

The `customGlobalNodesService` option allows you to define and inject global-level Luigi Nodes into 
your application. These nodes are typically used for top-navigation items or 
global utility links that remain accessible regardless of the current micro-frontend context.

## CustomGlobalNodesService Interface

The `CustomGlobalNodesService` interface requires an asynchronous method that returns an array of LuigiNode objects.

```ts
export interface CustomGlobalNodesService {
    /**
     * Returns a Promise resolving to an array of LuigiNode objects
     * to be added to the global navigation level.
     */
    getCustomGlobalNodes(): Promise<LuigiNode[]>;
}
```

## Provide your implemented service

In your implementation, you can define nodes that point to external links or internal view URLs. You can also 
define specific entityType properties to control where these nodes appear in the Luigi shell.

```ts
import {
    LuigiNode,
    CustomGlobalNodesService
} from '@openmfp/portal-ui-lib';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomGlobalNodesServiceImpl implements CustomGlobalNodesService {

    /**
     * Orchestrates the creation of global nodes.
     */
    async getCustomGlobalNodes(): Promise<LuigiNode[]> {
        return [
            this.createHelpCenterNode(),
            this.createSettingsNode(),
        ];
    }

    private createHelpCenterNode(): LuigiNode {
        return {
            label: 'Help Center',
            entityType: 'global.topnav', // Categorizes the node for top navigation
            url: '[https://docs.example.com](https://docs.example.com)',
            // ... other luigi node properties
        };
    }

    private createSettingsNode(): LuigiNode {
        return {
            label: 'Global Settings',
            entityType: 'global.topnav',
            pathSegment: 'global-settings',
            urlSuffix: '/assets/views/settings.html',
            icon: 'settings'
            // ... other luigi node properties
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
import { CustomGlobalNodesServiceImpl } from './global-nodes.service';

const portalOptions: PortalOptions = {
    // Reference the service class here. The library handles instantiation.
    customGlobalNodesService: CustomGlobalNodesServiceImpl,
    // ... other portal options
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));

```

