import { defineConfig } from "vitepress";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "Vue 3 + TypeScript 学习文档",
  description: "详细学习 Vue3 和 TypeScipt 的指南",
  themeConfig: {
    siteTitle: "前端学习",
    logo: "/assets/logo.png",
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide" },
      { text: "组件", link: "/components" },
      { text: "API 参考", link: "/api/" },
      { text: "常见问题", link: "/faq/" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "导航",
          //   colliapsible: true,
          items: [
            { text: "介绍", link: "/guide/" },
            { text: "安装", link: "/guide/installation" },
            { text: "基本概念", link: "/guide/concepts" },
          ],
        },
      ],
      "/components/": [
        {
          text: "常用组件",
          //   colliapsible: true,
          items: [
            { text: "介绍", link: "/components/" },
            { text: "按钮 Button", link: "/components/button" },
            { text: "表单 Form", link: "/components/form" },
            { text: "表格 Table", link: "/components/table" },
          ],
        },
      ],
    },
    footer: {
      message: "用心学习 Vue3 和 TypeScripts！",
      copyright: "Copyright  2024 qx",
    },
  },
});
