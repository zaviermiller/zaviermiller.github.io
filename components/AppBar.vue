<script>
import DashSeperator from './DashSeperator.vue'
import MenuIcon from './MenuIcon.vue'
export default {
  components: { MenuIcon, DashSeperator },
  name: "AppBar",
  data: () => ({
      drawer: false,
      group: null
  }),
  watch: {
    "$route.fullPath"(v) {
      this.drawer = false
    }
  },
  computed: {
    computedTop() {
      const padding = 10
      return document.getElementById("appbar").offsetHeight + padding
    }
  }
}
</script>

<template>
<div>
  <v-app-bar app flat absolute color="rgba(0,0,0,0)" :class="`px-md-12 mx-md-12 ${drawer ? 'mt-4' : 'my-4'}`" id="appbar">
      <v-toolbar-title style="font-family: 'Aleo' !important; cursor: pointer;" class="text-h4 mb-n1" @click="$router.push('/')">Z</v-toolbar-title>

      <v-spacer />
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-btn text class="appbar-items" :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important;" exact-active-class="underlined" active-class='underlined' nuxt to="/projects">Projects</v-btn>||
      <v-btn text class="appbar-items" :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important;" exact-active-class="underlined" active-class='underlined' nuxt to="/journal">Journal</v-btn>||
      <v-btn text class="appbar-items" :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important;" exact-active-class="underlined" active-class='underlined' nuxt to="/about">About</v-btn>
    </template>
    <!-- <v-app-bar-nav-icon v-else @click="drawer = true" aria-label="nav icon"></v-app-bar-nav-icon> -->
    <menu-icon v-else aria-label="nav icon" :open="drawer" @click="drawer = !drawer" />
  </v-app-bar>
    <v-expand-transition v-if="$vuetify.breakpoint.smAndDown">
      <v-list
      v-if="drawer"
      min-width="100%"
      :style="`z-index: 999; background-color: var(--v-background-base) !important; top: ${computedTop}px; position: relative;`"
      >
        <DashSeperator width="80%" style="margin-left: -40%; position: relative; left: 50%;" />
        <v-list-item>
            <v-btn text class="appbar-items" :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important; margin-left: 5%;" exact-active-class="underlined" active-class='underlined' to="/projects">Projects</v-btn>
        </v-list-item>
        <v-list-item>
            <v-btn text class="appbar-items" :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important; margin-left: 5%;" exact-active-class="underlined" active-class='underlined' to="/journal">Journal</v-btn>
        </v-list-item>
        <v-list-item>
            <v-btn text class="appbar-items" :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important; margin-left: 5%;" exact-active-class="underlined" active-class='underlined' to="/about">About</v-btn>
        </v-list-item>
        <DashSeperator width="80%" style="margin-left: -40%; position: relative; left: 50%;" />
      </v-list>
    </v-expand-transition>
</div>
</template>

<style>
    .appbar-items:hover {
        text-decoration: underline;
    }
    .appbar-items:before, .appbar-items:hover:after {
        background-color: transparent;
    }
    .underlined {
        text-decoration: underline;
        text-shadow: 0 0 4px;

    }
    .underlined::before {
    background-color: transparent !important;
    }
    .inset-shadow {
      -webkit-box-shadow: inset 0px 0px 7px 0px rgba(0,0,0,0.30) !important;
      -moz-box-shadow: inset 0px 0px 7px 0px rgba(0,0,0,0.30) !important;
      box-shadow: inset 0px 0px 7px 0px rgba(0,0,0,0.30) !important;
    }
</style>