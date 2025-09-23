# Local Development

After completing the installation, you'll have a fully functional setup, enabling you to explore OpenMFP's full potential while efficiently managing your cluster.

In addition to the cluster, you'll also get access to the OpenMFP Demo Portal, which allows you to view and interact with your micro frontends.

## Demo OpenMFP Portal

The OpenMFP Portal is a web application built with Angular and TypeScript. It enables seamless integration of your micro frontends and provides an interface to interact with them.

Micro frontends are self-sufficient applications running inside of another application, also called the “microservices for the frontend”. They allow for independent releases, modularization, and the reuse of shared functionality and infrastructure.

The OpenMFP Portal leverages the [Luigi](https://luigi-project.io/) Framework to integrate all your micro frontends into a single, unified entry point.

### Prerequisites

Before proceeding, ensure you have completed the installation and that the portal is running at http://localhost:8000. If it is not running, follow the instructions in the [Installation Guide](/documentation/getting-started/installation).

### Register User 

First, you need to register on the demo portal:

1. Click on on the **Register** link located at the bottom.
2. Fill in the registration form with your details. Next time, you will need to log in using the credentials you provided during registration.

![Register User Form](/register-user.png)

Once you are registered, you will be automatically logged in and redirected to the OpenMFP home portal page, where you can start integrating your micro frontends.

![OpenMFP Portal](/openmfp-portal.png)

### Create a Microfrontend  

Now that you are registered, you can create a new micro frontend. Follow the steps in the [Create Microfrontend Guide](/documentation/getting-started/create-microfrontend).
