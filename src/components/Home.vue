<template>
<div>
  <Drawer :drawer="nav.drawer" @drawerStatus="nav.drawer = $event" :position="nav.position" />
  <v-app-bar fixed app :clipped-left="clipped">
    <v-app-bar-nav-icon title="Toggle Menu" @click.stop="nav.drawer = !nav.drawer"></v-app-bar-nav-icon>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
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
