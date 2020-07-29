import Vue from "vue";

export const v = new Vue({
  el: "#app",
  template: `
    <div>
        <div>Hello {{name}}!</div>
        Name: <input v-model="name" type="text">
    </div>`,
  data: {
    name: "World",
  },
});
