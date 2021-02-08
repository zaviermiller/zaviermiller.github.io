<script>
import {featuredLogos} from "@/mixins/featured.js"

import ProjectThumbnail from "@/components/ProjectThumbnail.vue"
export default {
  components: { ProjectThumbnail },
    name: "ProjectsPage",
    head() {
      return {
        title: "Projects"
      }
    },
    mixins: [featuredLogos],
    data: () => ({
      selectedProject: null,
      archived: [

        // Zoids
        // {
        //   language: "Vue",
        //   name: "Zoids",
        //   links: [
        //     {
        //       to: "https://github.com/zaviermiller/zoids",
        //       icon: "mdi-github",
        //       name: "Github"
        //     }
        //   ]
        // },
        
        // ZML
        {
          language: "Go",
          name: "ZML",
          links: [
            {
              to: "https://github.com/zaviermiller/zml",
              icon: "mdi-github",
              name: "Github"
            }
          ]
        },

        // H4I - Mindversity
        {
          language: "React",
          name: "H4I - Mindversity",
          links: [
            {
              to: "https://www.mindversity.com",
              icon: "mdi-open-in-new",
              name: "Demo"
            },
            {
              to: "https://github.com/hack4impact-utk/mindversity-website",
              icon: "mdi-github",
              name: "Github"
            },
          ]
        },

        // Advent of Code 2020
        {
          language: "Go",
          name: "Advent of Code 2020",
          links: [{
            to: "https://github.com/zaviermiller/AoC-2020",
            icon: "mdi-github",
            name: "Github",
          }]
        },

        // Zerminal
        {
          language: "C++",
          name: "Zerminal",
          links: [{
            to: "https://github.com/zaviermiller/Zerminal",
            icon: "mdi-github",
            name: "Github",
          }]
        },

        // QT
        // {
        //   language: "Go",
        //   name: "QuickTests Backend"
        // }

        // Blackjack
        {
          language: "Python",
          name: "Multiplayer Blackjack",
          links: [{
            to: "https://github.com/zaviermiller/blackjack-networking",
            icon: "mdi-github",
            name: "Github",
          }]
        },

        {
          language: "Ruby/Rails",
          name: "HAMMERTime MTSS App",
          links: [
            {
              to: "https://hammertimemtss.herokuapp.com",
              icon: "mdi-open-in-new",
              name: "Demo",
            },
            {
              to: "https://github.com/zaviermiller/HAMMERTime-MTSS",
              icon: "mdi-github",
              name: "Github",
            },
          ]
        },

        // Clueless Creative
        {
          language: "HTML",
          name: "Clueless Creative",
          links: [
            {
              to: "https://afternoon-ocean-24608.herokuapp.com/",
              icon: "mdi-open-in-new",
              name: "Website",
            },
            {
              to: "https://github.com/zaviermiller/cluelesscreative",
              icon: "mdi-github",
              name: "Github",
            },
          ]
        },

        // Homework Hotline
        {
          language: "Ruby/Rails",
          name: "Homework Hotline",
          links: [
            {
              to: "https://afternoon-ocean-24608.herokuapp.com/clients/homework-hotline",
              icon: "mdi-open-in-new",
              name: "More information",
            },
            {
              to: "https://github.com/homeworkhotline/homeworkhotlineapp",
              icon: "mdi-github",
              name: "Github",
            },
          ]
        },

        // xEffect
        {
          language: "Ruby/Rails",
          name: "xEffect",
          links: [
            {
              to: "https://xeffect.herokuapp.com/",
              icon: "mdi-open-in-new",
              name: "Demo",
            },
            {
              to: "https://github.com/zaviermiller/xeffect",
              icon: "mdi-github",
              name: "Github",
            },
          ]
        },

        // JS Celebrate!
        {
          language: "JavaScript",
          name: "jQuery Celebrate",
          links: [
            {
              to: "https://github.com/zaviermiller/jquery-celebrate-plugin",
              icon: "mdi-github",
              name: "Github"
            }
          ]
        }
      ],
      featured: []
    }),
    async mounted() {
      if (process.browser) {
        this.featured = await this.$content("projects").fetch()
        var slide = await (document.getElementsByClassName("shifted-down"))
        let timer = await window.setInterval(() => {
          if (!slide.length) {
            clearInterval(timer)
            animStep2()
            return
          }
          var el = slide[0]
          el.classList.remove("shifted-down")
        }, 150)

        async function animStep2() {
          var archive = await document.getElementById("archiveTitle")
          var o = 0
          timer = await window.setInterval(() => {
            if (0 >= 1) {
              clearInterval(timer)
              return
            }
            o += .1
            archive.style.opacity = o;
          }, 30)
          var slideLeft = await (document.getElementsByClassName("slide"))
          timer = await window.setInterval(() => {
            if (!slideLeft.length) {
              clearInterval(timer)
              return
            }
            var el = slideLeft[0]
            el.classList.remove("slide")
          }, 150)
        }

    }
    }
}
</script>

<template>
  <v-row class="justify-center pt-8">
    <v-col cols="12" class="text-center pb-8">
  <h1 style="font-family: 'Chakra Petch' !important; color: #ccc;" class="text-h3 text-md-h2">Featured</h1>
    </v-col>
    <v-col cols="12" md="12" lg="10">
      <v-row class="justify-space-around" style="min-height: 400px;">
    <v-col cols="auto" v-for="project in featured" :key="project.name">
      <v-hover v-slot="{ hover }">
      <v-card color="background" elevation="0" style="transition: .7s ease-out; cursor: pointer; color: #aaa;" class="pa-4 featured shifted-down" @click="$router.push('/projects/' + project.slug)" :ripple="false">
        <v-responsive :aspect-ratio="1" >
        <v-card-text :style="`height: 300px; width:300px; white-space: pre; font-family: 'JetBrains Mono' !important; ${project.thumbSize} transition: .3s ease-out; ${hover ? 'color: ' + project.color + '; text-shadow: 0 0 4px;' : ''}`">{{thumbLogos[project.slug]}}</v-card-text>
<v-card-text class="justify-center d-flex align-center">
          <p :style="`font-family: 'JetBrains Mono'; font-size: 18px; transition: .3s ease-out; ${hover ? 'text-shadow: 0 0 4px; color: ' + project.color + ';' : ''}`">{{project.name}}</p>
        </v-card-text>
        </v-responsive>
      </v-card>
      </v-hover>
    </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="text-center mt-12">
      <h1 style="font-family: 'Chakra Petch' !important; color: #ccc; opacity: 0;" class="text-h3 text-md-h2" id="archiveTitle">Archive</h1>
    </v-col>
    <ProjectThumbnail v-for="project in archived" :project="project" :key="project.name" class="slide" style="transition: .7s ease-in-out;"/>
  </v-row>
</template>
<style>
.v-btn:hover, .v-btn::before, .v-btn:active, .v-card::before {
    background-color: transparent;
    text-shadow: 0 0 4px;
}
.v-card-text {
  color: #000 !important;
}
.shifted-down {
  opacity:0;
  transform: translate(0, 20px);
}

.slide {
  opacity: 0;
  transform: translate(-20px, 0);
}

.featured:focus, .featured::after, .featured::before {
  background-color: transparent !important;
}
</style>