<template>
  <canvas
    id="content"
    style="position: absolute; width: 100%; height: 100%; left: 0; top: 0"
  />
</template>

<script>
// import { getElevationBlockAt, BLOCK_SIZE } from "@/mixins/apis"
import { isoLines } from "marchingsquares"
import SimplexNoise from "simplex-noise"
const noise = new SimplexNoise()
const grid_size = 50
const precision = 0.1

let time = 0
let time_scale = 0.001

let worker1

const grid = Array.from({ length: grid_size }, () =>
  Array.from({ length: grid_size }, () => false),
)

let canvas, ctx
const res = {
  x: 0,
  y: 0,
}

let lines = []

function gameloop() {
  // render last thing
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  lines?.forEach((t) => {
    t.forEach((g) => {
      g.forEach((line, i) => {
        try {
          if (
            line.length != 0 &&
            (line[0] != 0 || g[i + 1][0] != 0) &&
            (line[1] != 0 || g[i + 1][1] != 0) &&
            (line[0] != canvas.width || g[i + 1][0] != canvas.width) &&
            (line[1] != canvas.height || g[i + 1][1] != canvas.height)
          ) {
            ctx.beginPath()
            ctx.moveTo(line[0] * res.x, line[1] * res.y)
            ctx.lineTo(g[i + 1][0] * res.x, g[i + 1][1] * res.y)
            ctx.stroke()
          }
        } catch (e) {}
      })
    })
  })
  // build grid
  for (var i = 0; i < grid_size; i++) {
    for (var j = 0; j < grid_size; j++) {
      grid[i][j] = noise.noise3D(j * precision, i * precision, time)
    }
  }

  time += time_scale
  // send data to thread to compute
  //lines = worker1.postMessage([grid, [-.5, 0, .5]])
  lines = isoLines(grid, [-0.5, 0, 0.5], { noFrame: true })

  // get next frame
  window.requestAnimationFrame(gameloop)
}

export default {
  //  async mounted() {
  //    canvas = document.getElementById("content")
  //    ctx = canvas.getContext("2d")
  //    let elev = await getElevationBlockAt(35.9603948, -83.9210261)
  //
  //
  //  },

  data: () => ({
    lines: [],
  }),

  mounted() {
    // canvas stuff
    canvas = document.getElementById("content")
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    ctx = canvas.getContext("2d")
    ctx.strokeStyle = "#03a9f4aa"
    ctx.lineWidth = 2
    // worker1 = this.$worker.createWorker()

    res.x = canvas.width / grid_size + 3
    res.y = canvas.height / grid_size + 3

    // worker1.onmessage = function({ data }) {
    //   lines = data
    // }

    window.requestAnimationFrame(gameloop)
  },
  methods: {},
}
</script>

<style></style>
