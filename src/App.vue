<template>
<v-app>
  <transition :name="transitionName" :mode="transitionMode">
    <router-view></router-view>
  </transition>
</v-app>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-over',
      transitionMode: 'out-in',
    }
  },
  watch: {
    '$route'(to, from) {
      let toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length

      if(to.path == '/') {
          toDepth = 0;
      }

      if(toDepth < fromDepth) {
        this.transitionName = 'slide-off';
        this.transitionMode = 'in-out';
      } else {
        this.transitionName = 'slide-over';
        this.transitionMode = 'out-in';
      }
    }
  },
}
</script>
<style>
.slide-over-enter-active {
  transition: all .3s ease;
}

.slide-over-enter,
.slide-over-leave-to {
  transform: translateX(400px);
}

.slide-off-leave-active {
  transition: all 1.5s ease;
  position: absolute;
  top:0;
  z-index: 110;
  background: #fff;
}

.slide-off-enter {
  position: absolute;
  top:0;
  z-index: -1;
}

.slide-off-leave-to {
  transform: translateX(2000px);
}
</style>
