export default {
  methods: {
    registerModule(name, data) {
      if (!name || !data || this.$store.hasModule(name)) {
        return;
      }
      this.$store.registerModule(name, data);
    },
  },
};
