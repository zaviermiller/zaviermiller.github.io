<template>
  <v-app dark>
    <AppBar />
    <v-main class="mx-md-12 px-md-12" style="overflow-x: hidden;">
      <v-container fluid>
        <v-fade-transition hide-on-leave>
          <nuxt v-show="!loading" :key="$route.fullPath"/>
        </v-fade-transition>
      </v-container>
    </v-main>
    <v-fade-transition>
      <ZLoader :size="60" center v-if="loading"/>
    </v-fade-transition>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import ZLoader from '../components/ZLoader.vue';

import { mapGetters } from "vuex"

export default {
  components: {
    AppBar,
    ZLoader
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({loading: 'load/loading'})
  }
}
</script>

<style>
  .v-application {
    background-color: var(--v-background-base) !important;
  }

  a:hover {
    text-shadow: 0 0 4px;
}

html {
    overflow: auto !important;
    overflow-x: hidden !important;
    /* scrollbar-width: none; */
    /* -ms-overflow-style: none; */
  }
  
  html::-webkit-scrollbar {
    /* width: 0;
    height: 0; */
  }
</style>