## /content

This folder serves as the main storage for all the content on my site, and is powered by the @nuxt/content module.

All journal posts should start in the `drafts` folder (which is gitignored so must be created manually), and then when they are ready to publish, move the markdown file to the `journal` folder, and it will be shown on prod.

The projects setup is a little weird. First, any featured projects should go in the `projects/featured` folder, **AND YOU MUST CREATE AN ASCII LOGO IN `@/mixins/featured.js`!!!** Any projects that shouldn't
have a demo/more info page should be created in the `links` object in `@/pages/projects/index.vue`, otherwise put other projects directly in the `projects` folder.
