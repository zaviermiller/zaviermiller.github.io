<script>
import Boids from "../components/Boids.vue"
import Contour from "../components/Contour.vue"
// import initMetaballs from "metaballs-js";

import { mapMutations } from "vuex"

export default {
  components: { Boids, Contour },
  head() {
    return {
      title: "Home",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no",
        },
      ],
    }
  },
  name: "index",
  data() {
    return {
      localLoad: true,
      showJournal: null,
      links: [
        {
          href: "https://www.github.com/zaviermiller",
          icon: "mdi-github",
          name: "Github",
        },
        {
          href: "https://www.twitter.com/zaviermiller",
          icon: "mdi-twitter",
          name: "Twitter",
        },
        {
          href: "https://www.linkedin.com/in/zaviermiller",
          icon: "mdi-linkedin",
          name: "LinkedIn",
        },
        {
          href: "https://www.instagram.com/zavier.miller/",
          icon: "mdi-instagram",
          name: "Instagram",
        },
      ],
    }
  },
  mounted() {
    if (process.browser) {
      this.startLoading()
      setTimeout(() => {
        this.stopLoading()
        this.localLoad = false
        this.initAnim()
      }, 500)
    }
  },
  beforeDestroy() {
    var app = document.getElementsByClassName("v-application")[0]
    app.classList.remove("crt")
  },
  computed: {
    options() {
      return {
        maxRadius: 25,
        speed: 6.0,
        color: "#cccccc00",
        backgroundColor: "#1A1D28",
        useDevicePixelRatio: true,
      }
    },
    computedNum() {
      if (process.browser) return window.innerWidth > 800 ? 200 : 25
      return null
    },
  },
  methods: {
    ...mapMutations({ startLoading: "load/startLoading" }),
    ...mapMutations({ stopLoading: "load/stopLoading" }),
    initAnim() {
      var app = document.getElementsByClassName("v-application")[0]
      // app.classList.add("crt")

      this.showJournal = Math.random() > 0.5
      var tmp = document.querySelectorAll(".slideUp")
      tmp?.forEach((s) => {
        s.classList.add("slideY")
        console.log(s)
      })

      // initMetaballs(this.$refs.metaball, this.options)

      // animation
      var slide = document.getElementsByClassName("slide")
      var btns = document.querySelectorAll(".slideY")
      let timer = window.setInterval(() => {
        if (!slide.length) {
          clearInterval(timer)
          window.setTimeout(() => {
            btns.forEach((btn) => {
              btn.classList.remove("slideY")
            })
            window.setInterval(() => {
              this.showJournal = !this.showJournal
            }, 4000)
          }, 500)
          return
        }
        var el = slide[0]
        el.classList.remove("slide")
        el.classList.add("canvasContent")
      }, 150)
    },
  },
}
</script>

