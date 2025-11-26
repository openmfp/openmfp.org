# Installation
This guide walks through how to get started creating your very own OpenMFP Portal.

##  Summary
We will walk you through the steps to set up your very own portal. By the end of this guide, you will have a standalone Portal running locally. To be clear, this is not a production-ready installation, and it does not contain information specific to your needs.

:::info Contributors
If you are planning to contribute a new feature or bug fix to the OpenMFP project, we advise you to follow the Contributors guide.
:::

## Prerequisites

This guide also assumes that you have some experience with the terminal, specifically, these commands: `npm`, `npx`.

- Node.js [Active LTS Release](../overview/versioning-policy.md#nodejs-releases) installed using one of these
  methods:
  - Using `nvm` (recommended)
    - [Installing nvm](https://github.com/nvm-sh/nvm#install--update-script)
    - [Install and change Node version with nvm](https://nodejs.org/en/download/package-manager/#nvm)
    - Node 24 is a good starting point, this can be installed using `nvm install 24`
  - [Binary Download](https://nodejs.org/en/download/)
  - [Package manager](https://nodejs.org/en/download/package-manager/)
  - [Using NodeSource packages](https://github.com/nodesource/distributions/blob/master/README.md)

## Create your Portal
Once the prerequisites are in place, follow these steps to set up your Portal:

To install the Portal, we will make use of `npx`. `npx` is a tool that comes preinstalled with Node.js and lets you run commands straight from `npm` or other registries. Before we run the command, let's discuss what it does.

This command will:
 - create a new directory with a Portal inside.
 - Generate all necessary configuration file
 - Set up frontend and backend structures
 - Display the complete project structure
 - Install all dependencies automatically

```bash
npx @openmfp/create-portal@latest
```

Also you can provide a name to your portal by passing it as argument.

```bash
npx @openmfp/create-portal@latest my-awesome-portal
```

This name will be used as subdirectory in your current working directory.

:::info
If you face any issue with this tool you can visit troubleshoot section in [github](https://github.com/openmfp/create-portal?tab=readme-ov-file#troubleshooting)
:::

## 2. Run the Portal

Your Portal is fully installed and ready to be run! Now that the installation is complete, you can go to the application directory and start the app using the `npm start` command. The `npm start` command will run both the frontend and backend as separate processes in the same terminal.

```bash
cd my-portal # your app name
npm start
```

![Screenshot of the command output](/npm-start.png)

Then you can visit `localhost:4300` to start exploring Portal immediately.

![Screenshot of the running Portal](/portal.png)

## Recap

This tutorial walked through how to create your own Portal using the `npx @openmfp/create-portal@latest` command. That command created a new directory that holds your new Portal.

### Create a Microfrontend  

Now when you have your portal running locally, you can create a new micro frontend and connect it to your portal. Follow the steps in the [Create Microfrontend Guide](/documentation/getting-started/create-microfrontend).