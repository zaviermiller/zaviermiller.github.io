<script>
export default {
    name: "RAIImages"
}
</script>

<template>
  <v-col cols="12" md="5">
    <v-lazy>
    <v-img src="/rai-landing.png" class="elevation-12 my-8" alt="ResaleAI website landing page" width="90%" style="margin-left: -45%; position: relative; left: 50%;">
      <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
    </v-img>
    </v-lazy>
    <p class="text-caption text-center mb-10" style="font-family: 'JetBrains Mono' !important;">ResaleAI landing page I designed and built</p>
    <v-img src="/camrai-scanner.png" class="elevation-12 my-8" alt="CamRAI scanner page" width="50%" style="margin-left: -25%; position: relative; left: 50%;">
      <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
    </v-img>
    <p class="text-caption text-center mb-10" style="font-family: 'JetBrains Mono' !important;">CamRAI tag scanner I built</p>
    <v-img src="/camrai-editor.png" class="elevation-12 my-8" alt="CamRAI image editor" width="50%" style="margin-left: -25%; position: relative; left: 50%;">
      <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
    </v-img>
    <p class="text-caption text-center mb-10" style="font-family: 'JetBrains Mono' !important;">CamRAI photo editor I built</p>
  </v-col>
</template>

<style>

</style>