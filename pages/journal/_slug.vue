<template>
<v-row class="justify-center pt-8">
  <v-col cols="12" lg="8" xl="7" class="text-center">
  <h1 style="font-family: 'Chakra Petch' !important;" class="text-h2 mb-8 grey--text text--lighten-2">{{post.title}}</h1>
  <v-divider class="my-6" width="50%" style="margin-left: -25%; left: 50%; position: relative; border-width: 2px; border-color: #999;" />
  <nuxt-content :document="post" />
  </v-col>
</v-row>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      post: {}
    }
  },
  async asyncData({ params }) {
      const slug = params.slug
      return { slug }
    },
  async mounted() {
    this.post = await this.$content(this.slug).fetch()
    var pres = await document.getElementsByTagName("pre")
    pres.forEach(pre => {
        pre.classList.add("elevation-12")
    })
  }
}
</script>

<style>
.link:hover, .link::before, .link:active {
    background-color: transparent;
    text-shadow: 0 0 4px;
    cursor: pointer;
  }

  .nuxt-content {
      text-align: left;
  }

.nuxt-content > h2 {
    font-size: 35px;
    font-family: 'Chakra Petch';
    font-weight: 500;
}

.nuxt-content > h1 {
    font-size: 45px;
    font-family: 'Chakra Petch';
    font-weight: 500;
}

.nuxt-content > p {
    font-family: 'Aleo';
    margin-top: 10px;
    font-size: 17px;
    color: #bdbdbd;
}

.nuxt-content strong {
    color: white !important;
}

.nuxt-content pre, code {
    background-color: var(--v-background-lighten1) !important;
    font-family: 'JetBrains Mono' !important;
    border-radius: 13px;
    color: #bdbdbd !important;
    text-shadow: none;
    margin: 40px 0;
}

/* TODO: FOOTNOTE */

a {
    text-decoration: none;
}

a:hover {
    text-shadow: 0 0 4px;
}

code > span {
    background-color: transparent !important;
}
</style>