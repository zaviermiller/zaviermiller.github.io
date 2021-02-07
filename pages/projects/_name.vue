<script>
import { featuredLogos } from "@/mixins/featured.js"
import { languageColors } from "@/util/colors.js"

import { mapMutations } from "vuex"

import DashSeperator from '../../components/DashSeperator.vue'
import RAIImages from '../../components/resale-ai/RAIImages.vue'
import BDImages from '../../components/blind-dog/BDImages.vue'
import ZenDemo from '../../components/zen/ZenDemo.vue'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  components: { DashSeperator, RAIImages, BDImages, ZenDemo },
  name: "ProjectDetails",
  head() {
    return {
      title: this.project.name
    }
  },
    mixins: [featuredLogos],
    data: () => ({
      project: {},
      logo: ``,
      logoArr: [],
      logoMargin: 0
    }),
    async asyncData({ params }) {
      const name = params.name
      return { name }
    },
    async mounted() {
      this.startLoading()
      this.project = await this.$content("projects/" + this.name).fetch()
      var baseLogo = this.logos[this.project.slug]
      this.logoArr = baseLogo.split("\n")
      this.logo = "\n".repeat(this.logoArr.length - 1)

      setTimeout(() => {
        this.stopLoading()
        this.animateLogo(this.logoArr)
      }, 700)
      // code styles
      // var pres = await document.getElementsByTagName("pre")
      // pres.forEach(pre => {
      //     pre.classList.add("elevation-12")
      // })
    },
    methods: {
      ...mapMutations({startLoading: "load/startLoading"}),
      ...mapMutations({stopLoading: "load/stopLoading"}),
      color(str) {
        return languageColors[str]
      },
      animateLogo(fullArr) {
        var full = [...fullArr]
        this.logoArr = this.logo.split("\n")
        // console.log(full.length, this.logoArr.length)

        full.forEach((item, i) => {
          var strIndex = 0
          var timer = window.setInterval(() => {
            if (strIndex >= full[i].length) {
              clearInterval(timer)
              return
            } 

            this.logoArr[i] += item[strIndex]
            this.logo = this.logoArr.join("\n")
            strIndex++
            this.computeMargin()
            
          }, i * 5)
        })
      },
      computeMargin() {
        this.logoMargin = ((-document.getElementById("logo").clientWidth) / 2)
      }
    },
    computed: {
      contentComponent() {
        switch(this.project.slug) {
          case "zen":
            return ZenDemo
          case "resale-ai":
            return RAIImages
          case "blind-dog":
            return BDImages
          default:
            return null
        }
      }
    }
}
</script>

<template>
    <!-- <ZenDemo /> -->
      <v-row class="px-0 justify-space-between ml-0 pr-2" style="width: 100%;">
        <v-col cols="12" md="5" v-if="project !== null">
            <div v-if="$vuetify.breakpoint.mdAndUp" :style="`width:300px; max-height:330px; white-space: pre; font-family: 'JetBrains Mono' !important; ${project.pageSize} color: ${project.color}; text-shadow: 0 0 4px;'`">
              {{logo}}
            </div>
            
            <v-card-text v-else>
            <span id="logo" :style="`white-space: pre; left: 50%; position: relative; display: inline-block; font-family: 'JetBrains Mono' !important; ${project.pageSize} margin-left: ${logoMargin}px; color: ${project.color}; text-shadow: 0 0 4px;'`">
              {{logo}}
            </span>
            </v-card-text>
            <v-row class="justify-space-between align-baseline mb-2" no-gutters>
                <h1 class="text-title" style="font-family: 'JetBrains Mono' !important; font-weight: 400;">{{project.name}}</h1>
                <p :style="`font-family: 'JetBrains Mono'; font-size: 20px; color: #ccc;`" class="mb-0">{{project.date}}</p>
            </v-row>
            <v-row class="justify-space-between align-baseline" no-gutters>
              <v-col cols="7" md="4">
                <v-btn v-for="item in project.links" :key="item.to" :href="item.to" :aria-label="item.name" x-large class="mr-2" target="_blank" rel="noopener noreferrer" icon :ripple="false">
                    <v-icon large :color="project.color">{{ item.icon }}</v-icon>
                </v-btn>
              </v-col>
              <!-- <span :style="`font-family: 'JetBrains Mono'; font-size: 24px; color: ${project.color};`" class="mb-0">{{project.role}}</span> -->
              <div>
                <span :style="`color: ${color(language)}; font-family: 'JetBrains Mono'; font-size: ${$vuetify.breakpoint.smAndDown ? 15 : 23}px;`" class="ml-4" v-for="language in project.languages" :key="language">[{{language}}]</span>
              </div>
            </v-row>
            <dash-seperator class="my-4"/>
            <a @click="$router.go(-1)" style="font-size: 18px; font-family: 'JetBrains Mono';" >&lt;- Back</a>
            <nuxt-content :document="project" />
        </v-col>
        <component :is="contentComponent" />
      </v-row>
</template>

<style>
.v-btn:hover, .v-btn:before, .v-btn:active {
    background-color: transparent !important;
    text-shadow: 0 0 4px;
}
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
    font-size: 18px;
    color: #d2d2d2;
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

.nuxt-content ul {
  font-family: 'Aleo';
    margin-top: 10px;
    font-size: 17px;
    color: #bdbdbd;
}

/* TODO: FOOTNOTE */

a {
    text-decoration: none;
}

code > span {
    background-color: transparent !important;
}
</style>