import { withMermaid } from "vitepress-plugin-mermaid";
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "OpenMFP",
  description: "Open Micro Frontend Platform",
  head: [
    ['link', { rel: 'icon', href: 'favicon.ico' }]
  ],
  ignoreDeadLinks: 'localhostLinks',
  cleanUrls: true,
  base: 'PAGES_BASE' in process.env && process.env.PAGES_BASE != '' ? '/' + process.env.PAGES_BASE : '',
  srcExclude: ['**/README.md', '**/CONTRIBUTING.md'],
  lastUpdated: true,

  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
              new URL('theme/components/VPFooter.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPFeature\.vue$/,
          replacement: fileURLToPath(
              new URL('theme/components/VPFeature.vue', import.meta.url)
          )
        },
      ]
    }
  },


  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: 'documentation' },
    ],

    editLink: {
      pattern: 'https://github.com/openmfp/openmfp.org/edit/main/:path'
    },

    logo: {
      src: '/logo.png',
      width: 24,
      height: 24
    },

    outline: [2, 3, 4, 5],

    search: {
      provider: 'local'
    },

    sidebar: {

      '/': [
        {
          text: 'Documentation',
          items: [
            { text: 'Introduction', link: '/documentation/' },
            { text: 'Concepts', link: '/documentation/concepts' },
            { text: 'Getting Started', link: '/documentation/getting-started/', 
              items: [
                { text: 'Installation', link: '/documentation/getting-started/installation' },
                { text: 'Local Development', link: '/documentation/getting-started/local-develpment' },
                { text: 'Create a Microfrontend', link: '/documentation/getting-started/create-microfrontend' },
              ] 
            },
            { text: 'Extended Guide', link: '/documentation/extended-guide/', 
              items: [
                { text: 'Registering a Microfrontend', link: '/documentation/extended-guide/register-microfrontend' },
                { text: 'Content Configuration', link: '/documentation/extended-guide/content-configuration' },
                { text: 'Luigi Context', link: '/documentation/extended-guide/luigi-context' },
              ] 
            },
            { text: 'Contribute', link: '/documentation/contribute' },
            { text: 'Community', link: '/documentation/community' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/openmfp' }
    ]

  },

})
