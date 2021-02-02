<script>
export default {
    name: "ZLoader",
    props: {
        size: {
            type: Number,
            default: 24
        },
        center: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        curStep: 0,
        loadSteps: ["|","\\","-","/"]
    }),
    mounted() {
        if (process.browser) {
            let timer = window.setInterval(() => {
                this.curStep = (this.curStep + 1) % this.loadSteps.length
            }, 120)
        }
    }
}
</script>

<template>
        <v-fade-transition>
    <div class="load-container" :style="center ? 'display: flex; justify-content: center; align-items: center;' : ''">
            <div :style="`font-family: 'JetBrains Mono'; font-size: ${size}px; font-weight: thin; color: #ccc; letter-spacing: -10px; ${center ? 'position: absolute;' : ''}`">[ <span class="primary--text" style="text-shadow: 0 0 4px;">{{loadSteps[curStep]}}</span> ]</div>
    </div>
        </v-fade-transition>
</template>

<style>
    .load-container {
        position: absolute;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
    }
</style>