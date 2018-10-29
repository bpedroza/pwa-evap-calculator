<template>
<div>
  <Drawer :drawer="nav.drawer" @drawerStatus="nav.drawer = $event" :position="nav.position" />
  <v-toolbar fixed app :clipped-left="clipped">
    <v-toolbar-side-icon @click.stop="nav.drawer = !nav.drawer"></v-toolbar-side-icon>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-content>
    <Calculator />
  </v-content>
</div>
</template>

<script>
import Drawer from './Drawer'
import Calculator from './Calculator'

export default {
  name: 'App',
  components: {
    Drawer,
    Calculator
  },
  data() {
    return {
      drawer: false,
      clipped: false,
      title: 'Evaporative Cooler Helper',
      nav: {
        drawer: false,
        position: null
      },
    }
  }
}
</script>
