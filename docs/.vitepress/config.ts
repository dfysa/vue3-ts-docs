import { defineConfig } from "vitepress";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "彼曦的学习文档",
  description: "去寻找吧，我把一切都放在了这里",
  themeConfig: {
    siteTitle: "学习小站",
    logo: "/assets/logo.png",
    nav: [
      { text: "首页", link: "/" },

      {
        text: "前端工程化",
        items: [
          { text: "前端基础", link: "/frontend-basics/age1" },
          { text: "Vue3", link: "/vue3/" }, // Vue3 移入前端工程化的子目录
        ],
      },
      { text: "后端工程化", link: "/back-end/1" },

      { text: "API 参考", link: "/api/" },
      { text: "常见问题", link: "/faq/" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/dfysa/vue3-ts-docs" },
    ],
    sidebar: {
      "/frontend-basics/": [
        {
          text: "1.前端发展的几个时代",
          items: [
            { text: "1.1 附属时代", link: "/frontend-basics/age1" },
            { text: "1.2 分家时代", link: "/frontend-basics/age2" },
            { text: "1.3 工程化时代", link: "/frontend-basics/age3" },
            { text: "1.4 大前端时代", link: "/frontend-basics/age4" },
            { text: "1.5 Serverless 时代", link: "/frontend-basics/age5" },
          ],
        },
        {
          text: "2.掌握前端“三驾马车”",
          items: [
            { text: "2.1 HTML 基础", link: "/frontend-basics/html" },
            { text: "2.2 CSS 基础", link: "/frontend-basics/css" },
            { text: "2.3 JavaScript 基础", link: "/frontend-basics/js" },
          ],
        },
        {
          text: "3.新时代的 JavaScript",
          items: [
            { text: "3.1 ES6+：下⼀代语法标准", link: "/frontend-basics/3.1" },
            {
              text: "3.2 Node.js：服务端的 JavaScript",
              link: "/frontend-basics/3.2",
            },
            {
              text: "3.3 TypeScript：⽀持类型的 JavaScript",
              link: "/frontend-basics/3.3",
            },
          ],
        },
      ],
      "/vue3/": [
        {
          text: "Vue3 基础学习",
          items: [
            { text: "Vue3基础", link: "/vue3/" },
            { text: "Vue3组件体系", link: "/vue3/system" },
            // { text: "安装与配置", link: "/vue3/installation" },
            // { text: "基础语法与概念", link: "/vue3/concepts" },
            // { text: "组件化", link: "/vue3/components" },
            // { text: "响应式原理", link: "/vue3/reactivity" },
            // { text: "路由与状态管理", link: "/vue3/router-and-store" },
          ],
        },
      ],
      "/back-end/": [
        {
          text: "后端工程化",
          items: [
            { text: "第一周", link: "/back-end/1" },
            { text: "第二周", link: "/back-end/2" },
          ],
        },
      ],
    },
    footer: {
      message: "用心学习 Vue3 和 TypeScripts！",
      copyright: "Copyright  2024 fyl",
    },
  },
// 这里是新增的配置项
  ignoreDeadLinks: false, // 设置为 true 以忽略死链检查
  
});
