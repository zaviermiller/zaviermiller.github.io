<script>
// import Go from "../../util/wasm_exec"
// import zenModule from '@/assets/wasm/zen.wasm';
// const go = new Go()
// const zen = zenModule().then(({ instance }) => {
//   go.run(instance)
// });

// const go = new Go();
//         WebAssembly.instantiateStreaming(fetch("main.wasm"), go.importObject).then((result) => {
//             // Remember that argv[0] is the program name.
//             go.argv = ['uni', '-q', 'identify', 'wasm'];
//             go.run(result.instance);
//         });

export default {
    name: "ZenDemo",
    mounted() {
    }
}
</script>

<template>
    <v-col cols="12" md="6">
        <v-img src="/zen.gif" class="elevation-12 my-8" alt="CamRAI scanner page" width="100%" style="margin-left: -50%; position: relative; left: 50%;">
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
        <p class="text-caption text-center mb-10" style="font-family: 'JetBrains Mono' !important;">A lil demo of Zen v1.0</p>
    </v-col>
</template>

<style>

</style>