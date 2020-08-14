import Vue from "vue";

import { LogMessage } from "../LogMessage";
import { LogMessageData } from "../LogMessageData";

export const LogPanel = Vue.component("log-panel", {
  props: ["messages", "players"],
  components: {
  },
  methods: {
    scrollToEnd() {
      const container = this.$el.querySelector("#logpanel-scrollable");
      if (container !== null) {
        container.scrollTop = container.scrollHeight;
      }
    },
    parseData(data: LogMessageData) {
      if (data.type !== undefined && data.value !== undefined) {
        return data.value;
      }
      return "";
    },
    parseMessage(message: LogMessage) {
      const logEntryBullet = `<span title="${new Date(message.timestamp).toLocaleString()}">&#x1f551;</span>`;
      if (message.message !== undefined) {
        return logEntryBullet + message.message.replace(/\$\{([0-9]{1})\}/gi, (_match, idx) => this.parseData(message.data[idx]));
      }
      return "";
    },
  },
  watch: {
    messages(): void {
      this.scrollToEnd();
    },
  },
  template: `
    <div>
      <div id="logpanel-scrollable" class="log-panel">
          <ul v-if="messages">
              <li v-for="message in messages" v-html="parseMessage(message)"></li>
          </ul>
      </div>
    </div>
    `,
});
