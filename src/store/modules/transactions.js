export default {
  namespaced: true,
  state: {
    status: 'stop',
    sum: 1,
    data: Array.from({ length: 10 }, () => ({
      from: 'foo',
      to: 'baz',
      sum: 123,
    })),
  },
  mutations: {
    add(state, payload) {
      state.data.unshift(payload);
    },
  },
  actions: {
  },
};
