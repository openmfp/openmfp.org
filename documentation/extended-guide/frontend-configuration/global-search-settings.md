# Customizing Luigi Global Search

The `globalSearchConfigService` option allows you to define the behavior, appearance, 
and event handling for the [Luigi global search](https://docs.luigi-project.io/docs/global-search). 
By implementing this service, you can integrate 
your own search provider logic directly into the portal header.


## GlobalSearchConfigService Interface

The `GlobalSearchConfigService` interface requires the implementation of a single method 
that returns the search configuration object.

```ts
export interface GlobalSearchConfigService {
    /**
     * Must return a valid Luigi configuration object for global search.
     */
    getGlobalSearchConfig(): any;
}
```

## Provide your implemented service

```ts
import { GlobalSearchConfigService } from '@openmfp/portal-ui-lib';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalSearchConfigServiceImpl implements GlobalSearchConfigService {

    getGlobalSearchConfig() {
        return {
            // UI Setting: Centers the search input in the shell header
            searchFieldCentered: true,

            // Define handlers for various search events
            searchProvider: {
                onEnter: (searchString: string) => {
                    console.log('Search triggered via Enter:', searchString);
                    // Add your search execution logic here
                },
                onSearchBtnClick: (searchString: string) => {
                    console.log('Search button clicked:', searchString);
                    // Add your search execution logic here
                },
                onEscape: () => {
                    console.log('Search escaped');
                    // Logic to clear results or close the search overlay
                },

                // You can include additional Luigi search properties
            }
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
import { GlobalSearchConfigServiceImpl } from './global-search-config.service';

const portalOptions: PortalOptions = {
    // Pass the class reference to the portal options
    globalSearchConfigService: GlobalSearchConfigServiceImpl,
    // ... other portal options
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));
```

