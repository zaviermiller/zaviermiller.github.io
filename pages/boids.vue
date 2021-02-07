<template>
  <boids :num="200" debug>
      <template slot-scope="{ contentId }">
        <span :class="contentId + 'text-h1'">Test</span>
      </template>
  </boids>
</template>

<script>
import Boids from '../components/Boids.vue'
export default {
    components: { Boids },
    head() {
    return {
      title: "Boids Tests"
    }
  },
    mounted() {
    }
}
</script>

<style>

</style>