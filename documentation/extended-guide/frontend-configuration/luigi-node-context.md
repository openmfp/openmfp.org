# Extending Node Context

The `nodeContextProcessingService` option allows you to inject custom data into the
[Luigi's global context](https://docs.luigi-project.io/docs/navigation-parameters-reference?section=globalcontext) of a node while navigating to that node. 
This data becomes available to the navigated micro-frontend and all it's children.

## LuigiExtendedGlobalContextConfigService Interface

```ts
export interface NodeContextProcessingService {
    /**
     * @param entityId The ID of the current entity.
     * @param entityNode The LuigiNode node being navigated to.
     * @param ctx The current context object calculated by Luigi.
     */
    processNodeContext(
        entityId: string | undefined,
        entityNode: LuigiNode,
        ctx: NodeContext,
    ): Promise<void>;
}
```

## Provide your implemented service

In your implementation, you can fetch data from a backend service and append it to the entityNode.context. 
This is particularly useful for adding labels or metadata that are not available in the static configuration.

```ts
import { PortalNodeContext } from '../models/luigi-context';
import { PortalLuigiNode } from '../models/luigi-node';
import { Injectable, inject } from '@angular/core';
import { NodeContextProcessingService } from '@openmfp/portal-ui-lib';
import { ResourceService } from '@platform-mesh/portal-ui-lib/services';

@Injectable({
    providedIn: 'root',
})
export class NodeContextProcessingServiceImpl implements NodeContextProcessingService {
    private resourceService = inject(ResourceService);

    public async processNodeContext(
        entityId: string,
        entityNode: PortalLuigiNode,
        ctx: PortalNodeContext,
    ) {

        try {
            // Fetch data asynchronously (e.g., from a Kubernetes resource or API)
            const entity = this.resourceService.read(entityId);

            // Inject the retrieved data into the node's context
            entityNode.context.entityDisplayName = entity?.metadata?.name || 'Unknown';
        } catch (e) {
            console.error(`Not able to read entity ${entityId}`);
            // Optionally throw or handle error to prevent/redirect navigation
            throw e;
        }
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
    NodeContextProcessingServiceImpl
} from './node-context.service';

const portalOptions: PortalOptions = {
    // Reference the service class here. The library handles instantiation.
    nodeContextProcessingService: NodeContextProcessingServiceImpl,
    // ... other portal options
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));
```

