<script>
export default {
  name: "ZImg",
  inheritAttrs: false,
  props: {
    caption: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true,
    },
    center: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <div :class="center ? 'd-flex justify-center align-center' : ''" :style="center ? 'flex-direction: column;' : ''">
    <v-img :src="src" class="elevation-12" :alt="alt" v-bind="$attrs" style="flex: none">
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
    <p class="text-caption mt-2" style="font-family: 'JetBrains Mono' !important;">{{ caption }}</p>
  </div>
</template>

<style>

</style>