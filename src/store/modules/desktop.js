const defaultWidth = 300;
const defaultHeight = 100;

class Block {
  constructor(id, title, width, height, x, y, z) {
    this.id = id;
    this.title = title;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const getBlocks = () => {
  let blocks = localStorage.getItem('blocks');
  if (blocks) {
    try {
      blocks = JSON.parse(blocks);
    } catch (err) {
      // eslint-disable-next-line
      console.warn(err);
    }
  }

  if (Array.isArray(blocks)) {
    return blocks;
  }

  return Array.from({ length: 5 }, (v, k) => {
    const title = `Block${k + 1}`;
    const width = defaultWidth;
    const height = defaultHeight;
    const x = 0;
    const y = k > 0 ? (height * k) : 0;
    const z = 0;
    return new Block(k, title, width, height, x, y, z);
  });
};

const storeBlocks = (blocks) => {
  localStorage.setItem('blocks', JSON.stringify(blocks));
};

export default {
  namespaced: true,
  state: {
    removedBlock: null,
    removedBlockIndex: null,
    blocks: getBlocks(),
  },
  mutations: {
    removeBlock(state, blockID) {
      const index = state.blocks.findIndex((el) => el.id === blockID);
      if (index === -1) {
        return;
      }
      state.removedBlock = state.blocks[index];
      state.removedBlockIndex = index;
      state.blocks.splice(index, 1);
      storeBlocks(state.blocks);
    },
    restoreBlock(state) {
      if (!state.removedBlock || state.removedBlockIndex == null) {
        return;
      }
      state.blocks.splice(state.removedBlockIndex, 0, {
        ...state.removedBlock,
        width: defaultWidth,
        height: defaultHeight,
      });
      state.removedBlock = null;
      state.removedBlockIndex = null;
      storeBlocks(state.blocks);
    },
    updateBlock(state, {
      id, x, y, width, height,
    }) {
      const index = state.blocks.findIndex((el) => el.id === id);
      if (index === -1) {
        return;
      }
      state.blocks[index] = {
        ...state.blocks[index],
        x,
        y,
        width: width || state.blocks[index].width,
        height: height || state.blocks[index].height,
      };
      storeBlocks(state.blocks);
    },
  },
};
