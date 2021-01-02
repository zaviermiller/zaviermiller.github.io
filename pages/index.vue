<script>
import initMetaballs from "metaballs-js";

export default {
  async mounted() {
    if (process.browser) {

      // initMetaballs(this.$refs.metaball, this.options)

      // animation
      var slide = await (document.getElementsByClassName("slide"))
      var btn = await document.getElementsByClassName("slideY")[0]
      let timer = window.setInterval(() => {
        if (!slide.length) {
          clearInterval(timer)
          window.setTimeout(() => {
            btn.classList.remove("slideY")
          }, 500)
          return
        }
        var el = slide[0]
        el.classList.remove("slide")
      }, 150)
    }

  },
  computed: {
    options() {
      return {
        numMetaballs: 20,
        minRadius: 10,
        maxRadius: 25,
        speed: 6.0,
        color: '#cccccc00',
        backgroundColor: "#1A1D28",
        useDevicePixelRatio: true
      }
    }
  }
}
</script>

<template>
<div>
    <Particles
    style="position: absolute; width: 100%; left: 0; height: 100%; top: 0;"
      id="tsparticles"
      :options="{
            background: false,
            fpsLimit: 120,
            interactivity: {
                detectsOn: 'canvas',
                events: {
                    onClick: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onHover: {
                        enable: false,
                        mode: 'repulse'
                    },
                    onDiv: {
                      selectors: '#repel',
                      enable: true,
                      mode: 'repel',
                      type: 'rectangle'
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    }
                }
            },
            particles: {
                color: {
                    value: '#ffffff'
                },
                links: {
                    color: '#ffffff',
                    distance: 100,
                    enable: true,
                    opacity: 0.5,
                    width: 1
                },
                collisions: {
                    enable: true
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outMode: 'bounce',
                    random: false,
                    speed: 1,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        value_area: 800
                    },
                    value: 90
                },
                opacity: {
                    value: 0.5
                },
                shape: {
                    type: 'circle'
                },
                size: {
                    random: true,
                    value: 2
                }
            },
            detectRetina: true
        }"
    />
    <!-- <canvas ref="metaball" style="position: absolute; width: 100%; left: 0; height: 100%; top: 0;" ></canvas> -->
    <v-row class="justify-center">
      <v-col cols="12" class="pl-12 pt-12" id="repel">
        <h1 style="font-family: 'Inter' !important; letter-spacing: -.05em !important; font-weight: 600; margin-top: 15%;" class="text-h2 text-sm-h1 heading slide">Zavier Miller</h1>
        <h3 style="font-family: 'Chakra Petch' !important;" class="text-h4 text-sm-h3 grey--text text--lighten-2 mb-12 subheading slide">software developer and student</h3>
        <v-btn v-if="$vuetify.breakpoint.smAndUp" outlined class="slideY" style="text-transform: none !important; font-family: 'JetBrains Mono'; background-color: var(--v-background-base) !important; " tile color="primary" to="/projects" :ripple="false">Check out what I'm up to</v-btn>
      </v-col>
      <v-col cols="10" v-if="$vuetify.breakpoint.xsOnly">
        <v-btn outlined block class="slideY" style="text-transform: none !important; font-family: 'JetBrains Mono'; background-color: var(--v-background-base) !important; " tile color="primary" to="/projects" :ripple="false">Check out what I'm up to</v-btn>
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
      <v-col cols="12" style="position: absolute; bottom: 0px;">
        <v-card-actions>
          <v-spacer />
        <v-btn icon x-large class="mx-2" href="https://www.github.com/zaviermiller" :ripple="false">
          <v-icon x-large>mdi-github</v-icon>
        </v-btn>
        <v-btn icon x-large class="mx-2" href="https://www.twitter.com/zavierjmiller" :ripple="false">
          <v-icon x-large>mdi-twitter</v-icon>
        </v-btn>
        <v-btn icon x-large class="mx-2" href="https://www.linkedin.com/in/zaviermiller" :ripple="false">
          <v-icon x-large>mdi-linkedin</v-icon>
        </v-btn>
        <v-spacer />
        </v-card-actions>
      </v-col>
    </v-row>
  </div>
</template>

<style>
.v-btn--outlined {
    transition: .4s ease-out !important;
}
  .v-btn:hover, .v-btn::before, .v-btn:active {
    background-color: transparent;
    text-shadow: 0 0 4px;
  }
  .heading {
    font-family: 'Chakra Petch' !important;
    letter-spacing: -.05em !important;
    transition: .5s ease-out !important;
    position: relative;
  }

  .subheading {
    font-family: 'Chakra Petch' !important; 
    font-weight: 400; 
    letter-spacing: -.05em !important;
    transition: .5s ease-out;
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
  }
</style>