<template>
 <div class="wrapper">
   <vue-canvas-nest :config="{color:'255,0,255', count: 99, opacity: 0.7,}"> </vue-canvas-nest>
    <v-head></v-head>
    <div class="content">
      <transition name="move" mode="out-in"><router-view></router-view></transition>
    </div>
    <v-foot></v-foot>
   
  </div>
</template>

<script>
import vHead from './Header.vue'
import vFoot from './Footer.vue'
import vueCanvasNest from 'vue-canvas-nest'

export default {
  data () {
  },
  components: {
    vHead,
    vFoot,
    vueCanvasNest
  }
}
</script>

<style scoped>
.wrapper{
  min-height:100%;
  height: auto !important;
  position: relative;
  background-color: rgba(233, 233, 233, 0.2)
}
.content{
  /*background-color: #bbbbbb;*/
  padding-top:7rem;
  min-height:100%;
  height: auto !important;
}
</style>
