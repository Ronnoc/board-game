module.exports = {
  mode: "development",
  entry: [
    "./dist/components/App.js",
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js", // 'vue/dist/vue.common.js' for webpack 1
    },
  },
};
