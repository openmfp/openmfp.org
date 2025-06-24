import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const legalLinks = [
  {
    label: 'Trademark',
    href: 'https://www.sap.com/about/legal/trademark.html',
  },
  {
    label: 'Privacy Policy',
    href: 'https://www.sap.com/about/legal/privacy.html',
  },
  {
    label: 'Terms of Use',
    href: 'https://www.sap.com/about/legal/terms-of-use.html',
  },
  {
    label: 'Legal Disclosure',
    href: 'https://www.sap.com/corporate/en/legal/impressum.html',
  },
];
function renderLegalLink(label: string, href: string): string {
  return `
    <a class="footer__link-item" href="${href}">
      ${label}
      <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_nPIU">
        <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path>
      </svg>
    </a>
  `;
}

const config: Config = {
  title: 'OpenMFP',
  tagline: 'Open Micro Frontend Platform',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'openmfp', // Usually your GitHub org/user name.
  projectName: 'openmfp.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,

        // language: ["en", "de"],

        // If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
        // forceIgnoreNoIndex: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/openmfp/openmfp.org/blob/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/openmfp/openmfp.org/blob/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'OpenMFP',
      logo: {
        alt: 'OpenMFP - Open Micro Frontend Platform',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/openmfp',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'OpenMFP Documentation',
              to: '/docs',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/openmfp',
            },
          ],
        },
        {
          items: [
            {
              html: `
                <div style="display: flex; align-items: center; max-width: 100%; gap: 10px;">
                  <img src="/img/founded-supported.png" alt="European Union Funding Logo" style="max-width: 210px; height: auto;" />
                  <small style="font-size: 0.55em; line-height: 1.2">
                    Funded by the European Union - NextGenerationEU. The views and opinions expressed are solely those of the author(s) and do not 
                    necessarily reflect the views of the European Union or the European Commission. Neither the European Union nor the European 
                    Commission can be held responsible for them.
                  </small>
                </div>
              `,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SAP SE or an SAP affiliate company.
      <a href="https://www.sap.com/about/legal/copyright.html">All rights reserved</a>.<br>
      <small class="footer__legal-links">
        ${legalLinks
          .map((link) => renderLegalLink(link.label, link.href))
          .join('')}
      </small>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