<template>
  <div v-if="!localLoad" style="overflow: clip">
    <contour />
    <template>
      <!-- <canvas ref="metaball" style="position: absolute; width: 100%; left: 0; height: 100%; top: 0;" ></canvas> -->
      <v-row
        :class="`justify-center ${
          $vuetify.breakpoint.smAndDown ? '' : 'pl-12'
        } noselect`"
      >
        <v-col cols="12" class="pl-md-12 pt-md-12" id="repel">
          <p
            :style="`${
              $vuetify.breakpoint.smAndDown
                ? 'margin-top: 30%;'
                : 'margin-top: 15%;'
            }`"
          >
            <span
              style="
                font-family: 'Inter' !important;
                letter-spacing: -0.05em !important;
                font-weight: 600;
              "
              class="text-h2 heading slide"
              >Zavier Miller</span
            >
          </p>
          <p class="mb-md-12">
            <span
              style="font-family: 'Chakra Petch' !important"
              class="text-sm-h5 text-h6 grey--text text--lighten-4 subheading slide"
              >software developer and student</span
            >
          </p>
          <transition v-if="$vuetify.breakpoint.smAndUp" name="glitch">
            <v-btn
              outlined
              class="slideUp canvasContent ml-7"
              style="
                text-transform: none !important;
                font-family: 'JetBrains Mono';
                background-color: var(--v-background-base) !important;
              "
              tile
              color="primary"
              to="/projects"
              :ripple="false"
              v-if="!showJournal"
              data-text="Check out what I'm building"
              :key="'building'"
              nuxt
              >Check out what I'm building</v-btn
            >
            <v-btn
              outlined
              class="slideUp canvasContent ml-7"
              style="
                text-transform: none !important;
                font-family: 'JetBrains Mono';
                background-color: var(--v-background-base) !important;
              "
              tile
              color="primary"
              to="/journal"
              :ripple="false"
              v-if="showJournal"
              data-text="Check out what I'm thinking"
              :key="'thinking'"
              nuxt
              >Check out what I'm thinking</v-btn
            >
          </transition>
        </v-col>
        <!-- <v-btn outlined class="glitch" style="text-transform: none !important; font-family: 'JetBrains Mono'; " tile color="primary" to="/projects" :ripple="false"  data-text="Check out what I'm thinking">Check out what I'm thinking</v-btn> -->
        <v-col cols="10" v-if="$vuetify.breakpoint.xsOnly">
          <transition name="glitch">
            <v-btn
              outlined
              block
              class="slideUp canvasContent"
              style="
                text-transform: none !important;
                font-family: 'JetBrains Mono';
                background-color: var(--v-background-base) !important;
              "
              tile
              color="primary"
              to="/projects"
              :ripple="false"
              v-if="!showJournal"
              data-text="Check out what I'm building"
              :key="'building'"
              nuxt
              >Check out what I'm building</v-btn
            >
            <v-btn
              outlined
              block
              class="slideUp canvasContent"
              style="
                text-transform: none !important;
                font-family: 'JetBrains Mono';
                background-color: var(--v-background-base) !important;
              "
              tile
              color="primary"
              to="/journal"
              :ripple="false"
              v-if="showJournal"
              data-text="Check out what I'm thinking"
              :key="'thinking'"
              nuxt
              >Check out what I'm thinking</v-btn
            >
          </transition>
        </v-col>
        <!-- <v-col cols="6" class="pt-12 pl-12" style="margin-top: 7%;">
        <v-card class="mt-12 ml-12 pt-12" style="border-radius: 15px !important;" width="600" height="400" elevation="6">
          <v-card-text style="padding-top: 50%;">
            > enter text or wahtever
          </v-card-text>
        </v-card>
        <v-card light style="border-radius: 15px !important; position: absolute; top: 10%;" width="600" height="400" elevation="6">
          <v-card-text>
            output
          </v-card-text>
        </v-card>
      </v-col> -->
        <v-col cols="12" style="position: absolute; bottom: 0px">
          <v-card-actions>
            <v-spacer />
            <div class="canvasContent">
              <v-btn
                icon
                x-large
                class="mx-2"
                :href="social.href"
                :ripple="false"
                v-for="social in links"
                :aria-label="social.name"
                :key="social.href"
              >
                <v-icon x-large>{{ social.icon }}</v-icon>
              </v-btn>
            </div>
            <v-spacer />
          </v-card-actions>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<style>
.v-btn--outlined {
  transition: 0.4s ease-out !important;
}
.v-btn:hover,
.v-btn:before,
.v-btn:active {
  background-color: transparent;
  text-shadow: 0 0 4px;
}
.heading {
  font-family: "Chakra Petch" !important;
  letter-spacing: -0.05em !important;
  transition: 0.5s ease-out !important;
  position: relative;
  white-space: nowrap;
}

.subheading {
  font-family: "Chakra Petch" !important;
  font-weight: 400;
  letter-spacing: -0.05em !important;
  transition: 0.5s ease-out;
  position: relative;
}

.v-divider {
  border-width: 1px;
}

.slide {
  opacity: 0;
  transform: translateX(-20px);
}

.slideY {
  opacity: 0;
  transform: translateY(20px);
  transition: 0s !important;
}

.glitch:after {
  text-shadow: none;
  content: attr(data-text);
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: var(--v-background-base);
  opacity: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
  border: 1px solid var(--v-primary-darken1);
  animation: glitchTop 1s linear infinite;
}

.glitch {
  /* animation: shake 1s linear infinite; */
}

/* .glitch:after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    visibility: visible;
    opacity: 100;
    border: 2px solid var(--v-primary-darken1);
    clip-path: polygon(70% 0, 100% 0%, 100% 50%, 70% 50%);
  } */

/* GLITCH ANIMATION */

@keyframes glitch {
  2%,
  64% {
    transform: translate(2px, 0) skew(0deg);
  }
  4%,
  60% {
    transform: translate(-2px, 0) skew(0deg);
  }
  62% {
    transform: translate(0, 0) skew(5deg);
  }
}

@keyframes glitchTop {
  31% {
    transform: translate(0px, 0px);
  }
  32% {
    transform: translate(0px, -5px);
  }

  61% {
    transform: translate(0px, -5px);
  }
  62% {
    transform: translate(20px, 0px);
  }

  95% {
    transform: translate(20px, 0px);
  }
  96% {
    transform: translate(-10px, 0px);
  }
  98% {
    transform: translate(-10px, 0);
  }
  99% {
    transform: translate(0, 0);
  }
}

@keyframes glitchBotom {
  2%,
  64% {
    transform: translate(-2px, 0);
  }
  4%,
  60% {
    transform: translate(-2px, 0);
  }
  62% {
    transform: translate(-22px, 5px) skew(21deg);
  }
}

@keyframes shake {
  0% {
    transform: skewX(-15deg);
  }
  5% {
    transform: skewX(15deg);
  }
  10% {
    transform: skewX(-15deg);
  }
  15% {
    transform: skewX(15deg);
  }
  20% {
    transform: skewX(0deg);
    opacity: 1;
  }
  100% {
    transform: skewX(0deg);
    opacity: 0;
  }
}

.glitch-enter-active::after {
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
  animation: glitchTop 0.5s linear;
  -webkit-animation: glitchTop 0.5s linear;
  z-index: 4;
  /* text-shadow: none !important;
  opacity: 0; */
}

/* .glitch-enter-active:after{
  animation: glitchBotom .5s linear ;
  content: '';
  position: absolute;
  top: -10px;
  left: 20px;
  right: -20px;
  bottom: 10px;
  visibility: visible;
  opacity: 100;
  border: 2px solid var(--v-primary-base);
  clip-path: polygon(70% 0, 100% 0%, 100% 50%, 70% 50%);
} */

.glitch-leave-active {
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
  -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
  animation: glitchTop 0.5s linear;
  -webkit-animation: glitchTop 0.5s linear;
  position: absolute !important;
  z-index: 5;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.canvasContent {
  /* background: rgb(26,28,39); */
  background: radial-gradient(
    circle,
    rgba(26, 28, 39, 1) 93%,
    rgba(0, 0, 0, 0) 100%
  );
  padding: 10px 30px;
}
</style>
