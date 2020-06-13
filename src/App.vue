<template>
  <v-app>
    <base-nav />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BaseNav from '@/components/BaseNav.vue';

export default {
  name: 'App',
  components: {
    BaseNav,
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
