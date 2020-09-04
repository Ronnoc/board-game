import { IScenario } from "../../IScenario";
import { WhatsGoingOn } from "./WhatsGoingOn";
import { Trapped } from "./Trapped";
import { Study } from "./Study";
import { EncounterSet } from "../../../enums/EncounterSet";
import { Game } from "../../../Game";

export class TheGathering extends IScenario {
  mName = "The Gathering";

  mActs = [WhatsGoingOn];

  mAgendas = [Trapped];

  mEncounterSets = [
    EncounterSet.CORE_THE_GATHERING,
    EncounterSet.CORE_RATS,
    EncounterSet.CORE_GHOULS,
    EncounterSet.CORE_STRIKING_FEAR,
    EncounterSet.CORE_ANCIENT_EVILS,
    EncounterSet.CORE_CHILLING_COLD,
  ];

  protected initLocation(game: Game): void {
    const study = new Study();
    game.setLocations([study]);
    game.players.forEach(
      (player) => {
        game.playerMoveTo(player, study);
      },
    );
  }
}
