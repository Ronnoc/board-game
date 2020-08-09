import { Vue, Component } from "vue-property-decorator";

@Component({
  template: `
        <div>
            <h1>Arkham Horror LCG Start Screen</h1>
            <div>
                <a href="/new_game">New game</a>
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
