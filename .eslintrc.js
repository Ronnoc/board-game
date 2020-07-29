module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:vue/essential",
    "@vue/airbnb",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: [
    "vue",
    "@typescript-eslint",
  ],
  rules: {
    eqeqeq: ["error", "always"],
    quotes: ["error", "double"],
    "import/prefer-default-export": "off",
    "import/order": "off",
    "no-console": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
