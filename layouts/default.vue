<template>
  <v-app dark>
    <AppBar />
    <v-main class="mx-12 px-12" >
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";

export default {
  components: {
    AppBar
  },
  data () {
    return {
    }
  }
}
</script>

<style>
  .v-application {
    background-color: var(--v-background-base) !important;
  }

html {
    overflow: auto !important;
    /* scrollbar-width: none; */
    /* -ms-overflow-style: none; */
  }
  
  html::-webkit-scrollbar {
    /* width: 0;
    height: 0; */
  }
</style>