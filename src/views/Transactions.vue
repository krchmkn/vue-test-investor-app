<template>
  <div>
    <v-btn text small @click.stop="subscribe()">
      <v-icon left>mdi-play</v-icon> Start
    </v-btn>

    <v-btn text small @click.stop="unsubscribe()">
      <v-icon left>mdi-pause</v-icon> Stop
    </v-btn>

    <v-btn text small @click.stop="clear()">
      <v-icon left>mdi-autorenew</v-icon> Reset
    </v-btn>

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
