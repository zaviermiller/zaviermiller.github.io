(this.webpackJsonp=this.webpackJsonp||[]).push([[5],{474:function(t,e,n){"use strict";n(15),n(17),n(22),n(23);var r=n(2),l=(n(5),n(63),n(91),n(30),n(14),n(25),n(50),n(460),n(39),n(461),n(462),n(463),n(464),n(465),n(466),n(467),n(468),n(469),n(470),n(471),n(472),n(473),n(40),n(16),n(299),n(0)),o=n(81),c=n(1);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function y(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d=["sm","md","lg","xl"],v=["start","end","center"];function m(t,e){return d.reduce((function(n,r){return n[t+Object(c.o)(r)]=e(),n}),{})}var h=function(t){return[].concat(v,["baseline","stretch"]).includes(t)},j=m("align",(function(){return{type:String,default:null,validator:h}})),O=function(t){return[].concat(v,["space-between","space-around"]).includes(t)},C=m("justify",(function(){return{type:String,default:null,validator:O}})),S=function(t){return[].concat(v,["space-between","space-around","stretch"]).includes(t)},w=m("alignContent",(function(){return{type:String,default:null,validator:S}})),_={align:Object.keys(j),justify:Object.keys(C),alignContent:Object.keys(w)},x={align:"align",justify:"justify",alignContent:"align-content"};function k(t,e,n){var r=x[t];if(null!=n){if(e){var l=e.replace(t,"");r+="-".concat(l)}return(r+="-".concat(n)).toLowerCase()}}var P=new Map;e.a=l.a.extend({name:"v-row",functional:!0,props:y(y(y({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:h}},j),{},{justify:{type:String,default:null,validator:O}},C),{},{alignContent:{type:String,default:null,validator:S}},w),render:function(t,e){var n=e.props,data=e.data,l=e.children,c="";for(var f in n)c+=String(n[f]);var y=P.get(c);if(!y){var d,v;for(v in y=[],_)_[v].forEach((function(t){var e=n[t],r=k(v,t,e);r&&y.push(r)}));y.push((d={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(d,"align-".concat(n.align),n.align),Object(r.a)(d,"justify-".concat(n.justify),n.justify),Object(r.a)(d,"align-content-".concat(n.alignContent),n.alignContent),d)),P.set(c,y)}return t(n.tag,Object(o.a)(data,{staticClass:"row",class:y}),l)}})},506:function(t,e,n){"use strict";n.r(e);var r=n(536),l=n(290),o=n(189),c=n(474),f={name:"RAIImages"},y=n(35),component=Object(y.a)(f,(function(){var t=this,e=t._self._c;return e(r.a,{attrs:{cols:"12",md:"5"}},[e(l.a,{staticClass:"elevation-12 my-8",staticStyle:{"margin-left":"-45%",position:"relative",left:"50%"},attrs:{src:"/bd-items.png",alt:"Items list",width:"90%"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e(c.a,{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[e(o.a,{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}])}),t._v(" "),e("p",{staticClass:"text-caption text-center mb-10",staticStyle:{"font-family":"'JetBrains Mono' !important"}},[t._v("Blind Dog items list")]),t._v(" "),e(l.a,{staticClass:"elevation-12 my-8",staticStyle:{"margin-left":"-45%",position:"relative",left:"50%"},attrs:{src:"/bd-item.png",alt:"Item details",width:"90%"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e(c.a,{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[e(o.a,{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}])}),t._v(" "),e("p",{staticClass:"text-caption text-center mb-10",staticStyle:{"font-family":"'JetBrains Mono' !important"}},[t._v("Item details page")]),t._v(" "),e(l.a,{staticClass:"elevation-12 my-8",staticStyle:{"margin-left":"-45%",position:"relative",left:"50%"},attrs:{src:"/bd-cart.png",alt:"Cart page",width:"90%"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e(c.a,{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[e(o.a,{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}])}),t._v(" "),e("p",{staticClass:"text-caption text-center mb-10",staticStyle:{"font-family":"'JetBrains Mono' !important"}},[t._v("Cart page")]),t._v(" "),e(l.a,{staticClass:"elevation-12 my-8",staticStyle:{"margin-left":"-45%",position:"relative",left:"50%"},attrs:{src:"/bd-checkout.png",alt:"Initial step of checkout flow",width:"90%"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e(c.a,{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[e(o.a,{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}])}),t._v(" "),e("p",{staticClass:"text-caption text-center mb-10",staticStyle:{"font-family":"'JetBrains Mono' !important"}},[t._v("Initial step of checkout flow")])],1)}),[],!1,null,null,null);e.default=component.exports}}]);