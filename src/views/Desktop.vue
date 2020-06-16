<template>
  <div class="desktop">
    <v-alert
      border="left"
      colored-border
      color="deep-purple"
      elevation="2"
      dense
      dismissible
    >
      You can drag, resize, remove and restore blocks.
      Press ESC to restore removed block.
    </v-alert>

    <div class="wrap" @keyup.esc="onKeyUp" tabindex="0" ref="wrap">
      <vue-draggable-resizable
        v-for="item in blocksCopy"
        :key="item.id"
        :w="item.width"
        :h="item.height"
        :parent="true"
        :scale="0.5"
        :minWidth="100"
        :minHeight="50"
        :x="item.x"
        :y="item.y"
        :z="item.z"
        :class="{[activeBlockClass]: item.z}"
        :class-name-active="activeBlockClass"
        @dragstop="(x, y) => onDragStop(item.id, x, y)"
        @resizestop="(x, y, w, h) => onResizeStop(item.id, x, y, w, h)"
      >
        <div class="block">
          <div class="block__title">
            {{ item.title }}
            <span class="block__close" @click.stop="remove(item.id)">
              &times;
            </span>
          </div>
        </div>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import storeModule from '@/store/modules/desktop';
import baseMixins from '@/mixins/';
import { createNamespacedHelpers } from 'vuex';
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

const { mapState, mapMutations } = createNamespacedHelpers('desktop');

export default {
  name: 'Desktop',
  mixins: [baseMixins],
  components: {
    VueDraggableResizable,
  },
  data() {
    return {
      activeBlockClass: 'draggable-resizable--active',
      blocksCopy: [],
    };
  },
  computed: {
    ...mapState({
      blocks: (state) => state.blocks,
    }),
  },
  created() {
    this.registerModule('desktop', storeModule);
    this.blocksCopy = this.blocks;
  },
  methods: {
    ...mapMutations(['removeBlock', 'restoreBlock', 'updateBlock']),
    remove(itemID) {
      this.removeBlock(itemID);
      this.blocksCopy = this.blocks;
    },
    onKeyUp() {
      this.restoreBlock();
    },
    onDragStop(id, x, y) {
      this.updateBlock({ id, x, y });
    },
    onResizeStop(id, x, y, width, height) {
      this.updateBlock({
        id, x, y, width, height,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.desktop {
  height: 100%;
}

.wrap {
  position: relative;
  height: 100%;
  outline: none;
}

.block {
  background: #fff;
  overflow: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  &__title {
    box-sizing: border-box;
    padding: 5px 30px 5px 5px;
    background: #EDE7F6;
    font-size: 12px;
    position: relative;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
  }
}

.draggable-resizable--active {
  z-index: 1 !important;

  & .block__title {
    background: #673AB7;
    color: #fff;
  }
}
</style>
