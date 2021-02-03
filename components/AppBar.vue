<script>
export default {
    name: "AppBar",
    data: () => ({
        drawer: false,
        group: null
    })
}
</script>

<template>
<div>
  <v-app-bar app flat absolute color="rgba(0,0,0,0)" class="px-md-12 mx-md-12 my-4">
      <v-toolbar-title style="font-family: 'Aleo' !important; cursor: pointer;" class="text-h4" @click="$router.push('/')">Z</v-toolbar-title>

      <v-spacer />
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-btn text class="appbar-items" :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important;" exact-active-class="underlined" active-class='underlined' to="/projects">Projects</v-btn>||
      <v-btn text class="appbar-items" :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important;" exact-active-class="underlined" active-class='underlined' to="/journal">Journal</v-btn>||
      <v-btn text class="appbar-items" :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important;" exact-active-class="underlined" active-class='underlined' to="/about">About</v-btn>
    </template>
    <v-app-bar-nav-icon v-else @click="drawer = true"></v-app-bar-nav-icon>
  </v-app-bar>

  <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      app
      color="background"
      right
      v-if="$vuetify.breakpoint.smAndDown"
      style="z-index: 999;"
    >
      <v-list
        nav
        dense
      >
        <v-list-item>
            <v-btn text class="appbar-items" block :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important;" exact-active-class="underlined" active-class='underlined' to="/projects">Projects</v-btn>
        </v-list-item>
        <v-list-item>
            <v-btn text class="appbar-items" block :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important;" exact-active-class="underlined" active-class='underlined' to="/journal">Journal</v-btn>
        </v-list-item>
        <v-list-item>
            <v-btn text class="appbar-items" block :ripple="false" style="font-family: 'JetBrains Mono'; text-transform: none !important;" exact-active-class="underlined" active-class='underlined' to="/about">About</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
</style>