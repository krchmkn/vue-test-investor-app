export default {
  namespaced: true,
  state: {
    status: 'stop',
    sum: 0,
    data: [],
  },
  mutations: {
    add(state, payload) {
      try {
        const { op, x } = JSON.parse(payload);
        if (op !== 'utx') {
          return;
        }

        let sum = 0;
        const to = x.inputs.map((el) => {
          if (!el.prev_out) {
            return '';
          }
          // Approximate calculation.
          sum += el.prev_out.value;
          return el.prev_out.addr;
        });
        const from = x.out.map((el) => {
          // Approximate calculation.
          sum -= el.value;
          return el.addr;
        });

        const exchangeRate = 10000;
        sum /= exchangeRate;
        state.sum = sum;

        const itemsLimit = 1000;
        if (state.data.length < itemsLimit) {
          state.data.unshift({ to, from, sum });
        } else {
          state.data.splice(state.data.length - 1, 1);
          state.data.unshift({ to, from, sum });
        }
      } catch (err) {
        // eslint-disable-next-line
        console.warn(err);
      }
    },
    reset(state) {
      state.data = [];
      state.sum = 0;
    },
  },
};
