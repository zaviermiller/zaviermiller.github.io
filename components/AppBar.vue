<script>
export default {
    name: "AppBar",

}
</script>

<template>
  <v-app-bar app flat absolute color="rgba(0,0,0,0)" class="px-12 mx-12 my-4">
      <v-toolbar-title style="font-family: 'Aleo' !important; cursor: pointer;" class="text-h4" @click="$router.push('/')">Z</v-toolbar-title>

      <v-spacer />

      <v-btn text class="appbar-items" :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important;" exact-active-class="underlined" active-class='underlined' to="/projects">Projects</v-btn>||
      <v-btn text class="appbar-items" :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important;" exact-active-class="underlined" active-class='underlined' to="/journal">Journal</v-btn>||
      <v-btn text class="appbar-items" :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important;" exact-active-class="underlined" active-class='underlined' to="/about">About</v-btn>
  </v-app-bar>
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
</style>