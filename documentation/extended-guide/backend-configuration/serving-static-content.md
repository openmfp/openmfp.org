# Serving static content

To serve the frontend part of the portal on the same host as the backend, 
you can provide the option of the portal module: `frontendDistSources`, 
which represents the path where your frontend files are built and located.
Below is an example of how to do it:

```ts
import { Module } from '@nestjs/common';
import {
    PortalModule,
    PortalModuleOptions,
} from '@openmfp/portal-server-lib';
import * as path from 'node:path';

let __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const portalOptions: PortalModuleOptions = {
    frontendDistSources: path.join(
        __dirname,
        '../..',
        'frontend/dist/frontend/browser',
    ),
};

@Module({
    imports: [PortalModule.create(portalOptions)],
})
export class AppModule {}
```
