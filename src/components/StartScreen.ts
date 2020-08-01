import { Vue, Component } from "vue-property-decorator";

@Component({
  template: `
        <div>
            <h1>Arkham Horror LCG</h1>
            <div>
                <a href="/new-game">New game</a>
                <button v-on:click="update">You clicked me {{ count }} times.</button>
            </div>
        </div>
    `,
})
export class StartScreen extends Vue {
  private mCounter = 0;

  get count():number {
    return this.mCounter;
  }
}
