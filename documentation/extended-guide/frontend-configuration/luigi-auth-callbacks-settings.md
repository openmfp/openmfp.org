# Handling Authentication Events

The `luigiAuthEventsCallbacksService` option allows you to define a service that intercepts
[Luigi authorization events](https://docs.luigi-project.io/docs/authorization-events). 
This is useful for performing side effects—such as clearing local storage, 
redirecting users, or logging telemetry—when the authentication state changes.

## LuigiAuthEventsCallbacksService Interface

```ts
export interface LuigiAuthEventsCallbacksService {
    /**
     * Triggered when a user successfully authenticates.
     */
    onAuthSuccessful: (settings: any, authData: any) => void;

    /**
     * Triggered when an error occurs during the authentication process.
     */
    onAuthError: (settings: any, err: any) => void;

    /**
     * Triggered when the current authentication session has expired.
     */
    onAuthExpired: (settings: any) => void;

    /**
     * Triggered when the user initiates a logout action.
     */
    onLogout: (settings: any) => void;

    /**
     * Triggered shortly before the authentication session is set to expire.
     */
    onAuthExpireSoon: (settings: any) => void;

    /**
     * Triggered when there is an error in the authentication configuration.
     */
    onAuthConfigError: (settings: any, err: any) => void;
}
```

## Provide your implemented service

```ts
import { LuigiAuthEventsCallbacksService } from '@openmfp/portal-ui-lib';
import { Injectable } from '@angular/core';

@Injectable()
export class LuigiAuthEventsCallbacksServiceImpl
    implements LuigiAuthEventsCallbacksService {

    onAuthSuccessful = (settings: any, authData: any) => {
        console.log('User successfully authenticated.', authData);
        // Logic: Initialize user-specific session data
    };

    onAuthError = (settings: any, err: any) => {
        console.error('Authentication failed:', err);
    };

    onAuthExpired = (settings: any) => {
        console.warn('Authentication session expired.');
        // Logic: Redirect to login or show session expired modal
    };

    onLogout = (settings: any) => {
        console.log('User initiated logout.');
        // Logic: Clear sensitive data from local storage
    };

    onAuthExpireSoon = (settings: any) => {
        console.warn('Session will expire soon. Consider refreshing.');
        // Logic: Show a "Extend Session" notification to the user
    };

    onAuthConfigError = (settings: any, err: any) => {
        console.error('Critical Auth Config Error:', err);
    };
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
import { LuigiAuthEventsCallbacksServiceImpl } from './auth-events-callbacks.service';

const portalOptions: PortalOptions = {
    // Provide the service class reference
    luigiAuthEventsCallbacksService: LuigiAuthEventsCallbacksServiceImpl,
    // ... other portal options
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));

```
