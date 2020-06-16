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

export default {
  namespaced: true,
  state: {
    removedBlock: null,
    removedBlockIndex: null,
    blocks: Array.from({ length: 5 }, (v, k) => {
      const title = `Block${k + 1}`;
      const width = 300;
      const height = 100;
      const x = 0;
      const y = k > 0 ? (height * k) : 0;
      const z = 0;
      return new Block(k, title, width, height, x, y, z);
    }),
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
    },
    restoreBlock(state) {
      if (!state.removedBlock || state.removedBlockIndex == null) {
        return;
      }
      state.blocks.splice(state.removedBlockIndex, 0, state.removedBlock);
      state.removedBlock = null;
      state.removedBlockIndex = null;
    },
  },
};
