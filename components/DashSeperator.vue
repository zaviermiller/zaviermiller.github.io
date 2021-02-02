<template>
<!-- gotta figure out how to not just cut off the character... -->
  <div :style="`width: ${computedWidth}; font-family: 'JetBrains Mono'; letter-spacing: 2px; font-size: 22px; overflow: hidden; text-overflow: '-'; white-space:nowrap;`">
------------------------------------------------------------------------------------------------------
  </div>
</template>

<script>
export default {
    name: "DashSeperator",
    props: {
        width: {
            type: Number | String,
            default: "100%"
        }
    },
    computed: {
        computedWidth() {
            if (typeof(this.width) === "number") {
                return `${this.width}px`
            } else {
                return this.width
            }
        }
    }
}
</script>

<style>

</style>