<template>
  <v-col cols="12" class="text-center py-2">
        <NuxtLink class="text-subtitle-2 text-md-subtitle-1 font-weight-regular primary--text link" style="font-family: 'JetBrains Mono' !important; text-transform: none; text-decoration: none;" :to="`/journal/${slug}`">
            <span :class="`${color}--text`" style="text-transform: capitalize;">[{{post.category}}]</span>
            {{ post.title }}
        </NuxtLink>
        <template v-if="$vuetify.breakpoint.mdAndUp">
            <span class="text-subtitle-1 grey--text" style="font-family: 'JetBrains Mono' !important;">{{dots}} </span>
            <span class="text-subtitle-1" style="font-family: 'JetBrains Mono' !important;">{{post.created}}</span>
        </template>
  </v-col>
</template>

<script>
const COLORS = {
    tech: 'light-blue',
    personal: 'text--accent-3 green',
    school: 'deep-purple',
    ML: 'deep-orange'
}

const TOTAL_LEN = 60;

export default {
    name: "BlogPostThumbnail",
    props: {
        post: {
            type: Object,
            default: null,
        }
    },
    computed: {
        color() {
            return COLORS[this.post.category]
        },
        dots() {
            return ".".repeat(TOTAL_LEN - this.post.title.length - this.post.category.length - 3)
        },
        slug() {
            return this.post.title.toLowerCase().replace(/ /g, "-")
        }
    }
}
</script>

<style>

</style>