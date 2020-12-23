<template>
<v-row class="justify-center pt-8">
  <v-col cols="12" class="text-center pb-8">
  <h1 style="font-family: 'Chakra Petch' !important;" class="text-h2">Journal</h1>
  </v-col>
  <BlogPostThumbnail v-for="post in posts" :key="post.title" :post="post" />
  
</v-row>
</template>

<script>
import BlogPostThumbnail from "@/components/BlogPostThumbnail.vue"

export default {
  components: {
    BlogPostThumbnail
  },
  data() {
    return {
      posts: []
    }
  },
  async mounted() {
    this.posts = await this.$content().sortBy('created', 'desc').fetch()
  }
}
</script>

<style>
.link:hover, .link::before, .link:active {
    background-color: transparent;
    text-shadow: 0 0 4px;
    cursor: pointer;
  }
</style>