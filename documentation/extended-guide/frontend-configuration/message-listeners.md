# Custom Message Listeners

To have a possibility to react to custom messages sent from micro frontends the `customMessageListeners` option allows 
you to define one or more listeners. This provides a robust mechanism for application-wide communication.


## CustomMessageListener Interface

```ts
export interface CustomMessageListener {
    /**
     * The custom message id the listener is registered for.
     */
    messageId(): string;

    /**
     * The callback to be executed when the custom message is send by Luigi.
     *
     * @param customMessage The message object, see also {@link https://docs.luigi-project.io/docs/luigi-client-api?section=sendcustommessage}
     * @param mfObject The micro frontend object, see also {@link https://docs.luigi-project.io/docs/luigi-core-api?section=getmicrofrontends}
     * @param mfNodesObject The nodes object of the micro frontend, see also {@link https://docs.luigi-project.io/docs/navigation-parameters-reference?section=node-parameters}
     */
    onCustomMessageReceived(
        customMessage: any,
        mfObject: any,
        mfNodesObject: any,
    ): void;
}
```

## Provide your implemented listener

```ts
import { CustomMessageListener } from '@openmfp/portal-ui-lib';

export class CustomMessageListenerImpl
    implements CustomMessageListener
{
    messageId(): string {
        return 'unique.message.id';
    }

    onCustomMessageReceived(
        customMessage: any,
        mfObject: any,
        mfNodesObject: any,
    ): void {
        const data = customMessage.data;
        console.log(`Custom Message Received: ${customMessage.id}`, data);
        // ... logic to be executed
    }
}
```

## Sending a custom message

Custom messages are sent from any part of your application to the portal.
A custom message is sent by using Luigi client method `sendCustomMessage({ id: 'unique.message.id'});` 
method (see also the following example).

```ts
import { Injectable } from '@angular/core';
import { sendCustomMessage } from '@luigi-project/client/luigi-client';

@Injectable({ providedIn: 'root' })
export class NotifyUniqueService {
  public sendUniqueCustomMessage() {
    sendCustomMessage({
      id: 'unique.message.id',
      origin: 'MyApp',
      entity: 'myEntity',
      data: { user: 'Test User', message: 'Hello World!' },
    });
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
import { CustomMessageListenerImpl } from './custom-message-listener.service';
import { CustomMessageListenerImpl2 } from './other-listener.service'; 

const portalOptions: PortalOptions = {
    // Provide an array of listener classes
    customMessageListeners: [
        CustomMessageListenerImpl,
        CustomMessageListenerImpl2, 
    ],
    // ... other portal options
};

bootstrapApplication(PortalComponent, {
    providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));
```

