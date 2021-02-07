<template>
<div class="parent">
        <span v-if="debug || $vuetify.breakpoint.lgAndUp" class="grey--text canvasContent" :style="`font-family: 'JetBrains Mono'; display: inline-block; ${ $vuetify.breakpoint.smAndDown ? 'position: absolute; top: 20px; left: 20px; font-size: 13px;' : 'position: absolute; left: 20px; bottom: 20px;'}`">BOIDS: {{flockCount}}</span>
        <span class="grey--text canvasContent" :style="`font-family: 'JetBrains Mono'; ${ $vuetify.breakpoint.smAndDown ? 'position: absolute; top: 20px; right: 20px; font-size: 13px;' : 'position: absolute; bottom: 20px; right: 20px;'}`">FPS: {{fps}}</span>
        <canvas id="content" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" width="100%" height="100%" />
        <slot :content-id="'canvasContent'" ></slot>
    </div>
</template>

<script>
/*

    FOLLOWED FROM https://github.com/beneater/boids/blob/master/boids.js, THANKS FOR THE STARTING POINT MR. BEN!! :D

*/
const MAX_BOIDS = 250
const VIEW_DIST = 100
const VIEW_ANGLE = 180
const CHUNK_SIZE = 100 // square screen chunk size

const VIEW_ANGLE_RAD = VIEW_ANGLE * (Math.PI / 180)

// non-reactive array of boids
var flock = []
var boundaries = []
var chunks = []
var emptyChunks = []

var onBoids = []

var mouseX = -1
var mouseY = -1

var lastLoop = new Date()

var fps = 1;
var times = [];
var getFps = function (timestamp) {
    while (times.length > 0 && times[0] <= timestamp - 1000) {
        times.shift();
    }
    times.push(timestamp);
    fps = times.length;
    // console.log(fps);
    return fps
}

const toDegrees = (rad) => {
    return rad * 180 / Math.PI
}

function newBitset(length) {
    // create empty 'bitset' with all zeroes
    return Array(Math.floor(length / 32)).fill(0)
}

// set bit[i]
function setBit(bitset, i) {
    var arrIndex = Math.floor(i / 32)
    var bitIndex = i % 32

    bitset[arrIndex] |= (1 << bitIndex)

    return bitset
}

// test bit[i]
function testBit(bitset, i) {
    var arrIndex = Math.floor(i / 32)
    var bitIndex = i % 32

    return (bitset[arrIndex] >> bitIndex) & 1
}

// reset bit[i]
function clearBit(bitset, i) {
    var arrIndex = Math.floor(i / 32)
    var bitIndex = i % 32

    bitset[arrIndex] &= ~(1 << bitIndex);
}


