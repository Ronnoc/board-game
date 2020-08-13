import { Vue, Component } from "vue-property-decorator";
import { IFCreateGameForm } from "../interface/IFCreateGameForm";
import { DifficultyLevel } from "../enums/DifficultyLevel";
import { IFCreatePlayer } from "../interface/IFCreatePlayer";
import { IFGameInfo } from "../interface/IFGameInfo";
import { Color } from "../enums/Color";

@Component({
  template: `
    <div>
      <h1>Arkham Horror LCG Create Game Form</h1>
      <div class="columns">
        <h4>Difficulty Level: {{ difficultyLevel }}</h4>
        <div v-for="pLevel of difficultyLevelList">
          <input
            type="radio"
            :id="pLevel"
            :value="pLevel"
            v-model="difficultyLevel"
          />
          <label :for="pLevel">{{ pLevel }} </label> <br />
        </div>
      </div>
      <div>
        <button v-on:click="createGame">Create Game</button>
      </div>
    </div>
  `,
})
export class CreateGameForm extends Vue implements IFCreateGameForm {
  difficultyLevel: DifficultyLevel = DifficultyLevel.STANDARD;

  players: Array<IFCreatePlayer> = [
    {
      name: "kyb",
      color: Color.BLUE,
      first: true,
    } as IFCreatePlayer,
  ];

  difficultyLevelList: Array<DifficultyLevel> = Object.values(DifficultyLevel);

  public getIFCreateGameForm(): IFCreateGameForm {
    return {
      difficultyLevel: this.difficultyLevel,
      players: this.players,
    } as IFCreateGameForm;
  }

  public createGame(): void {
    const dataToSend = JSON.stringify(this.getIFCreateGameForm());
    console.log(dataToSend);
    const onSucces = (response: Response) => {
      response.text().then((responseJson: string) => {
        const responseStruct = JSON.parse(responseJson) as IFGameInfo;
        window.location.href = `/game?id=${responseStruct.id}`;
      });
    };

    fetch("/create_game", {
      method: "PUT",
      body: dataToSend,
      headers: { "Content-Type": "application/json" },
    })
      .then(onSucces)
      .catch(() => alert("Unexpected server response"));
  }
}
