# Customizing Luigi Node Change Hooks

The `nodeChangeHookConfigService` option allows you to execute custom logic whenever a 
navigation event occurs within the [Luigi shell](https://docs.luigi-project.io/docs/navigation-parameters-reference?section=nodechangehook). 
This is a powerful tool for tracking user behavior, 
updating page titles dynamically, or managing side effects that depend on the transition between 
different navigation nodes.

## NodeChangeHookConfigService Interface

The `NodeChangeHookConfigService` interface defines a single method 
that is triggered after a node change has been processed by Luigi.

```ts
import { LuigiNode } from '@openmfp/portal-ui-lib';

export interface NodeChangeHookConfigService {
    /**
     * @param prevNode The LuigiNode the user is navigating away from.
     * @param nextNode The LuigiNode the user is currently navigating to.
     */
    nodeChangeHook(prevNode: LuigiNode, nextNode: LuigiNode): void;
}
```

## Provide your implemented service

In your implementation, you can react to specific node changes. For instance, 
you might want to send an analytics event or reset a global state when a user moves to a 
specific part of the application.

```ts
import { Injectable } from '@angular/core';
import { NodeChangeHookConfigService, LuigiNode } from '@openmfp/portal-ui-lib';

@Injectable({
    providedIn: 'root',
})
export class CustomNodeChangeHookService implements NodeChangeHookConfigService {

    /**
     * Responds to navigation changes across the portal.
     */
    nodeChangeHook(prevNode: LuigiNode, nextNode: LuigiNode): void {
        const prevPath = prevNode?.pathSegment || 'root';
        const nextPath = nextNode?.pathSegment || 'root';

        console.log(`Navigation transition: ${prevPath} -> ${nextPath}`);

        // Example: Update the document title based on the node label
        if (nextNode?.label) {
            document.title = `Portal - ${nextNode.label}`;
        }

        // Example: Trigger analytics for a specific node
        if (nextNode?.viewUrl?.includes('dashboard')) {
            this.sendAnalytics('view_dashboard');
        }
    }

    private sendAnalytics(eventName: string): void {
        // Your analytics logic here
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
import { CustomNodeChangeHookService } from './node-change-hook.service';

const portalOptions: PortalOptions = {
    // Reference the service class here. The library handles instantiation.
    nodeChangeHookConfigService: CustomNodeChangeHookService,
    // ... other portal options
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));
```

