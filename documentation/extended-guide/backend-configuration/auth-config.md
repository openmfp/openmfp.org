# Authentication configuration

The portal does not provide any authentication mechanism. It requires third-party services to provide authentication.
But it has the means to facilitate the integration of such services.
If you want to specify the OAuth2 services to be used, you can use the `EnvAuthConfigService` as a `authConfigProvider` option,
along with providing the environment variable to the portal, according to the [instruction](https://github.com/openmfp/portal-server-lib?tab=readme-ov-file#environment-properties).

```ts
import { Module } from '@nestjs/common';
import { PortalModule, PortalModuleOptions, EnvAuthConfigService } from '@openmfp/portal-server-lib';

const portalOptions: PortalModuleOptions = {
    authConfigProvider: EnvAuthConfigService
};

@Module({
    imports: [PortalModule.create(portalOptions)],
})
export class AppModule {}
```

The variables will be read from the environment and used to facilitate the authentication flow.

## AuthConfigService Interface

You might want as well to provide your own implementation of the `AuthConfigService` interface, meeting the requirements below:

```ts
export interface ServerAuthVariables {
    idpName?: string;
    baseDomain: string;
    oauthServerUrl: string;
    oauthTokenUrl: string;
    clientId: string;
    clientSecret: string;
    oidcIssuerUrl?: string;
    endSessionUrl?: string;
}

export interface AuthConfigService {
    getAuthConfig(request: Request): Promise<ServerAuthVariables>;
}
```

## Provide your implemented services to the portal options

```ts
import { Module } from '@nestjs/common';
import { PortalModule, PortalModuleOptions } from '@openmfp/portal-server-lib';

const portalOptions: PortalModuleOptions = {
    authConfigProvider: AuthConfigServiceImpl
};

@Module({
    imports: [PortalModule.create(portalOptions)],
})
export class AppModule {}
```

Once implemented, the portal will use your implementation to get the authentication variables.


## Authentication callback

You might want as well to provide an authentication callback to act upon different authentication outcomes, 
failure or success.

```ts
export interface AuthCallback {
    handleSuccess(
        request: Request,
        response: Response,
        authTokenResponse: AuthTokenData,
    ): Promise<any>;

    handleFailure(request: Request, response: Response): Promise<any>;
}
```

And add it to the portal options:

```ts
import { Module } from '@nestjs/common';
import { PortalModule, PortalModuleOptions } from '@openmfp/portal-server-lib';

const portalOptions: PortalModuleOptions = {
    authCallbackProvider: AuthCallbackProviderImpl,
};

@Module({
    imports: [PortalModule.create(portalOptions)],
})
export class AppModule {}
```

## Logout callback

By specifying the `logoutCallbackProvider` option, you can provide a logout callback to be called upon logout.

### LogoutCallback interface

```ts
export interface LogoutCallback {
    handleLogout(request: Request, response: Response): Promise<string | void>;
}
```

The logout action redirects to the url specified by the environment variable `LOGOUT_REDIRECT_URL`, 
but you can override it according to your needs and logic in the `LogoutCallback` implementation, and the return 
value of the callback will be used as the redirect URL.

### Provide your implemented services to the portal options

```ts
import { Module } from '@nestjs/common';
import { PortalModule, PortalModuleOptions } from '@openmfp/portal-server-lib';

const portalOptions: PortalModuleOptions = {
  logoutCallbackProvider: LogoutCallbackImpl,
};

@Module({
  imports: [PortalModule.create(portalOptions)],
})
export class AppModule {}
```
