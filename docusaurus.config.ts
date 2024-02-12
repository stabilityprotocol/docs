import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;

// const lightCodeTheme = require("prism-react-renderer/themes/github");
// const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const config: Config = {
  title: "Stability Docs",
  tagline: "",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.stabilityprotocol.com/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  trailingSlash: false,

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
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
    [
      "redocusaurus",
      {
        // Plugin Options for loading OpenAPI files
        specs: [
          {
            spec: "./public-api.yaml",
            route: "/api/",
            id: "public-api",
            url: "https://github.com/stabilityprotocol/stability-docs/blob/main/public-api.yaml",
          },
        ],
        // Theme Options for modifying how redoc renders them
        theme: {
          // Change with your site colors
          primaryColor: "#1890ff",
        },
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    colorMode: {
      defaultMode: "dark",
    },
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Stability Docs",
      logo: {
        alt: "Stability Logo",
        src: "img/favicon.ico",
      },
      items: [
        {
          to: "/category/how-it-works",
          position: "left",
          label: "How it works",
        },
        {
          to: "/category/users",
          position: "left",
          label: "Users",
        },
        {
          to: "/category/nodes",
          position: "left",
          label: "Nodes",
        },
        {
          to: "/category/builders",
          position: "left",
          label: "Builders",
        },
        {
          to: "/category/resources",
          position: "left",
          label: "Resources",
        },
        {
          href: "https://github.com/stabilityprotocol/",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "How it works",
              to: "/category/how-it-works",
            },
            {
              label: "Users",
              to: "/category/users",
            },
            {
              label: "Nodes",
              to: "/category/nodes",
            },
            {
              label: "Builders",
              to: "/category/builders",
            },
            {
              label: "Resources",
              to: "/category/resources",
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
              label: "X",
              href: "https://medium.com/stabilitynetwork",
            },
            {
              label: "Discord",
              href: "https://discord.com/invite/68j2XtTKY9",
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
      copyright: `Copyright © ${new Date().getFullYear()} Stability, Inc.`,
    },
    prism: {
      theme: darkCodeTheme,
    },
    algolia: {
      appId: "0FUT98QHZD",
      apiKey: "be96fc610db3368e74452af19b45dd3b",
      indexName: "stabilityprotocol",
      contextualSearch: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
