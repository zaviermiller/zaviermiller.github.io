<template>
<v-row class="justify-center pt-8">
  <v-col cols="12" class="text-center pb-8">
  <h1 style="font-family: 'Chakra Petch' !important;" class="text-h3 text-md-h2">Journal</h1>
  </v-col>
  <BlogPostThumbnail v-for="post in posts" :key="post.title" :post="post" class="slide" style="transition: .5s ease-out;" />
</v-row>
</template>

<script>
import BlogPostThumbnail from "@/components/BlogPostThumbnail.vue"
import ZLoader from '../../components/ZLoader.vue'
// import { VImg } from "@nuxtjs/vuetify"

import {mapMutations, mapGetters} from "vuex"

export default {
  components: {
    BlogPostThumbnail
  },
  head() {
    return {
      title: "Journal"
    }
  },
  data() {
    return {
      posts: [],
    }
  },
  created() {
    },
  async mounted() {
    this.posts = await this.$content("journal").fetch()
    if (process.env.NODE_ENV === "development") {
      var drafts = await this.$content("drafts").fetch()
      this.posts.push(...drafts)
    }
    this.posts.sort((a, b) => { return new Date(a.created) > new Date(b.created) ? -1 : 1 })
    this.postSlide()
    // this.$emit("loadstop")
  },
  computed: {
  },
  methods: {
    async postSlide() {
      if (process.browser) {
        var slide = await (document.getElementsByClassName("slide"))
        let timer = window.setInterval(() => {
          if (!slide.length) {
            clearInterval(timer)
            return
          }
          var el = slide[0]
          el.classList.remove("slide")
        }, 150)
    }
    }
  }
}
</script>

<style>
  .v-btn:hover, .v-btn:before, .v-btn:active {
    background-color: transparent;
    text-shadow: 0 0 4px;
  }
.link:hover, .link::before, .link:active {
    background-color: transparent;
    text-shadow: 0 0 4px;
    cursor: pointer;
  }
  .slide {
    opacity: 0;
    transform: translateX(-20px);
  }
</style>