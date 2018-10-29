<template>
<v-app>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
</v-app>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style>
.slide-enter-active {
  transition: all .3s ease;
}

.slide-enter, .slide-leave-to {
  transform: translateX(400px);
}
</style>
