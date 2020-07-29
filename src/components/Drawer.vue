<template>
<v-navigation-drawer v-model="drawerChild" fixed temporary app :right="position">
  <v-list class="pt-0" dense>
    <v-divider></v-divider>
    <v-list-item v-for="item in items" :key="item.title" :to="item.url">
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</v-navigation-drawer>
</template>

<script>
export default {
  props: [
    'drawer',
    'position',
  ],
  data() {
    return {
      drawerChild: null,
      items: [{
        title: 'Calculator',
        icon: 'view_module',
        url: '/',
      },
      {
        title: 'About this tool',
        icon: 'question_answer',
        url: '/about',
      },
      ],
    };
  },
  watch: {
    drawer(value) {
      this.drawerChild = value;
    },
    drawerChild(value) {
      this.$emit('drawerStatus', value);
    },
  },
};
</script>
