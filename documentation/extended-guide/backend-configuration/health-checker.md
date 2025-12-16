# Health Checker

The health checker is an optional service that can be provided to the portal. Once added
will be called periodically with an interval defined in the environment variable `HEALTH_CHECK_INTERVAL` ms 
(default 2000 in case not set). The result of the call is accessed via rest call `/rest/health` 
and throws an error if the result is false.

## HealthChecker Interface

The interface is defined as follows:

```ts
export interface HealthChecker {
    isHealthy(): Promise<boolean>;
}
```

## Provide your implemented service to the portal options

```ts
import { Module } from '@nestjs/common';
import {
    PortalModule,
    PortalModuleOptions,
} from '@openmfp/portal-server-lib';

const portalOptions: PortalModuleOptions = {
    healthChecker: HealthCheckerImpl,
};

@Module({
    imports: [PortalModule.create(portalOptions)],
})
export class AppModule {}
```
