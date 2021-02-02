<script>
export default {
    name: "RAIImages"
}
</script>

<template>
  <v-col cols="12" md="5">
      <v-img src="/bd-items.png" class="elevation-12 my-8" alt="Items list" width="90%" style="margin-left: -45%; position: relative; left: 50%;">
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
      <p class="text-caption text-center mb-10" style="font-family: 'JetBrains Mono' !important;">Blind Dog items list</p>
    
      <v-img src="/bd-item.png" class="elevation-12 my-8" alt="Item details" width="90%" style="margin-left: -45%; position: relative; left: 50%;">
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
      <p class="text-caption text-center mb-10" style="font-family: 'JetBrains Mono' !important;">Item details page</p>
    
    
      <v-img src="/bd-cart.png" class="elevation-12 my-8" alt="Cart page" width="90%" style="margin-left: -45%; position: relative; left: 50%;">
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
      <p class="text-caption text-center mb-10" style="font-family: 'JetBrains Mono' !important;">Cart page</p>
    
    
      <v-img src="/bd-checkout.png" class="elevation-12 my-8" alt="Initial step of checkout flow" width="90%" style="margin-left: -45%; position: relative; left: 50%;">
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
      <p class="text-caption text-center mb-10" style="font-family: 'JetBrains Mono' !important;">Initial step of checkout flow</p>
    
  </v-col>
</template>

<style>

</style>