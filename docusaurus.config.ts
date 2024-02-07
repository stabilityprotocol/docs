import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;

// const lightCodeTheme = require("prism-react-renderer/themes/github");
// const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const config: Config = {
  title: "Stability Docs",
  tagline: "",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.stble.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "stabilityprotocol", // Usually your GitHub org/user name.
  projectName: "stability-docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    colorMode: {
      defaultMode: "dark",
    },
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Stability Docs',
      logo: {
        alt: 'Stability Logo',
        src: 'img/favicon.ico',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/facebook/docusaurus',
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
              label: 'Docs',
              to: '/docs/',
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Blog",
              href: "https://medium.com/stabilitynetwork",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/stabilitysolutions/about/",
            },
            {
              label: "X fka Twitter",
              href: "https://medium.com/stabilitynetwork",
            },
            {
              label: "Discord",
              href: "https://discord.gg/VagSJw6e",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Main Site",
              href: "https://stabilityprotocol.com/",
            },
            {
              label: "GitHub",
              href: "https://github.com/stabilityprotocol",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: darkCodeTheme,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
