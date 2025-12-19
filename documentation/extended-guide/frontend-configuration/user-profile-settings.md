# Customizing the User Profile

The userProfileConfigService option allows you to define and manage the content of the
[Luigi user profile](https://docs.luigi-project.io/docs/navigation-advanced?section=profile). 
This dropdown, typically located in the top-right corner of the shell,
contains links to user settings, profile overviews, and the logout functionality.

## UserProfileConfigService Interface

```ts
export interface UserProfileConfigService {
    /**
     * Returns a Promise resolving to a UserProfile object
     * defining the logout behavior and additional menu items.
     */
    getProfile(): Promise<UserProfile>;
}
```

## Provide your implemented service

```ts
import { UserProfileConfigService, UserProfile } from '@openmfp/portal-ui-lib';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProfileConfigServiceImpl implements UserProfileConfigService {

    /**
     * Generates the profile menu configuration.
     */
    async getProfile(): Promise<UserProfile> {
        return {
            // Configure the sign-out button
            logout: {
                label: 'Sign out',
                icon: 'log',
                // Optional: custom logout handling logic can be defined here
            },
            // Define additional navigation items in the profile dropdown
            items: [
                {
                    label: 'My Overview',
                    icon: 'customer-view',
                    link: '/users/overview',
                },
                {
                    label: 'Account Settings',
                    icon: 'settings',
                    link: '/users/settings',
                }
            ]
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
import { UserProfileConfigServiceImpl } from './user-profile.service';

const portalOptions: PortalOptions = {
    // Reference the service class here. The library handles instantiation.
    userProfileConfigService: UserProfileConfigServiceImpl,
    // ... other portal options
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));

```
