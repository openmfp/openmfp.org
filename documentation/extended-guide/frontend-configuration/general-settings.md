# Customizing Static Luigi Settings

To customize the general UI settings provided by the underlying Luigi framework, 
you must implement the `StaticSettingsConfigService` interface and provide your custom service 
during the application bootstrap. This service allows you to override any default 
[Luigi general settings](https://docs.luigi-project.io/docs/general-settings) 
(like the header title, logo, or loading behavior).

## StaticSettingsConfigService Interface

The interface is defined as follows:

```ts
export interface StaticSettingsConfigService {
    getStaticSettingsConfig(): Promise<LuigiStaticSettings>;
}
```

## Provide your implemented service

```ts
import { StaticSettingsConfigService } from '@openmfp/portal-ui-lib';

export class StaticSettingsConfigServiceImpl
        implements StaticSettingsConfigService
{
  constructor() {}

  getStaticSettingsConfig(): Promise<LuigiStaticSettings> {
    const logo = 'assets/my-logo.svg';

    return {
      header: {
        title: 'My App',
        logo: logo,
        favicon: logo,
      },
      appLoadingIndicator: {
        hideAutomatically: false,
      },
      links: [{ title: 'OpemMFP', link: 'https://openmfp.org/' }],
      // ... the rest of the configuration 
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
import { StaticSettingsConfigServiceImpl } from './static-settings-config.service'; // Import your new service

const portalOptions: PortalOptions = {
    // Reference the service class here. The Portal UI Library will instantiate it.
    staticSettingsConfigService: StaticSettingsConfigServiceImpl,
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));
```
