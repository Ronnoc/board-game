import { ILoadable, SerializedPlayer } from "./Serialized";
import { generateRandomId } from "./utils";
import { Color } from "./enums/Color";
import { Game } from "./Game";
import { PlayerInput } from "./inputs/PlayerInput";
import { IFPlayerGameState } from "./interface/IFPlayerGameState";
import { IFPlayerInfo } from "./interface/IFPlayerInfo";
import { RolandBanks } from "./cards/core/investigators/RolandBanks";
import { debugDecks, DeckDealer } from "./DeckDealer";
import { SelectInput } from "./inputs/SelectInput";
import { OrInput } from "./inputs/OrInput";
import { ILocationCard } from "./cards/ILocationCard";
import { CardType } from "./enums/CardType";
import { ICard } from "./cards/ICard";
import { SelectCardInput } from "./inputs/SelectCardInput";
import { CardFactory } from "./cards/CardFactory";
import { LogMessageDataType } from "./enums/LogMessageDataType";
import { LogMessageData } from "./LogMessageData";
import { SkillIcon } from "./enums/SkillIcon";
import { SkillTestTiming } from "./enums/SkillTestTiming";
import { ChaosToken } from "./enums/ChaosToken";

export class Player implements ILoadable<SerializedPlayer, Player> {
  public id = "";

  public investigator = new RolandBanks();

  public deck = debugDecks;

  public cardsInHand: Array<ICard> = [];

  public cardsDiscarded: Array<ICard> = [];

  public assets: Array<ICard> = [];

  public threats: Array<ICard> = [];

  public atLocation: ILocationCard | undefined;

  public remainActionCount = 0;

  public currentGame = "";

  public isLead = false;

  public isAlive = true;

  private waitingFor?: PlayerInput;

  private waitingForCb?: () => void;

  private deckDealer: DeckDealer;

  constructor(public name: string, public color: Color) {
    this.id = generateRandomId();
    this.deckDealer = new DeckDealer(debugDecks);
    console.log(`CardFactory.size${String(CardFactory.size)}`);
  }

  // load
  public loadFromJSON(d: SerializedPlayer): Player {
    return Object.assign(this, d);
  }

  // set
  public setCurrentGame(gameId: string): void {
    this.currentGame = gameId;
  }

  public setAtLocation(location: ILocationCard): void{
    this.atLocation = location;
  }
  // get

  // phase

  public runPreparePhase(game: Game): void {
    this.investigator.preparePhase();

    this.cardsInHand = [];
    const skipFunc = (card:ICard):boolean => {
      if (card.mCardType !== CardType.ENCOUNTER) return false;
      return true;
    };
    for (let i = 0; i < 5; i += 1) {
      this.cardsInHand.push(
        this.deckDealer.drawCard(skipFunc),
      );
    }
    this.setWaitingFor(
      new SelectCardInput(
        "Select cards to redraw",
        this.cardsInHand,
        (selectCards: Array<ICard>) => {
          const newCards:Array<ICard> = [];
          this.cardsInHand.filter(
            (card) => selectCards.find(
              (selCard) => selCard.runtimeId === card.runtimeId,
            ) === undefined,
          ).forEach(
            (card) => {
              newCards.push(card);
            },
          );
          for (let i = 0; i < selectCards.length; i += 1) {
            newCards.push(this.deckDealer.drawCard(skipFunc));
          }
          this.cardsInHand = newCards;
          selectCards.forEach((card) => this.deckDealer.putInDeck(card));
          this.deckDealer.shuffleDeck();
          return undefined;
        },
        0, this.cardsInHand.length,
      ), () => {
        game.playerFinishedPreparePhase(this);
      },
    );
  }

  public refreshInvestigationAction(game: Game): void{
    this.remainActionCount = 3;
  }

