# General UI Settings

The health checker is an optional service that can be provided to the portal. Once added
will be called periodically with an interval defined in the environment variable `HEALTH_CHECK_INTERVAL` ms
(default 2000 in case not set). The result of the call is accessed via rest call `/rest/health`
and throws an error if the result is false.

## StaticSettingsConfigService Interface

The interface is defined as follows:

```ts
export interface StaticSettingsConfigService {
    getStaticSettingsConfig(): Promise<LuigiStaticSettings>;
}
```

## Provide your implemented service to the portal options

Via implementing the interface and providing as a porta option,
you can customize [Luigis general settings](https://docs.luigi-project.io/docs/general-settings) and override any defaults.
Make sure to return a valid Luigi configuration object, below an example:

```ts
import { StaticSettingsConfigService } from '@openmfp/portal-ui-lib';

export class StaticSettingsConfigServiceImpl
        implements StaticSettingsConfigService
{
  constructor() {}

  getStaticSettingsConfig() {
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

## Provide your implemented service to the portal options

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import {
    PortalComponent,
    PortalOptions,
    providePortal,
} from '@openmfp/portal-ui-lib';

const portalOptions: PortalOptions = {
    staticSettingsConfigService: StaticSettingsConfigServiceImpl,
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));
```
