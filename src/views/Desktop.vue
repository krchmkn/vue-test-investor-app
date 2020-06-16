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

    <div class="wrap" @keyup.esc="restore" tabindex="0" ref="wrap">
      <vue-draggable-resizable
        v-for="item in blocks"
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
        @dragstop="(x, y) => updateBlock(item.id, x, y)"
        @resizestop="(x, y, w, h) => updateBlock(item.id, x, y, w, h)"
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
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import { getBlocks } from '@/helpers/';
import {
  STORAGE_KEY,
  DEFAULT_BLOCK_WIDTH,
  DEFAULT_BLOCK_HEIGHT,
} from '@/constants/';

export default {
  name: 'Desktop',
  components: {
    VueDraggableResizable,
  },
  data() {
    return {
      activeBlockClass: 'draggable-resizable--active',
      blocks: [],
      removedBlock: null,
      removedBlockIndex: null,
    };
  },
  computed: {
    restoredBlockDimensions() {
      return {
        x: window.innerWidth / 2 - DEFAULT_BLOCK_WIDTH / 2,
        y: window.innerHeight / 2 - DEFAULT_BLOCK_HEIGHT / 2,
        width: DEFAULT_BLOCK_WIDTH,
        height: DEFAULT_BLOCK_HEIGHT,
      };
    },
  },
  created() {
    this.blocks = getBlocks();
  },
  methods: {
    storeBlocks(blocks) {
      const result = Array.isArray(blocks) ? blocks : this.blocks;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    },
    updateBlock(id, x, y, width, height) {
      const blocks = this.blocks.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            x,
            y,
            z: 1,
            width: width || el.width,
            height: height || el.height,
          };
        }
        return { ...el, z: 0 };
      });
      this.storeBlocks(blocks);
    },
    remove(blockID) {
      const index = this.blocks.findIndex((el) => el.id === blockID);
      if (index === -1) {
        return;
      }
      this.removedBlock = this.blocks[index];
      this.removedBlockIndex = index;
      this.blocks.splice(index, 1);
      this.storeBlocks();
    },
    restore() {
      if (!this.removedBlock) {
        return;
      }
      this.blocks.splice(this.removedBlockIndex, 0, {
        ...this.removedBlock,
        ...this.restoredBlockDimensions,
      });
      this.removedBlock = null;
      this.removedBlockIndex = null;
      this.storeBlocks();
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
