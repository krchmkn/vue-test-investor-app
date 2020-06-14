import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';

export default {
  init(url = 'wss://ws.blockchain.info/inv') {
    VueNativeSock.install(Vue, url, {
      format: 'json',
      reconnection: true,
    });
  },
};
