<template>
  <div>
    <v-navigation-drawer
      v-model="isMenuOpen"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i" link
          :to="item.to"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'BaseNav',
  data() {
    return {
      isMenuOpen: false,
      menuItems: [
        {
          to: '/',
          icon: 'mdi-view-dashboard',
          title: 'Desktop',
        },
        {
          to: '/transactions',
          icon: 'mdi-trending-up',
          title: 'Transactions',
        },
      ],
    };
  },
  computed: {
    title() {
      return this.$route.name;
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
