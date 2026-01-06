# Customizing Node Processing

The `customNodeProcessingService` option allows you to intercept and modify individual 
Luigi Nodes dynamically before they are rendered in the navigation tree. 
This is specifically useful for implementing custom access policies, dynamic labeling based on context, 
or modifying node properties (like icons or descriptions) on the fly.

## CustomNodeProcessingService Interface

The `CustomNodeProcessingService` interface requires a single asynchronous method. 
It receives the current navigation context and the specific node being processed.

```ts
import { Context } from '@luigi-project/client';
import { LuigiNode } from '@openmfp/portal-ui-lib';

export interface CustomNodeProcessingService {
    /**
     * @param ctx The current Luigi context.
     * @param node The node currently being processed by the library.
     * @returns A Promise resolving to the modified (or original) LuigiNode.
     */
    processNode(ctx: Context, node: LuigiNode): Promise<LuigiNode>;
}
```

## Provide your implemented service

In this example, the service checks for a custom property requiredPermission in the node context. 
If the user doesn't have that permission (based on the global context), the node is hidden. 
It also demonstrates how to dynamically update a node's label.

```ts
import { Injectable } from '@angular/core';
import { Context } from '@luigi-project/client';
import { CustomNodeProcessingService, LuigiNode } from '@openmfp/portal-ui-lib';

@Injectable({
    providedIn: 'root',
})
export class CustomNodeProcessingServiceImpl implements CustomNodeProcessingService {

    public async processNode(ctx: Context, node: LuigiNode): Promise<LuigiNode> {
        // 1. Implementation of a custom access policy
        if (node.context?.requiredPermission) {
            const userPermissions = ctx.userPermissions || [];
            if (!userPermissions.includes(node.context.requiredPermission)) {
                node.hideFromNav = true;
            }
        }

        // 2. Dynamic modification of node properties
        if (node.pathSegment === 'project-details' && ctx.projectName) {
            node.label = `Project: ${ctx.projectName}`;
        }

        // Return the potentially modified node
        return node;
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
import { CustomNodeProcessingServiceImpl } from './custom-node-processing.service';

const portalOptions: PortalOptions = {
    // Reference the service class here.
    customNodeProcessingService: CustomNodeProcessingServiceImpl,
    // ... other portal options
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));
```

