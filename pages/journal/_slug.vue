<template>
  <v-row class="justify-center pt-8">
    <v-col cols="12" md="10" xl="8" class="text-center">
      <h1
        style="font-family: 'Chakra Petch' !important"
        class="text-h2 mb-8 grey--text text--lighten-2"
      >
        {{ post.title }}
      </h1>
      <p style="font-family: 'JetBrains Mono'; color: #999">
        Posted {{ post.created }} in
        <span :class="`text-capitalize ${color}--text`">{{
          post.category
        }}</span>
      </p>
      <dash-seperator
        class="my-6"
        width="60%"
        style="
          margin-left: -30%;
          left: 50%;
          position: relative;
          border-width: 2px;
          border-color: #999;
        "
      />
      <v-col cols="12" class="ma-0 pa-0 text-left">
        <a
          @click="$router.go(-1)"
          style="font-size: 20px; font-family: 'JetBrains Mono'"
          >&lt;- Back</a
        >
      </v-col>
      <nuxt-content :document="post" />
    </v-col>
  </v-row>
</template>

<script>
import { computedColors } from "@/mixins/colors.js"
import DashSeperator from "../../components/DashSeperator.vue"

import { mapMutations } from "vuex"

export default {
  components: {
    DashSeperator,
  },
  head() {
    return {
      title: this.post.title,
    }
  },
  mixins: [computedColors],
  data() {
    return {
      post: {},
    }
  },
  async asyncData({ params }) {
    const slug = params.slug
    return { slug }
  },
  async mounted() {
    this.startLoading()
    try {
      this.post = await this.$content("journal/" + this.slug).fetch()
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        this.post = await this.$content("drafts/" + this.slug).fetch()
      }
    }
    // todo: better
    var pres = await document.getElementsByTagName("pre")
    for (const pre of pres) {
      pre.classList.add("elevation-12")
    }
    setTimeout(async () => {
      this.stopLoading()
    }, 700)
  },
  computed: {
    color() {
      return this.colors[this.post.category]
    },
  },
  methods: {
    ...mapMutations({ startLoading: "load/startLoading" }),
    ...mapMutations({ stopLoading: "load/stopLoading" }),
  },
}
</script>

<style>
.v-btn:hover,
.v-btn::before,
.v-btn:active,
.v-card::before {
  background-color: transparent;
  text-shadow: 0 0 4px;
}
.link:hover,
.link::before,
.link:active {
  background-color: transparent;
  text-shadow: 0 0 4px;
  cursor: pointer;
}

.nuxt-content {
  text-align: left;
}

.nuxt-content > h2 {
  font-size: 38px;
  font-family: "Chakra Petch";
  font-weight: 500;
}

.nuxt-content > h1 {
  font-size: 45px;
  font-family: "Chakra Petch";
  font-weight: 500;
}

.nuxt-content > h3 {
  font-size: 30px;
  font-family: "Chakra Petch";
  font-weight: 500;
}

.nuxt-content > p {
  font-family: "Aleo";
  margin-top: 10px;
  font-size: 20px;
  color: #d2d2d2;
}

.nuxt-content strong {
  color: #eee !important;
}

.nuxt-content ol {
  font-family: "Aleo";
  margin-top: 10px;
  font-size: 17px;
  color: #bdbdbd;
  margin-left: 20px;
}

.nuxt-content ul {
  font-family: "Aleo";
  margin-top: 10px;
  font-size: 17px;
  color: #bdbdbd;
  margin-left: 20px;
}

.nuxt-content li {
  margin-bottom: 5px;
}

.nuxt-content pre,
code {
  background-color: var(--v-background-darken1) !important;
  font-family: "JetBrains Mono" !important;
  border-radius: 13px;
  color: #bdbdbd !important;
  text-shadow: none;
  margin: 40px 0;
  font-size: 20px;
}

.nuxt-content blockquote {
  display: inline-block;
  white-space: pre-line;
  font-style: italic;
  font-family: "Aleo";
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
    0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
  border-radius: 13px;
  border-left: 10px solid var(--v-primary-darken3);
  padding-left: 30px;
  margin-bottom: 20px;
  background-color: #212533;
  font-size: 20px;
}

.nuxt-content blockquote p {
  margin-bottom: 0;
}

/* TODO: FOOTNOTE */

a {
  text-decoration: none;
}

code > span {
  background-color: transparent !important;
}
</style>
