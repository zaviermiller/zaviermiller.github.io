import GithubOutline from "@/components/icons/GithubOutline.vue";

import colors from 'vuetify/es5/util/colors'

export default {
    theme: {
        options: {
            customProperties: true,
        },
        dark: true,
        themes: {
            dark: {
            background: "#1A1D28",
            primary: colors.amber.darken1,
            accent: colors.grey.darken3,
            secondary: colors.amber.darken3,
            info: colors.teal.lighten1,
            warning: colors.amber.base,
            error: colors.deepOrange.accent4,
            success: colors.green.accent3
            }
        }
    },
    icons: {
        values: {
            githubOutline: {
                component: GithubOutline,
            },
        },
    }
}