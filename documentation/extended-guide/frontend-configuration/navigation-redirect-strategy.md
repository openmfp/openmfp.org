# Customizing Navigation Redirect Strategy
This option allows you to customize where and how the portal stores the URL to redirect the user to after login (for example after session expiry or logout). By default the library uses `localStorage`. You can provide your own implementation of `NavigationRedirectStrategy` to use session storage, a backend, or custom logic.

## NavigationRedirectStrategy Interface

The `NavigationRedirectStrategy` interface defines three methods:

- `saveRedirectUrl`: called when `AuthExpired` or `Logout` events occur.
- `getRedirectUrl`: called when the user successfully logs in.
- `clearRedirectUrl`: called right after navigation to the route returned from `getRedirectUrl`.

```ts
export interface NavigationRedirectStrategy {
  getRedirectUrl(): string;
  saveRedirectUrl(url: string): void;
  clearRedirectUrl(): void;
}
```

## Provide your implemented service

In your application, you can provide your own implementation for storing and retrieving the redirect URL. 
For instance, you might switch from local storage to session storage, or add custom logic so you can decide which routes you want to save and which you don't.

```ts
import { Injectable } from '@angular/core';
import { NavigationRedirectStrategy } from '@openmfp/portal-ui-lib';

@Injectable()
export class CustomNavigationRedirectStrategy implements NavigationRedirectStrategy {
  getRedirectUrl(): string {
    return sessionStorage.getItem('returnUrl') || '/';
  }

  saveRedirectUrl(url: string): void {
    sessionStorage.setItem('returnUrl', url);
  }

  clearRedirectUrl(): void {
    sessionStorage.removeItem('returnUrl');
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
import { CustomNavigationRedirectStrategy } from './navigation-strategy.service';

const portalOptions: PortalOptions = {
    // Reference the service class here. The library handles instantiation.
    navigationRedirectStrategy: CustomNavigationRedirectStrategy,
    // ... other portal options
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));
```