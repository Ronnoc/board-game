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
    ecmaVersion: 2018,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    eqeqeq: ["error", "always"],
    quotes: ["error", "double"],
    "import/prefer-default-export": "off",
    "import/order": "off",
    "no-console": "off",
    "import/no-cycle": "off",
    "class-methods-use-this": "off",
    "no-alert": "off",
    "no-empty-function": "off",
    "no-template-curly-in-string": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