  public doSkillTest(
    game:Game, type:SkillIcon,
    difficulty:number, timing:SkillTestTiming,
    committedCards?:ICard[],
    revealChaos?:ChaosToken,
  ) : void{
    if (timing === SkillTestTiming.START) {
      this.doSkillTest(game, type, difficulty,
        SkillTestTiming.TRIGGER_WINDOW1);
      return;
    }
    if (timing === SkillTestTiming.TRIGGER_WINDOW1) {
      this.doSkillTest(game, type, difficulty,
        SkillTestTiming.COMMIT_CARDS);
      return;
    }
    if (timing === SkillTestTiming.COMMIT_CARDS) {
      this.setWaitingFor(
        new SelectCardInput(
          "Select cards to commit",
          this.cardsInHand,
          (cards) => {
            this.doSkillTest(game, type, difficulty, SkillTestTiming.TRIGGER_WINDOW2, cards);
            return undefined;
          },
        ),
        () => undefined,
      );
      return;
    }
    if (timing === SkillTestTiming.TRIGGER_WINDOW2) {
      this.doSkillTest(game, type, difficulty,
        SkillTestTiming.REVEAL_CHAOS, committedCards);
      return;
    }
    if (timing === SkillTestTiming.REVEAL_CHAOS) {
      const token = game.dealChaosToken(this);
      this.doSkillTest(game, type, difficulty,
        SkillTestTiming.RESOLVE_CHAOS_EFFECTS, committedCards, token);
      return;
    }
    if (timing === SkillTestTiming.RESOLVE_CHAOS_EFFECTS) {
      let chaosValue : undefined|number;
      switch (revealChaos) {
        case ChaosToken.UNKNOWN:
          throw new Error("ChaosToken.UNKNOWN");
        case ChaosToken.ELDER_SIGN:
          chaosValue = this.investigator.mElderSign(game, this);
          break;
        case ChaosToken.AUTO_FAIL:
          chaosValue = -99999;
          break;
        case ChaosToken.SKULL:
          chaosValue = game.scenario?.mSkull(game, this);
          break;
        case ChaosToken.CULTIST:
          chaosValue = game.scenario?.mCultist(game, this);
          break;
        case ChaosToken.TOMBSTONE:
          chaosValue = game.scenario?.mTombstone(game, this);
          break;
        case ChaosToken.TENTACLES:
          chaosValue = game.scenario?.mTentacles(game, this);
          break;
        default:
          chaosValue = parseInt(revealChaos as string, 10);
      }
      if (committedCards === undefined) {
        throw new Error("committedCards === undefined");
      }
      committedCards.forEach((card) => {
        this.deckDealer.discard(card);
        if (chaosValue === undefined) {
          throw new Error("chaosValue === undefined");
        }
        chaosValue += 1;
      });
      // SKILL_TEST_END
      return;
    }
    throw new Error(`timing ${timing} unknown`);
  }

  public runInvestigationPhase(game: Game): void {
    const actions:Array<PlayerInput> = [];
    if (this.remainActionCount > 0) {
      // draw card action
      if (this.deckDealer.deck.length > 0) {
        actions.push(
          new SelectInput(
            "Draw a Card", () => {
              game.log(
                "${0} Draw a Card",
                new LogMessageData(LogMessageDataType.PLAYER, this.id),
              );
              this.cardsInHand.push(
                this.deckDealer.drawCard(),
              );
              this.remainActionCount -= 1;
              this.runInvestigationPhase(game);
              return undefined;
            },
          ),
        );
      }
      // gain resource action
      actions.push(
        new SelectInput(
          "Gain a Resource", () => {
            game.log(
              "${0} Gain a Resource",
              new LogMessageData(LogMessageDataType.PLAYER, this.id),
            );
            this.investigator.curResource += 1;
            this.remainActionCount -= 1;
            this.runInvestigationPhase(game);
            return undefined;
          },
        ),
      );
      // Activate an costed => ability
      // fight with engaged enemy
      // fight with enemy at same location
      // engage with enemy
      // investigate location
      actions.push(
        new SelectInput(
          `Investigate at ${this.atLocation?.mName}`,
          () => {
            this.remainActionCount -= 1;
            // this.doInvestigateAction(game);
            return undefined;
          },
        ),
      );
      // move to connect location
      // play card from hand
      // evade from engaged enemy
    }

    if (actions.length > 0) {
      actions.push(
        new SelectInput("FinishedInvestigationPhase", () => {
          game.playerFinishedInvestigationPhase(this);
          return undefined;
        }),
      );
      this.setWaitingFor(
        new OrInput(...actions),
        () => undefined,
      );
    } else {
      game.playerFinishedInvestigationPhase(this);
    }
  }

