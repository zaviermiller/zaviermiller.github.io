<template>
  <boids :num="100">
      <template slot-scope="{ contentId }">
        <h1 :id="contentId">Test</h1>
      </template>
  </boids>
</template>

<script>
import Boids from '../components/Boids.vue'
export default {
    components: { Boids },
    mounted() {
    }
}
</script>

<style>

</style>