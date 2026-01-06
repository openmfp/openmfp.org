import { fileURLToPath, URL } from "node:url";
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "OpenMFP",
  description: "Open Micro Frontend Platform",
  head: [["link", { rel: "icon", href: "favicon.ico" }]],
  ignoreDeadLinks: "localhostLinks",
  cleanUrls: true,
  base:
    "DOCS_VERSION" in process.env && process.env.DOCS_VERSION != ""
      ? "/" + process.env.DOCS_VERSION + "/"
      : "PAGES_BASE" in process.env && process.env.PAGES_BASE != ""
        ? "/" + process.env.PAGES_BASE + "/"
        : "/",

  srcExclude: ["**/README.md", "**/CONTRIBUTING.md"],
  lastUpdated: true,

  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL("theme/components/VPFooter.vue", import.meta.url),
          ),
        },
        {
          find: /^.*\/VPFeature\.vue$/,
          replacement: fileURLToPath(
            new URL("theme/components/VPFeature.vue", import.meta.url),
          ),
        },
      ],
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Documentation", link: "documentation" },
    ],

    editLink: {
      pattern: "https://github.com/openmfp/openmfp.org/edit/main/:path",
    },

    logo: {
      src: "/logo.png",
      width: 24,
      height: 24,
    },

    outline: [2, 3, 4, 5],

    search: {
      provider: "local",
    },

    sidebar: {
      "/": [
        {
          text: "Documentation",
          items: [
            { text: "Introduction", link: "/documentation/" },
            { text: "Concepts", link: "/documentation/concepts" },
            {
              text: "Getting Started",
              link: "/documentation/getting-started/",
              items: [
                {
                  text: "Installation",
                  link: "/documentation/getting-started/installation",
                },
                {
                  text: "Create a Microfrontend",
                  link: "/documentation/getting-started/create-microfrontend",
                },
                {
                  text: "Web Components",
                  link: "/documentation/getting-started/web-components",
                },
              ],
            },
            {
              text: "Extended Guide",
              link: "/documentation/extended-guide/",
              items: [
                {
                  text: "Backend configuration",
                  link: "/documentation/extended-guide/backend-configuration/",
                  items: [
                    {
                      text: "Registering a service provider",
                      link: "/documentation/extended-guide/backend-configuration/service-provider",
                    },
                    {
                      text: "Adding portal context provider",
                      link: "/documentation/extended-guide/backend-configuration/portal-context-provider",
                    },
                    {
                      text: "Adding entity context providers",
                      link: "/documentation/extended-guide/backend-configuration/entity-context-providers",
                    },
                    {
                      text: "Passing additional env variables to the portal",
                      link: "/documentation/extended-guide/backend-configuration/env-variables-provider",
                    },
                    {
                      text: "Serving static content",
                      link: "/documentation/extended-guide/backend-configuration/serving-static-content",
                    },
                    {
                      text: "Health checker",
                      link: "/documentation/extended-guide/backend-configuration/health-checker",
                    },
                    {
                      text: "Extending portal",
                      link: "/documentation/extended-guide/backend-configuration/extending-portal",
                    },
                    {
                      text: "Authentication configuration",
                      link: "/documentation/extended-guide/backend-configuration/auth-config",
                    },
                  ],
                },
                {
                  text: "Frontend configuration",
                  link: "/documentation/extended-guide/frontend-configuration/",
                  items: [
                    {
                      text: "Luigi general settings",
                      link: "/documentation/extended-guide/frontend-configuration/general-settings",
                    },
                    {
                      text: "Luigi routing settings",
                      link: "/documentation/extended-guide/frontend-configuration/routing-settings",
                    },
                    {
                      text: "Node change hook settings",
                      link: "/documentation/extended-guide/frontend-configuration/node-change-hook-settings",
                    },
                    {
                      text: "Global search settings",
                      link: "/documentation/extended-guide/frontend-configuration/global-search-settings",
                    },
                    {
                      text: "Header bar settings",
                      link: "/documentation/extended-guide/frontend-configuration/header-bar-settings",
                    },
                    {
                      text: "User profile settings",
                      link: "/documentation/extended-guide/frontend-configuration/user-profile-settings",
                    },
                    {
                      text: "Custom message listeners",
                      link: "/documentation/extended-guide/frontend-configuration/message-listeners",
                    },
                    {
                      text: "Error component config",
                      link: "/documentation/extended-guide/frontend-configuration/error-config",
                    },
                    {
                      text: "Authorization events",
                      link: "/documentation/extended-guide/frontend-configuration/luigi-auth-callbacks-settings",
                    },
                    {
                      text: "Luigi global context",
                      link: "/documentation/extended-guide/frontend-configuration/luigi-global-context",
                    },
                    {
                      text: "Luigi node context",
                      link: "/documentation/extended-guide/frontend-configuration/luigi-node-context",
                    },
                    {
                      text: "Global nodes",
                      link: "/documentation/extended-guide/frontend-configuration/global-nodes",
                    },
                  ],
                },
                {
                  text: "Content Configuration",
                  link: "/documentation/extended-guide/content-configuration",
                },
                {
                  text: "Luigi Context",
                  link: "/documentation/extended-guide/luigi-context",
                },
              ],
            },
            { text: "Contribute", link: "/documentation/contribute" },
            { text: "Community", link: "/documentation/community" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/openmfp" }],
  },
});
