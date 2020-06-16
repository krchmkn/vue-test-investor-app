export default {
  getItem(key) {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch (err) {
      // eslint-disable-next-line
      console.warn(err);
      return null;
    }
  },
  setItem(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
};
