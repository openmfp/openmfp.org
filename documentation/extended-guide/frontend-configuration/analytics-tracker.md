# Analytics Tracking

The `analyticsTrackers` option allows you to register one or more analytics tracking implementations that the portal initializes at application startup. Each tracker's `initialize()` method is called once after the Angular application bootstraps. Trackers run independently and in fire-and-forget fashion — a failing tracker does not affect others or the portal itself.

## AnalyticsTracker Interface

```ts
export interface AnalyticsTracker {
    /**
     * Called once at application startup.
     * Implement your own timing logic here (e.g., wait for auth before sending data).
     */
    initialize(): Promise<void>;
}
```

## Implement a tracker

```ts
import {
    AnalyticsTracker,
    AuthEvent,
    AuthService,
    EnvConfigService,
} from '@openmfp/portal-ui-lib';
import { Injectable, inject } from '@angular/core';
import { filter, firstValueFrom, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MatomoAnalyticsTracker implements AnalyticsTracker {
    private authService = inject(AuthService);
    private envConfigService = inject(EnvConfigService);

    async initialize(): Promise<void> {
        await firstValueFrom(
            this.authService.authEvents.pipe(
                filter((event) => event === AuthEvent.AUTH_SUCCESSFUL),
                take(1),
            ),
        );

        const envConfig = await this.envConfigService.getEnvConfig() as any;

        if (!envConfig.analyticsEnabled) {
            return;
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = `/* your tracker bootstrap code */`;
        document.body.appendChild(script);
    }
}
```

## Register during application bootstrap

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import {
    PortalComponent,
    providePortal,
} from '@openmfp/portal-ui-lib';
import { MatomoAnalyticsTracker } from './matomo-analytics-tracker';

bootstrapApplication(PortalComponent, {
    providers: [
        providePortal({
            analyticsTrackers: [MatomoAnalyticsTracker],
            // ... other portal options
        }),
    ],
}).catch((err) => console.error(err));
```

Multiple trackers can be registered by adding more classes to the array:

```ts
providePortal({
    analyticsTrackers: [MatomoAnalyticsTracker, InternalAuditTracker],
})
```
