(this.webpackJsonp=this.webpackJsonp||[]).push([[13],{474:function(t,e,n){"use strict";n(15),n(17),n(22),n(23);var r=n(2),o=(n(5),n(63),n(91),n(30),n(14),n(25),n(50),n(460),n(39),n(461),n(462),n(463),n(464),n(465),n(466),n(467),n(468),n(469),n(470),n(471),n(472),n(473),n(40),n(16),n(299),n(0)),l=n(81),c=n(1);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var y=["sm","md","lg","xl"],m=["start","end","center"];function v(t,e){return y.reduce((function(n,r){return n[t+Object(c.o)(r)]=e(),n}),{})}var h=function(t){return[].concat(m,["baseline","stretch"]).includes(t)},j=v("align",(function(){return{type:String,default:null,validator:h}})),x=function(t){return[].concat(m,["space-between","space-around"]).includes(t)},O=v("justify",(function(){return{type:String,default:null,validator:x}})),w=function(t){return[].concat(m,["space-between","space-around","stretch"]).includes(t)},C=v("alignContent",(function(){return{type:String,default:null,validator:w}})),_={align:Object.keys(j),justify:Object.keys(O),alignContent:Object.keys(C)},S={align:"align",justify:"justify",alignContent:"align-content"};function k(t,e,n){var r=S[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var P=new Map;e.a=o.a.extend({name:"v-row",functional:!0,props:d(d(d({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:h}},j),{},{justify:{type:String,default:null,validator:x}},O),{},{alignContent:{type:String,default:null,validator:w}},C),render:function(t,e){var n=e.props,data=e.data,o=e.children,c="";for(var f in n)c+=String(n[f]);var d=P.get(c);if(!d){var y,m;for(m in d=[],_)_[m].forEach((function(t){var e=n[t],r=k(m,t,e);r&&d.push(r)}));d.push((y={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(y,"align-".concat(n.align),n.align),Object(r.a)(y,"justify-".concat(n.justify),n.justify),Object(r.a)(y,"align-content-".concat(n.alignContent),n.alignContent),y)),P.set(c,d)}return t(n.tag,Object(l.a)(data,{staticClass:"row",class:d}),o)}})},498:function(t,e,n){var content=n(511);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(20).default)("ad33dd26",content,!0,{sourceMap:!1})},510:function(t,e,n){"use strict";n(498)},511:function(t,e,n){var r=n(19)((function(i){return i[1]}));r.push([t.i,'.v-btn:active,.v-btn:before,.v-btn:hover{background-color:transparent;text-shadow:0 0 4px}b{text-shadow:0 0 4px #000}b,h1{font-family:"JetBrains Mono"}h1,h2{font-weight:400}h2{font-family:"Chakra Petch";font-size:40px}a{-webkit-text-decoration:none;text-decoration:none}a:hover{text-shadow:0 0 4px}',""]),r.locals={},t.exports=r},538:function(t,e,n){"use strict";n.r(e);var r=n(452),o=n(536),l=n(290),c=n(189),f=n(474),d={name:"about",head:function(){return{title:"About"}}},y=(n(510),n(35)),component=Object(y.a)(d,(function(){var t=this,e=t._self._c;return e(f.a,{staticClass:"pt-12"},[e(o.a,{staticClass:"mr-md-12",attrs:{cols:"12",sm:"6",md:"4"}},[e("h1",{staticClass:"text-h4 mb-4 grey--text text--lighten-2",staticStyle:{"font-family":"'Aleo' !important"}},[t._v("\n      Hey! I'm Zavier.\n    ")]),t._v(" "),e("p",{staticClass:"grey--text text--lighten-1 mb-4",staticStyle:{"font-family":"'Aleo' !important","font-size":"19px"}},[t._v("\n      I am a college senior studying computer science at\n      "),e("b",{staticStyle:{color:"#ff8200","font-family":"'Inter' !important"}},[t._v("UTK")]),t._v(".\n    ")]),t._v(" "),e("p",{staticClass:"grey--text text--lighten-1",staticStyle:{"font-family":"'Aleo' !important","font-size":"19px"}},[t._v("\n      I have been building websites for over 10 years and learning more\n      traditional programming for about 8. Currently, I work as a software and\n      devops engineer at\n      "),e("a",{staticClass:"link",attrs:{href:"https://www.resaleai.com"}},[t._v("ResaleAI")]),t._v(". Outside of\n      programming I love almost any and everything, including (but not limited\n      to): 3D modeling and art, graphic design, motion graphics, astronomy,\n      and stand-up comedy.\n    ")]),t._v(" "),e("p",{staticClass:"grey--text text--lighten-1",staticStyle:{"font-family":"'Aleo' !important","font-size":"19px"}},[t._v("\n      On my personal site (this one) you can find the projects I am most proud\n      of, and a journal of my technical, personal, and academic reflections.\n    ")]),t._v(" "),e(r.a,{staticClass:"px-0",staticStyle:{"font-family":"'JetBrains Mono'","text-transform":"none"},attrs:{text:"",color:"primary",ripple:!1,href:"Resume.pdf",download:""}},[t._v("Peep the Resume")])],1),t._v(" "),e(o.a,{staticClass:"mr-12",attrs:{cols:"12",sm:"6"}},[e(l.a,{staticClass:"elevation-12",attrs:{src:"beach.jpg"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e(f.a,{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[e(c.a,{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}])}),t._v(" "),e("p",{staticClass:"text-caption",staticStyle:{"font-family":"'JetBrains Mono' !important","text-align":"center"}},[t._v("\n      Me (second from the right) and a couple of friends keeping it cool at\n      the beach B]\n    ")])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);