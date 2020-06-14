import Vue from 'vue';
import Vuex from 'vuex';
import desktop from '@/store/modules/desktop';
import transactions from '@/store/modules/transactions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    desktop,
    transactions,
  },
});
