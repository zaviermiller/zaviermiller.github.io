<script>
/*
    FROM https://codepen.io/designcouch/pen/Atyop
    Not really reuseable but idc anymore hehe
*/
export default {
    name: "AnimatedMenuIcon",
    props: {
        open: {
            type: Boolean,
            required: true
        }
    },
    watch: {
        open(v) {
            var e = document.getElementById("nav-icon")
            if (v) {
                e.classList.add("open")
            } else {
                e.classList.remove("open")
            }
        }
    },
    methods: {
        handleClick() {
            this.$emit("click")
        }
    }
}
</script>

<template>
    <div id="nav-icon" @click="handleClick()">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<style>
    #nav-icon {
        width: 24px;
        height: 18.3px;
        position: relative;
        margin: 50px auto;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .5s ease-in-out;
        -moz-transition: .5s ease-in-out;
        -o-transition: .5s ease-in-out;
        transition: .5s ease-in-out;
        cursor: pointer;
    }

#nav-icon span {
  display: block;
  position: absolute;
  height: 2.3px;
  width: 50%;
  background: white;
  opacity: 1;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

#nav-icon span:nth-child(even) {
  left: 50%;
  /* border-radius: 0 9px 9px 0; */
}

#nav-icon span:nth-child(odd) {
  left:0px;
  /* border-radius: 9px 0 0 9px; */
}

#nav-icon span:nth-child(1), #nav-icon span:nth-child(2) {
  top: 0px;
}

#nav-icon span:nth-child(3), #nav-icon span:nth-child(4) {
  top: 8px;
}

#nav-icon span:nth-child(5), #nav-icon span:nth-child(6) {
  top: 16px;
}

#nav-icon.open span:nth-child(1),#nav-icon.open span:nth-child(6) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

#nav-icon.open span:nth-child(2),#nav-icon.open span:nth-child(5) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

#nav-icon.open span:nth-child(1) {
  left: 2px;
  top: 3px;
}

#nav-icon.open span:nth-child(2) {
  left: calc(50% - 2px);
  top: 3px;
}

#nav-icon.open span:nth-child(3) {
  left: -50%;
  opacity: 0;
}

#nav-icon.open span:nth-child(4) {
  left: 100%;
  opacity: 0;
}

#nav-icon.open span:nth-child(5) {
  left: 2px;
  top: 10px;
}

#nav-icon.open span:nth-child(6) {
  left: calc(50% - 2px);
  top: 10px;
}
</style>