<template>
  <div>
    <v-card>
      <v-card-title>Sum: 0 BTC</v-card-title>
      <v-card-text>
        <v-simple-table
          fixed-header
          height="100vh"
        >
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
      </v-card-text>
    </v-card>

    <v-bottom-navigation
      v-model="active"
      fixed
      grow
    >
      <v-btn :value="1">
        <span>Start</span>
        <v-icon>mdi-play</v-icon>
      </v-btn>

      <v-btn :value="0">
        <span>Stop</span>
        <v-icon>mdi-pause</v-icon>
      </v-btn>

      <v-btn :value="-1">
        <span>Reset</span>
        <v-icon>mdi-autorenew</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  name: 'Transactions',
  data() {
    return {
      active: null,
    };
  },
  computed: {
    transactions() {
      return Array.from({ length: 100 }, () => ({
        from: 'foo',
        to: 'baz',
        sum: 123,
      }));
    },
  },
};
</script>
