class Block {
  constructor(id, width = '300px', height = '100px', x = 0, y = 0) {
    this.id = id;
    this.title = `Block${id + 1}`;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}

export default {
  namespaced: true,
  state: {
    blocks: Array.from({ length: 5 }, (v, k) => new Block(k)),
  },
  mutations: {
  },
};
