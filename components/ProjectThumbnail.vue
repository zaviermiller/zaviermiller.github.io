<script>
import { languageColors } from "@/util/colors.js"

const TOTAL_LEN = 120

export default {
    name: "ProjectThumbnail",
    props: {
        // Project type: 
        //  - language : string
        //  - name : string
        //  - links : object
        //     - icon : string
        //     - to : string
        project: {
            type: Object,
            required: true,
        },
    },
    computed: {
        color() {
            return languageColors[this.project.language]
        },
        dots() {
            return ".".repeat(TOTAL_LEN - this.project.name.length - this.project.language.length - 3)
        },
    }
}
</script>

<template>
<v-col cols="12" sm="10" md="8" lg="6" class="mx-12 my-2">
    <v-row class="justify-space-between no-wrap" no-gutters>
        <v-col cols="auto" class="text-center d-flex align-end justify-center px-0 mx-0">
                <span class="text-subtitle-2 text-md-subtitle-1 font-weight-regular" style="font-family: 'JetBrains Mono' !important; color: #ccc;text-transform: none; text-decoration: none;text-overflow: '';overflow:hidden; white-space:nowrap;">
                    <span  :style="`text-transform: capitalize; color:${color};`">[{{project.language}}]</span>
                    {{ project.name }}
                    <span class="text-subtitle-1 grey--text" style="font-family: 'JetBrains Mono' !important; ">{{dots}} </span>
                </span>
                <v-hover v-for="item in project.links" :key="item.to" >
                    <template v-slot="{ hover }">
                        <v-btn :href="item.to" target="_blank" icon style="float:right;" :ripple="false">
                            <v-icon :size="25" :color="hover ? color : 'white'">{{ item.icon }}</v-icon>
                        </v-btn>
                    </template>
                </v-hover>
        </v-col>
    </v-row>
</v-col>
</template>

<style>
.v-btn:hover .v-btn:before, .v-btn:active {
    background-color: transparent;
    text-shadow: 0 0 4px;
}
</style>