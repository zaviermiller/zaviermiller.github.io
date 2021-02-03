<template>
<div class="parent">
        <!-- <span class="primary--text" :style="`font-family: 'JetBrains Mono'; ${ $vuetify.breakpoint.smAndDown ? '' : 'position: absolute; bottom: 20px; right: 20px;'}`">FPS: {{fps}}</span> -->
        <canvas id="content" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" width="100%" height="100%" />
        <slot :content-id="'canvasContent'" ></slot>
    </div>
</template>

<script>
/*

    FOLLOWED FROM https://github.com/beneater/boids/blob/master/boids.js, THANKS FOR THE STARTING POINT MR. BEN!! :D

*/
const MAX_BOIDS = 250
const VIEW_DIST = 75
const VIEW_ANGLE = 120

const VIEW_ANGLE_RAD = VIEW_ANGLE * (Math.PI / 180)

// non-reactive array of boids
var flock = []
var boundaries = []
let nearbyData

var onBoids = []

var mouseX, mouseY

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

export default {
    name: "Boids",
    props: {
        num: {
            type: Number,
            default: 50
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
    }),
    mounted() {
        this.canvas = document.getElementById("content")
        // console.log(document.getElementById("canvasContent").getBoundingClientRect())
        var canvDims = this.canvas.getBoundingClientRect()
        this.canvasOffset = [canvDims.x, canvDims.y]
        this.canvas.width = this.canvas.clientWidth
        this.canvas.height = this.canvas.clientHeight
        this.ctx = this.canvas.getContext("2d")

        // create obstacles from class name
        document.getElementsByClassName("canvasContent").forEach((el) => {
            this.registerBoundary(el.getBoundingClientRect())
        })

        // initialize nearby i
        nearbyData = Array(this.num).fill()

        // register mouse pos updates
        this.canvas.onmousemove = (e) => {
            mouseX = e.offsetX
            mouseY = e.offsetY
        }

        // register new boid on click
        let hold;
        let touch;
        this.canvas.onmousedown = (e) => {
            hold = setInterval(() => {
                mouseX = e.offsetX
                mouseY = e.offsetY
                flock.push(this.newBoid(e.offsetX, e.offsetY, flock.length))
                // while (flock.length > MAX_BOIDS) {
                //     flock.shift()
                // }
            }, 50)
        }
        this.canvas.ontouchstart = (e) => {
            touch = setInterval(() => {
                mouseX = e.offsetX
                mouseY = e.offsetY
                flock.push(this.newBoid(e.offsetX, e.offsetY, flock.length))
            }, 50)
        }
        this.canvas.onmouseup = (e) => {
            clearInterval(hold)
        }
        this.canvas.ontouchend = (e) => {
            clearInterval(touch)
        }

        // create the flock
        for(var i = 0; i < this.num; i++) {
            flock.push(this.newBoid(Math.random() * this.canvas.width, Math.random() * this.canvas.height, flock.length))
        }


        // start anim loop
        window.requestAnimationFrame(this.updateLoop)
    },
    beforeDestroy() {
        flock = []
        boundaries = []
        onBoids = []
        console.log("reset boid data")
    },
    methods: {
        updateLoop(timestamp) {
            // for use in template
            this.fps = getFps(timestamp)
            this.updateBoundaries()

            // reset canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            for (let b of boundaries) {
                // console.log(b)
                this.ctx.rect(b.left, b.top, b.right - b.left, b.bottom - b.top)
            }


            for(let boid of flock) {
                // all velocity adjustments performed at once
                this.adjustVelocity(boid)

                boid.x += boid.dx
                boid.y += boid.dy

                this.drawBoid(boid, this.ctx)
            }

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
            boid.angle = Math.atan2(boid.dy, boid.dx) - (90 * Math.PI / 180)
            boid.on = ((boid.on && Math.random() > .95) || (!boid.on && Math.random() > .7)) ? !boid.on : boid.on

            ctx.translate(boid.x, boid.y);
            ctx.rotate(boid.angle);
            ctx.translate(-boid.x, -boid.y);
            ctx.fillStyle = boid.on ? this.$vuetify.theme.themes.dark.primary : "#ccc"
            ctx.shadowColor = ctx.fillStyle
            ctx.shadowBlur = boid.on ? 4 : 0;
            ctx.font = '15px "JetBrains Mono"';
            ctx.fillText('V', boid.x, boid.y);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        },
        inView(b1, b2) {
            if (b1.id == b2.id) return false

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
            
            var xDiff = b1.x - b2.x
            var yDiff = b1.y - b2.y


            // TODO: Figure out the view angle stuff :/
            // const angleDiff = Math.atan2(yDiff, xDiff)

            // var destAngle = angleDiff - b1.angle

            // if (Math.abs(destAngle) <= VIEW_ANGLE_RAD) {
            //     // not in the view angle
            //     return false
            // }

            var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff)
            if (distance < VIEW_DIST && b1.id !== b2.id) {
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
            const centerFactor = .01
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
                if (this.inView(boid, otherBoid) && boid !== otherBoid) {
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
                    if (distance < 50) {
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
            const margin = 100
            const turnFactor = 1

            // avoid the walls
            if (boid.x < margin) {
                boid.dx += turnFactor * .5
            }
            if (boid.x > this.canvas.width - margin) {
                boid.dx -= turnFactor * .5
            }
            if (boid.y < margin) {
                boid.dy += turnFactor * .5
            }
            if (boid.y > this.canvas.height - margin) {
                boid.dy -= turnFactor * .5
            }

            // avoid the mouse -- deciding to target instead
            // var xMouseDiff = boid.x - mouseX
            // var yMouseDiff = boid.y - mouseY
            // if (Math.abs(xMouseDiff) < margin && Math.abs(yMouseDiff) < margin) {
            //     boid.dx += xMouseDiff * turnFactor * .01
            //     // boid.dy += yMouseDiff * turnFactor * .01
            // }

            // avoid content boundaries
            for(let boundary of boundaries) {
                // console.log(boid.y, boundary.bottom)
                if (boid.y >= boundary.top && boid.y <= boundary.bottom) {
                    // console.log(boid)
                    // console.log(boid.id === 0 ? boid : '')
                    var rDist = boid.x - boundary.right
                    var lDist = boid.x - boundary.left
                    var closestDist
                    if (Math.abs(rDist) > Math.abs(lDist)) {
                        closestDist = lDist
                    } else {
                        closestDist = rDist
                    }
                    if (Math.abs(closestDist) < margin * .4) {
                        boid.dy += closestDist * turnFactor * .1
                        // boid.dx += closestDist * turnFactor * .01
                    }
                    // if ((Math.min(Math.abs(boid.x) - )))
                } 

                if (boid.x >= boundary.left && boid.x <= boundary.right) {
                    // console.log(boid.id === 0 ? boid.id : '')
                    var closestDist = Math.min(Math.abs(boid.y - boundary.top), Math.abs(boid.y - boundary.bottom))
                    var tDist = boid.y - boundary.top
                    var bDist = boid.y - boundary.bottom
                    var closestDist
                    if (Math.abs(bDist) > Math.abs(tDist)) {
                        closestDist = tDist
                    } else {
                        closestDist = bDist
                    }
                    if (Math.abs(closestDist) < margin * .4) {
                        boid.dx += closestDist * turnFactor * .1
                        // boid.dy += closestDist * turnFactor * .001
                    }
                }
            }
        },
        targetMouse(boid) {
            const targetFactor = .1

            var targetDx = mouseX - boid.x
            var targetDy = mouseY - boid.y

            // console.log(targetDx, targetDy)

            // boid.dx += targetDx * targetFactor
            // boid.dy += targetDy * targetFactor
        },
        normalizeSpeed(boid) {
            const speedLimit = 5

            const speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy)
            if (speed > speedLimit) {
                boid.dx = (boid.dx / speed) * speedLimit
                boid.dy = (boid.dy / speed) * speedLimit
            }
        },
        registerBoundary({ left, top, right, bottom }) {
            var boundary = {
                top: top - this.canvasOffset[1],
                left: left - this.canvasOffset[0],
                right: right  -this.canvasOffset[0],
                bottom: bottom - this.canvasOffset[1]
            }

            boundaries.push(boundary)
        },
        updateBoundaries() {
            var contentArr = document.getElementsByClassName("canvasContent")
            if(contentArr.length !== boundaries.length) {
                console.log("new boundary detected")
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