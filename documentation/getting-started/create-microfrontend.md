# Create a Microfrontend

In this section, we'll create a simple micro frontend using the [create-micro-frontend](https://github.com/openmfp/create-micro-frontend) tool and integrate it into the Portal.

This is just an example. You can use any framework or technology to create your micro frontend. If you already have one, you can skip Step 1 and jump to [Step 3](#step-3-create-a-content-configuration-file).

## Portal

The Portal is a web application built with Angular and TypeScript. It enables seamless integration of your micro frontends and provides an interface to interact with them.

Micro frontends are self-sufficient applications running inside of another application, also called the “microservices for the frontend”. They allow for independent releases, modularization, and the reuse of shared functionality and infrastructure.

The OpenMFP Portal leverages the [Luigi](https://luigi-project.io/) Framework to integrate all your micro frontends into a single, unified entry point.

## Prerequisites
- [Node.js](https://nodejs.org/en/download/) active LTS or maintenance LTS version.
- A locally running Portal. If you don't have one, follow the [Installation guide](/documentation/getting-started/installation).
- npm (included with Node.js)

## Step 1: Create a new micro frontend
Run the following command to generate a new Angular-based micro frontend with an example page:

:::info Script Configuration
Visit [create-micro-frontend](https://github.com/openmfp/create-micro-frontend) to learn how to choose a different framework, omit the example page, and explore other options.
:::

```sh
npx @openmfp/create-micro-frontend -y
```

This command creates a new Angular project with an example page.
:::info Example Page
If you generate the project with the example page, it will show a blank screen when run outside the Portal. The example page includes a sample configuration for Portal integration and waits for the Portal to signal that everything is ready.
:::

Move into your project directory:

```sh
cd my-micro-frontend
```

## Step 2: Run the Angular App
Start the development server:

```sh
npm run start
```
Then open `http://localhost:4200/` in your browser.

## Step 3: Create a Content Configuration File
If you used the [create-micro-frontend](https://github.com/openmfp/create-micro-frontend) tool, you can skip this step and move to [Step 4](#step-4-serve-the-content-configuration-file) because it already provides a preconfigured `content-configuration.json` in the `public` folder. Otherwise, follow the guide below.

Create a new file named `content-configuration.json` in the `public` folder of your Angular project (or any path you will serve this file from).
This file contains the configuration for your micro frontend.

Below is a minimal example. For a detailed reference, see the [Configuration documentation](https://github.com/openmfp/portal-ui-lib/blob/main/docs/readme-nodes-configuration.md#the-content-configuration-file-contents).

```json
{
  "name": "my-microfrontend",
  "luigiConfigFragment": {
    "data": {
      "nodes": [
        {
          "pathSegment": "your-path-segment",
          "label": "My Microfrontend",
          "hideFromNav": false,
          "url": "http://localhost:4200/index.html",
          "urlSuffix": "/index.html",
          "entityType": "example",
          "loadingIndicator": {
            "enabled": false
          }
        }
      ]
    }
  }
}
```

## Step 4: Serve the Content Configuration File

Verify that the configuration is available at `http://localhost:4200/content-configuration.json`. If it doesn't than try to restart the server

## Step 5: Consuming Local Content Configuration
To see your micro frontend in the OpenMFP Portal, you need to use your local `content-configuration.json` file.
Open the user menu in the top-right corner and go to **Settings** -> **Development**.

There, you will find Local Development Mode. Enable **Is Development Mode Active** and enter the path to your content configuration file.

![Local Development Mode in the OpenMFP Portal](/settings.png)

Click **Add**, then **Save**. Your micro frontend should now appear in the OpenMFP Portal.

![My Microfrontend in the OpenMFP Portal](/my-microfrontend.png)
