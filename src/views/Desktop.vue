<template>
  <div></div>
</template>

<script>
import storeModule from '@/store/modules/desktop';
import baseMixins from '@/mixins/';
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('desktop');

export default {
  name: 'Desktop',
  mixins: [baseMixins],
  computed: {
    ...mapState({
      blocks: (state) => state.blocks,
    }),
  },
  created() {
    this.registerModule('desktop', storeModule);
  },
};
</script>