  // waiting for
  public process(game: Game, input: Array<Array<string>>): void {
    if (this.waitingFor === undefined || this.waitingForCb === undefined) {
      throw new Error("Not waiting for anything");
    }
    const { waitingFor } = this;
    const { waitingForCb } = this;
    this.waitingFor = undefined;
    this.waitingForCb = undefined;
    try {
      this.runInput(game, input, waitingFor);
      waitingForCb();
    } catch (err) {
      this.waitingFor = waitingFor;
      this.waitingForCb = waitingForCb;
      throw err;
    }
  }

  public getWaitingFor(): PlayerInput | undefined {
    return this.waitingFor;
  }

  public setWaitingFor(input: PlayerInput, cb: () => void): void {
    this.waitingFor = input;
    this.waitingForCb = cb;
  }

  private runInputCb(game: Game, result: PlayerInput | undefined): void {
    if (result !== undefined) {
      game.interrupts.push({
        player: this,
        playerInput: result,
      });
    }
  }

  private runInput(
    game: Game,
    input: Array<Array<string>>,
    pi: PlayerInput,
  ): void {
    if (pi instanceof SelectInput) {
      this.runInputCb(game, pi.cb());
    } else if (pi instanceof OrInput) {
      const waiting: OrInput = pi;
      const optionIndex = parseInt(input[0][0], 10);
      const remainingInput = input[0].slice();
      // Remove option index to process option
      remainingInput.shift();
      this.runInput(game, [remainingInput], waiting.options[optionIndex]);
    } else if (pi instanceof SelectCardInput) {
      if (input.length !== 1) {
        throw new Error("Incorrect options provided");
      }
      const mappedCards = pi.cards.filter(
        (card) => input[0].find(
          (cardId) => cardId === card.runtimeId,
        ) !== undefined,
      );
      if (input[0].length < pi.minCardsToSelect) {
        throw new Error("Not enough cards selected");
      }
      if (input[0].length > pi.maxCardsToSelect) {
        throw new Error("Too many cards selected");
      }
      if (mappedCards.length !== input[0].length) {
        throw new Error("Not all cards found");
      }
      this.runInputCb(game, pi.cb(mappedCards));
    } else {
      throw new Error("Unsupported waitingFor");
    }
  }

  // output
  public getInfo(): IFPlayerInfo {
    return {
      id: this.id,
      name: this.name,
    } as IFPlayerInfo;
  }

  public stateStringify(game: Game): string {
    return JSON.stringify({
      // player
      id: this.id,
      investigator: this.investigator,
      atLocation: this.atLocation,
      cardsInHand: this.cardsInHand,
      cardsDiscarded: this.cardsDiscarded,
      assets: this.assets,
      threats: this.threats,
      waitingFor: this.waitingFor,
      // game
      gameId: game.id,
      phase: game.phase,
      gameLog: game.gameLog,
      players: game.players,
      locations: game.locations,
      npcs: game.npcs,
      act: game.act,
      agenda: game.agenda,
      scenario: game.scenario,
      chaosBag: game.chaosBag,
      gameAge: game.getGameAge(),
    } as IFPlayerGameState);
  }
}
