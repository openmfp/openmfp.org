# Customizing the Header Bar

The `headerBarConfigService` option allows you to configure the header bar and extend
[Luigi breadcrumbs](https://docs.luigi-project.io/docs/navigation-advanced?section=breadcrumbs). 
Beyond standard breadcrumb settings, this service provides the 
unique ability to inject custom HTML content into the left and right sides of the 
header bar using renderer functions.

## HeaderBarConfigService Interface

```ts
export interface HeaderBarConfigService {
    getBreadcrumbsConfig(): Promise<HeaderBarConfig>;
}
```

## Provide your implemented service

```ts
import {
    HeaderBarConfigService,
    HeaderBarConfig,
} from '@openmfp/portal-ui-lib';


export class HeaderBarConfigServiceImpl implements HeaderBarConfigService
{
    getBreadcrumbsConfig(): Promise<HeaderBarConfig> {
        return  {
            autoHide: true,
            omitRoot: false,
            pendingItemLabel: '...',
            rightRenderers: [(
                containerElement: HTMLElement,
                nodeItems: NodeItem[],
                clickHandler,
            ) => {
                // Example: Adding a custom 'Live' status badge to the right side
                const badge = document.createElement('span');
                badge.innerText = 'LIVE';
                badge.style.background = 'green';
                badge.style.color = 'white';
                badge.style.padding = '2px 6px';
                badge.style.borderRadius = '4px';
                containerElement.appendChild(badge);
            }],
            leftRenderers: [(
                containerElement: HTMLElement,
                nodeItems: NodeItem[],
                clickHandler,
            ) => {
                // ... renderer implementation
            }],
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
import { HeaderBarConfigServiceImpl } from './header-bar-config.service';

const portalOptions: PortalOptions = {
    // Reference the service class here. The library handles instantiation.
    headerBarConfigService: HeaderBarConfigServiceImpl,
    // ... other portal options
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));

```
