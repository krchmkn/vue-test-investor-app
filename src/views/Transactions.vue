<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Sum: {{ sum }} BTC</v-toolbar-title>
    </v-toolbar>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in transactions" :key="i">
            <td>{{ item.from }}</td>
            <td>{{ item.to }}</td>
            <td>{{ item.sum }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-bottom-navigation
      v-model="localStatus"
      grow
      color="primary"
      shift
      fixed
    >
      <v-btn value="start">
        <span>Start</span>
        <v-icon>mdi-play</v-icon>
      </v-btn>

      <v-btn value="stop">
        <span>Stop</span>
        <v-icon>mdi-pause</v-icon>
      </v-btn>

      <v-btn value="reset">
        <span>Reset</span>
        <v-icon>mdi-autorenew</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('transactions');

export default {
  name: 'Transactions',
  data() {
    return {
      localStatus: undefined,
    };
  },
  computed: {
    ...mapState({
      status: (state) => state.status,
      sum: (state) => state.sum,
      transactions: (state) => state.data,
    }),
  },
  created() {
    this.localStatus = this.status;
  },
  methods: {
    start() {},
    stop() {},
    reset() {},
  },
};
</script>
