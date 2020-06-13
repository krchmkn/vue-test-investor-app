<template>
  <div>
    <base-nav />
    <router-view/>
  </div>
</template>

<script>
import BaseNav from '@/components/BaseNav.vue';

export default {
  name: 'DeskTop',
  components: {
    BaseNav,
  },
};
</script>
