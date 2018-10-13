<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <calculator/>
    </v-content>
  </v-app>
</template>

<script>
import Calculator from './components/Calculator'

export default {
  name: 'App',
  components: {
    Calculator
  },
  data () {
    return {
      fixed: false,
      miniVariant: false,
      title: 'Evaporative Cooler Helper'
    }
  }
}
</script>
