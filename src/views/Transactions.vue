<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Amount: {{ sum }} BTC</v-toolbar-title>
    </v-toolbar>

    <div class="table-box">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in data" :key="i">
              <td>
                <div
                  class="address"
                  v-for="(v, k) in item.from" :key="k"
                >
                  {{ v }}
                </div>
              </td>
              <td>
                <div
                  class="address"
                  v-for="(v, k) in item.to" :key="k"
                >
                  {{ v }}
                </div>
              </td>
              <td>{{ item.sum }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

    <v-bottom-navigation
      :value="status"
      @change="onStatusChange"
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
import storeModule from '@/store/modules/transactions';
import baseMixins from '@/mixins/';
import { createNamespacedHelpers } from 'vuex';
import socketPlugin from '@/plugins/transactionsSocket';

const { mapState, mapMutations } = createNamespacedHelpers('transactions');

export default {
  name: 'Transactions',
  mixins: [baseMixins],
  data() {
    return {
      subscribed: false,
    };
  },
  computed: {
    ...mapState({
      status: (state) => state.status,
      sum: (state) => state.sum,
      data: (state) => state.data,
    }),
  },
  created() {
    this.registerModule('transactions', storeModule);
    socketPlugin.init();
    this.$socket.onmessage = (message) => {
      this.onSocketMessage(message);
    };
  },
  methods: {
    ...mapMutations([
      'add',
      'reset',
    ]),
    subscribe() {
      this.$socket.sendObj({ op: 'unconfirmed_sub' });
      this.subscribed = true;
    },
    unsubscribe() {
      this.$socket.sendObj({ op: 'unconfirmed_unsub' });
      this.subscribed = false;
    },
    clear() {
      if (this.subscribed) {
        this.unsubscribe();
        this.reset();
        this.subscribe();
      } else {
        this.reset();
      }
    },
    onStatusChange(status) {
      if (status === 'start') {
        this.subscribe();
      } else if (status === 'stop') {
        this.unsubscribe();
      } else if (status === 'reset') {
        this.clear();
      }
    },
    onSocketMessage(message) {
      this.add(message.data);
    },
  },
};
</script>

<style scoped>
.address {
  padding: 5px;
  word-break: break-word;
}
.table-box {
  padding-bottom: 100px;
}
</style>