export default {
    name: "Boids",
    props: {
        num: {
            type: Number,
            default: 50
        },
        debug: {
            type: Boolean,
            default: false
        }
    },
    // most the data for the boids dont need to AND SHOULDNT be reactive
    // so i am going to refactor most of these variables out
    data: () => ({
        canvas: null,
        canvasOffset: [0,0], // x, y
        ctx: null,
        looper: 0,
        fps: 0,
        flockCount: 0,
    }),
    mounted() {
        // weird loading stuff, make sure canvas is right size.
        setTimeout(() => {
            this.canvas = document.getElementById("content")
            // console.log(document.getElementById("canvasContent").getBoundingClientRect())
            var canvDims = this.canvas.getBoundingClientRect()
            this.canvasOffset = [canvDims.x, canvDims.y]
            this.canvas.width = canvDims.width
            this.canvas.height = canvDims.height
            console.log(this.canvas.width, this.canvas.height)
            this.ctx = this.canvas.getContext("2d")
            this.initChunks()

            // create obstacles from class name
            document.getElementsByClassName("canvasContent").forEach((el) => {
                this.registerBoundary(el.getBoundingClientRect())
            })

            // initialize nearby i
            // nearbyData = Array(this.num).fill()
            // this.canvas.ontouchmove = (e) => {
                //     mouseX = e.offsetX
            //     mouseY = e.offsetY
            // }

            this.canvas.onmousemove = (e) => {
                    mouseX = e.offsetX
                    mouseY = e.offsetY
            }

            // register new boid on click
            let hold;
            let touch;
            this.canvas.onmousedown = (e) => {

                // get initial pos
                mouseX = e.offsetX
                mouseY = e.offsetY

                // keep track of drag pos
                // register mouse pos updates
                this.canvas.onmousemove = (e) => {
                    mouseX = e.offsetX
                    mouseY = e.offsetY
                }

                hold = setInterval(() => {
                    flock.push(this.newBoid(mouseX, mouseY, flock.length))
                    if (flock.length > MAX_BOIDS) {
                            flock.shift()
                    }
                }, 50)
            }
            this.canvas.ontouchstart = (e) => {
                var t = e.touches[0]
                mouseX = t.clientX - this.canvasOffset[0]
                mouseY = t.clientY - this.canvasOffset[1]

                this.canvas.ontouchmove = (e) => {
                    var t1 = e.touches[0]
                    mouseX = t1.clientX - this.canvasOffset[0]
                    mouseY = t1.clientY - this.canvasOffset[1]
                }

                touch = setInterval(() => {
                    flock.push(this.newBoid(mouseX, mouseY, flock.length))
                }, 50)
            }
            this.canvas.onmouseup = (e) => {
                clearInterval(hold)
            }
            this.canvas.ontouchend = (e) => {
                mouseX = -1
                mouseY = -1
                this.canvas.ontouchmove = null
                clearInterval(touch)
            }

            // create the flock
            for(var i = 0; i < this.num; i++) {
                flock.push(this.newBoid(Math.random() * this.canvas.width, Math.random() * this.canvas.height, flock.length))
            }


            // start anim loop
            window.requestAnimationFrame(this.updateLoop)
        }, 100)
    },
    beforeDestroy() {
        flock = []
        boundaries = []
        onBoids = []
        chunks = []
        console.log("reset boid data")
    },
    computed: {
    },
    methods: {
        initChunks() {
            // padding for offscreen
            // var padding = CHUNK_SIZE * 3
            // reset chunks
            chunks = []
            // 3d array jfc...
            for(var row = 0; row < this.canvas.height; row += CHUNK_SIZE) {
                var rowArr = []
                for(var i = 0; i < this.canvas.width; i += CHUNK_SIZE) {
                    rowArr.push([]) // new bitset with size of the flock length
                }
                chunks.push(rowArr)
            }
            emptyChunks = JSON.parse(JSON.stringify(chunks));
            console.log(chunks)
        },
        updateLoop(timestamp) {
            // for use in template during debug
            this.flockCount = flock.length
            this.fps = getFps(timestamp)
            // var thisLoop = new Date();
            // this.fps = 1000 / (thisLoop - lastLoop);
            // lastLoop = thisLoop;
            this.updateBoundaries()

            // reset canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            if (this.debug) {
                for (let b of boundaries) {
                    // console.log(b)
                    this.ctx.strokeStyle = this.$vuetify.theme.themes.dark.info
                    this.ctx.shadowBlur = 0
                    this.ctx.strokeRect(b.left, b.top, b.right - b.left, b.bottom - b.top)
                }

                this.drawChunks(this.ctx)
            }

            // update all the chunks -- todo
            // for (let boid of flock) {
            //     try {
            //         chunks[Math.floor(boid.y / CHUNK_SIZE)][Math.floor(boid.x / CHUNK_SIZE)].push(boid)
            //         if (boid.id === flock[0].id) {
            //             console.log(chunks)
            //             // console.log(emptyChunks)
            //         }
            //     } catch {
            //     }
            // }


            for(let boid of flock) {
                // all velocity adjustments performed at once
                this.adjustVelocity(boid)

                boid.x += boid.dx
                boid.y += boid.dy

                this.drawBoid(boid, this.ctx)
            }

            // reset the chunks for the next loop
            chunks = JSON.parse(JSON.stringify(emptyChunks));

            window.requestAnimationFrame(this.updateLoop)
        },
        newBoid(x, y, id) {
            var boid = {
                id: id,
                x: x, // x pos
                y: y, // y pos
                dx: Math.random() * 20 - 5, // x vel
                dy: Math.random() * 20 - 5, // y vel
                angle: 0,
                on: (Math.random() > .01)
                // nearby: new Set([])
            }
            const angle = Math.atan2(boid.dy, boid.dx)
            boid.angle = angle
            return boid
        },
        drawBoid(boid, ctx) {
            boid.angle = Math.atan2(boid.dy, boid.dx)
            boid.on = ((boid.on && Math.random() > .99) || (!boid.on && Math.random() > .8)) ? !boid.on : boid.on
            if (this.debug && boid.id === flock[0].id) {
                ctx.fillStyle = "rgba(255,255,255, .4)"
                ctx.fillRect(Math.floor(boid.x - (boid.x % CHUNK_SIZE)), Math.floor(boid.y - (boid.y % CHUNK_SIZE)), CHUNK_SIZE, CHUNK_SIZE)
                ctx.beginPath()
                ctx.moveTo(boid.x, boid.y)
                ctx.lineTo(boid.x + (Math.cos(boid.angle) * VIEW_DIST), boid.y + (Math.sin(boid.angle) * VIEW_DIST))
                ctx.strokeStyle = "#ff00ff"
                ctx.closePath()
                ctx.stroke()
                ctx.fillStyle = this.$vuetify.theme.themes.dark.success
            } else {
                ctx.fillStyle = boid.on ? this.$vuetify.theme.themes.dark.primary : "#666"
            }
            ctx.translate(boid.x, boid.y)
            ctx.rotate(boid.angle - (90 * Math.PI / 180)) // rotate the v character
            ctx.translate(-boid.x, -boid.y)
            ctx.shadowColor = ctx.fillStyle
            ctx.shadowBlur = boid.on ? 4 : 0
            ctx.font = '15px "JetBrains Mono"'
            ctx.textAlign = "center"
            ctx.fillText('V', boid.x, boid.y)
            if (this.debug && boid.id === flock[0].id) {
                // ctx.beginPath();
                // ctx.arc(boid.x, boid.y, VIEW_DIST, 0, VIEW_ANGLE_RAD, false);
                // ctx.fillStyle = "rgb(255, 255, 0)";
                // ctx.fill();

            }
            ctx.setTransform(1, 0, 0, 1, 0, 0)

        },

        drawChunks(ctx) {
            for(var i = 0; i < chunks.length; i++) {
                for (var j = 0; j < chunks[i].length; j++) {
                    ctx.strokeWidth = 2
                    ctx.strokeStyle = "rgba(255,255,255,.1)"
                    ctx.strokeRect(j * CHUNK_SIZE, i * CHUNK_SIZE, CHUNK_SIZE, CHUNK_SIZE)
                }
            }
        },

        inView(b1, b2x, b2y) {
            // if (Math.floor(b1.x) === Math.floor(b2x) || Math.floor(b1.y) === Math.floor(b2y)) return true

            // b1.nearby.forEach((currentTest) => {
            //     if (currentTest.id == b2.id) {
            //         console.log(b2.nearby)
            //         b2.nearby.add(b1.id)
            //         b1.nearby.add(b2.id)
            //         return true
            //     }
            // })

            // b2.nearby.forEach((currentTest) => {
            //     if (currentTest.id == b1.id) {
            //         b2.nearby.add(b1.id)
            //         b1.nearby.add(b2.id)
            //         return true
            //     }
            // })
            
            var xDiff = b2x - b1.x
            var yDiff = b2y - b1.y

            // boids are aware of any surrounding boids
            // if (Math.abs(xDiff) < VIEW_DIST * .01 && Math.abs(yDiff) < VIEW_DIST * .01) return true

            // 1100_0010_0001_0111_0000_0000_0000_0000
            // sign: negative
            // exp: 1000_0100 = 132 - 127 = 5
            // fraction: 0010_1110_0000_0000_0000_000 -> 0010_1110
            // bin: -0b1.0010_1110 * 2^5 = -0b100101.11
            // dec: 37.75

            // -37.75 = -0b100101.11, normalize() -> 0b1.0010_1110 * 2^5
            // sign: 1
            // exponent (11 bits): 5 + 1023 = 1028 = 0b1000_0000_100
            // fraction (52 bits): 0010_1110_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000
            // bin: 0b1100_0000_0100_0010_1110_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000
            // hex: 0xc042e00000000000


            // TODO: Figure out the view angle stuff :/
            const angleDiff = Math.atan2(yDiff, xDiff)
            // const toD = (rads) => (rads * 180 / Math.PI)

            var destAngle = angleDiff - (b1.angle)

                // console.log(toDegrees(b1.angle), toDegrees(angleDiff), toDegrees(destAngle))
            if ((destAngle >= 0 && destAngle > VIEW_ANGLE_RAD ) || (destAngle <= 0 && destAngle < -VIEW_ANGLE_RAD)) {
                // not in the view angle
                return false
            }

            var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff)
            if (distance < VIEW_DIST) {
                // if (distance <= 0.5) return false
                // b2.nearby.add(b1.id)
                // b1.nearby.add(b2.id)
                return true
            }
            return false
        },
        adjustVelocity(boid) {
            // multi-use vars
            let localNum = 0

            // centering vars
            const centerFactor = .001
            let centerX = 0
            let centerY = 0

            // avoid vars
            const avoidFactor = 0.01
            let xAdjustment = 0
            let yAdjustment = 0

            // alignment vars
            const alignFactor = 0.01
            let avgDx = 0
            let avgDy = 0

            for (let otherBoid of flock) {
                if (otherBoid.id === boid.id) continue
                if (this.inView(boid, otherBoid.x, otherBoid.y)) {
                    if (this.debug && boid.id === flock[0].id) {
                        // if (b1.angle === Math.PI / 2) { console.log(b1.angle) }
                        this.ctx.beginPath()
                        this.ctx.moveTo(boid.x, boid.y)
                        this.ctx.lineTo(otherBoid.x, otherBoid.y)
                        this.ctx.strokeStyle = "rgba(0, 255, 0, 1)"
                        this.ctx.stroke()
                    }
                    // do all the stuff in one loop for fastness?
                    // kinda messy :[
                    localNum += 1

                    // centering adjustments
                    centerX += otherBoid.x
                    centerY += otherBoid.y

                    // avoid adjustments
                    var xDiff = boid.x - otherBoid.x
                    var yDiff = boid.y - otherBoid.y
                    var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
                    // if (distance < VIEW_DIST) {
                    //     if (this.debug && boid.id === flock[0].id)
                    //     xAdjustment += xDiff / VIEW_DIST
                    //     yAdjustment += yDiff / VIEW_DIST
                    // }

                    if (distance < VIEW_DIST * .3 && distance > 0) {
                        xAdjustment += xDiff
                        yAdjustment += yDiff
                    }

                    // align adjustments
                    avgDx += otherBoid.dx
                    avgDy += otherBoid.dy

                    // console.log("TEST")
                }
            }

            // only do centering and alignment if there are local boids
            if (localNum) {
                // adjust velocity for centering 
                centerX /= localNum
                centerY /= localNum

                boid.dx += (centerX - boid.x) * centerFactor
                boid.dy += (centerY - boid.y) * centerFactor

                // get the avg align vel
                avgDx /= localNum
                avgDy /= localNum

                // adjust velocity from avoids
                boid.dx += xAdjustment * avoidFactor
                boid.dy += yAdjustment * avoidFactor
                
                // adjust vel to align
                boid.dx += (avgDx - boid.dx) * alignFactor
                boid.dy += (avgDy - boid.dy) * alignFactor
            }

            this.avoidBoundaries(boid)
            this.targetMouse(boid)
            this.normalizeSpeed(boid)
        },

        // avoid the boundaries in a natural-looking way
        avoidBoundaries(boid) {
            const margin = VIEW_DIST * 2
            const turnFactor = 5

            // avoid the walls
            if (boid.x < margin) {
                boid.dx += turnFactor / Math.abs(boid.x)
            }
            if (boid.x > this.canvas.width - margin) {
                boid.dx -= turnFactor / Math.abs(this.canvas.width - boid.x)
            }
            if (boid.y < margin) {
                boid.dy += turnFactor / Math.abs(boid.y)
            }
            if (boid.y > this.canvas.height - margin) {
                boid.dy -= turnFactor / Math.abs(this.canvas.height - boid.y)
            }

            // avoid the mouse -- deciding to target instead
            // var xMouseDiff = boid.x - mouseX
            // var yMouseDiff = boid.y - mouseY
            // if (Math.abs(xMouseDiff) < margin && Math.abs(yMouseDiff) < margin) {
            //     boid.dx += xMouseDiff * turnFactor * .01
            //     // boid.dy += yMouseDiff * turnFactor * .01
            // }

            // avoid content boundaries - this sorta works i think, but it definitely needs improving
            for(let boundary of boundaries) {
                // console.log(boid.y, boundary.bottom)
                if (boid.y >= boundary.top && boid.y <= boundary.bottom) {
                    // console.log(boid)
                    // console.log(boid.id === flock[0].id ? boid : '')
                    var rDist = boid.x - boundary.right
                    var lDist = boid.x - boundary.left
                    var closestDist
                    if (Math.abs(rDist) > Math.abs(lDist)) {
                        // on the left
                        if (this.inView(boid, boundary.left, boid.y)) boid.dx -= turnFactor / Math.abs(lDist)

                    } else {
                        // closestDist = rDist
                        if (this.inView(boid, boundary.right, boid.y)) boid.dx += turnFactor / Math.abs(rDist)
                    }
                    // if ((Math.min(Math.abs(boid.x) - )))
                } 

                if (boid.x >= boundary.left && boid.x <= boundary.right) {
                    // console.log(boid.id === flock[0].id ? boid.id : '')
                    // var closestDist = Math.min(Math.abs(boid.y - boundary.top), Math.abs(boid.y - boundary.bottom))
                    var tDist = boid.y - boundary.top
                    var bDist = boid.y - boundary.bottom
                    var closestDist
                    if (Math.abs(bDist) > Math.abs(tDist)) {
                        // closestDist = tDist
                        // on the top
                        if (this.inView(boid, boid.x, boundary.top)) boid.dy -= turnFactor / Math.abs(tDist)
                    } else {
                        // closestDist = bDist
                        if (this.inView(boid, boid.x, boundary.bottom)) boid.dy += turnFactor / Math.abs(bDist)
                    }
                    // if (Math.abs(closestDist) < margin * .5) {
                    //     boid.dx += (1 / closestDist)
                    //     // boid.dy += closestDist * turnFactor * .001
                    // }
                }
            }
        },
        targetMouse(boid) {
            const targetFactor = .00015

            if (mouseX < 0 && mouseY < 0) return

            var targetDx = mouseX - boid.x
            var targetDy = mouseY - boid.y

            // console.log(targetDx, targetDy)

            boid.dx += targetDx * targetFactor
            boid.dy += targetDy * targetFactor
            // console.log(boid)
        },
        normalizeSpeed(boid) {
            const speedLimit = 5
            const speedMin = 2

            const speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy)
            if (speed > speedLimit) {
                boid.dx = (boid.dx / speed) * speedLimit
                boid.dy = (boid.dy / speed) * speedLimit
            } // else if (speed < speedMin) {
            //     boid.dx = speedMin
            //     boid.dy = speedMin
            // }
        },
        registerBoundary({ left, top, right, bottom }) {
            const padding = 3;
            var boundary = {
                top: top - this.canvasOffset[1] - padding,
                left: left - this.canvasOffset[0] - padding,
                right: right  -this.canvasOffset[0] + (padding * 2),
                bottom: bottom - this.canvasOffset[1] + (padding * 2)
            }

            boundaries.push(boundary)
        },
        updateBoundaries() {
            var contentArr = document.getElementsByClassName("canvasContent")
            if(contentArr.length !== boundaries.length) {
                boundaries = []
                contentArr.forEach((el) => {
                    this.registerBoundary(el.getBoundingClientRect())
                })
            }
        }
    }

}
</script>

<style>

</style>