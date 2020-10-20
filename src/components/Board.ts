
import Vue from 'vue';
import * as constants from '../constants';
import {BoardSpace} from './BoardSpace';
import {IAresData} from '../ares/IAresData';
import {SpaceModel} from '../models/SpaceModel';
import {SpaceType} from '../SpaceType';
import {PreferencesManager} from './PreferencesManager';
// @ts-ignore
import {$t} from '../directives/i18n';

class GlobalParamLevel {
  constructor(public value: number, public isActive: boolean, public strValue: string) {

  }
}

class AlertDialog {
    static shouldAlert = true;
}

export const Board = Vue.component('board', {
  props: {
    spaces: {
      type: Array as () => Array<SpaceModel>,
    },
    venusNextExtension: {
      type: Boolean,
    },
    venusScaleLevel: {
      type: Number,
    },
    boardName: {
      type: String,
    },
    oceans_count: {
      type: Number,
    },
    oxygen_level: {
      type: Number,
    },
    temperature: {
      type: Number,
    },
    shouldNotify: {
      type: Boolean,
    },
    aresExtension: {
      type: Boolean,
    },
    aresData: {
      type: Object as () => IAresData | undefined,
    },
  },
  components: {
    'board-space': BoardSpace,
  },
  data: function() {
    return {
      'constants': constants,
    };
  },
  mounted: function() {
    if (this.marsIsTerraformed() && this.shouldNotify && AlertDialog.shouldAlert && PreferencesManager.loadValue('show_alerts') === '1') {
      alert('Mars is Terraformed!');
      AlertDialog.shouldAlert = false;
    };
  },
  methods: {
    getAllSpacesOnMars: function(): Array<SpaceModel> {
      const boardSpaces: Array<SpaceModel> = this.spaces;
      boardSpaces.sort(
          (space1: SpaceModel, space2: SpaceModel) => {
            return parseInt(space1.id) - parseInt(space2.id);
          },
      );
      return boardSpaces.filter((s: SpaceModel) => {
        return s.spaceType !== SpaceType.COLONY;
      });
    },
    getSpaceById: function(spaceId: string) {
      for (const space of this.spaces) {
        if (space.id === spaceId) {
          return space;
        }
      }
      throw 'Board space not found by id \'' + spaceId + '\'';
    },
    getValuesForParameter: function(targetParameter: string): Array<GlobalParamLevel> {
      const values: Array<GlobalParamLevel> = [];
      let startValue: number;
      let endValue: number;
      let step: number;
      let curValue: number;
      let strValue: string;

      switch (targetParameter) {
        case 'oxygen':
          startValue = constants.MIN_OXYGEN_LEVEL;
          endValue = constants.MAX_OXYGEN_LEVEL;
          step = 1;
          curValue = this.oxygen_level;
          break;
        case 'temperature':
          startValue = constants.MIN_TEMPERATURE;
          endValue = constants.MAX_TEMPERATURE;
          step = 2;
          curValue = this.temperature;
          break;
        case 'venus':
          startValue = constants.MIN_VENUS_SCALE;
          endValue = constants.MAX_VENUS_SCALE;
          step = 2;
          curValue = this.venusScaleLevel;
          break;
        default:
          throw 'Wrong parameter to get values from';
      }

      for (let value: number = endValue; value >= startValue; value -= step) {
        strValue = (targetParameter === 'temperature' && value > 0) ? '+'+value : value.toString();
        values.push(
            new GlobalParamLevel(value, value === curValue, strValue),
        );
      }
      return values;
    },
    getScaleCSS: function(paramLevel: GlobalParamLevel): string {
      let css = 'global-numbers-value val-' + paramLevel.value + ' ';
      if (paramLevel.isActive) {
        css += 'val-is-active';
      }
      return css;
    },
    marsIsTerraformed: function() {
      const temperatureMaxed = this.temperature === constants.MAX_TEMPERATURE;
      const oceansMaxed = this.oceans_count === constants.MAX_OCEAN_TILES;
      const oxygenMaxed = this.oxygen_level === constants.MAX_OXYGEN_LEVEL;
      const venusMaxed = this.venusScaleLevel === constants.MAX_VENUS_SCALE;

      if (this.venusNextExtension) {
        return temperatureMaxed && oceansMaxed && oxygenMaxed && venusMaxed;
      } else {
        return temperatureMaxed && oceansMaxed && oxygenMaxed;
      }
    },
    oceansValue: function() {
      const oceans_count = this.oceans_count || 0;
      const leftover = constants.MAX_OCEAN_TILES - oceans_count;
      if (leftover === 0) {
        return '<img width="26" src="/assets/misc/circle-checkmark.png" class="board-ocean-checkmark" :alt="$t(\'Completed!\')">';
      } else {
        return `${oceans_count}/${constants.MAX_OCEAN_TILES}`;
      }
    },
    getGameBoardClassName: function():string {
      return this.venusNextExtension ? 'board-cont board-with-venus' : 'board-cont board-without-venus';
    },
  },
  template: `
    <div :class="getGameBoardClassName()">
        <div class="board-outer-spaces">
            <board-space :space="getSpaceById('01')" text="Ganymede Colony"></board-space>
            <board-space :space="getSpaceById('02')" text="Phobos Space Haven"></board-space>
            <board-space :space="getSpaceById('69')" text="Stanford Torus"></board-space>
            <board-space :space="getSpaceById('70')" text="Luna Metropolis" v-if="venusNextExtension"></board-space>
            <board-space :space="getSpaceById('71')" text="Dawn City" v-if="venusNextExtension"></board-space>
            <board-space :space="getSpaceById('72')" text="Stratopolis" v-if="venusNextExtension"></board-space>
            <board-space :space="getSpaceById('73')" text="Maxwell Base" v-if="venusNextExtension"></board-space>
        </div>

        <div class="global-numbers">
            <div class="global-numbers-temperature">
                <div :class="getScaleCSS(lvl)" v-for="lvl in getValuesForParameter('temperature')">{{ lvl.strValue }}</div>
            </div>

            <div class="global-numbers-oxygen">
                <div :class="getScaleCSS(lvl)" v-for="lvl in getValuesForParameter('oxygen')">{{ lvl.strValue }}</div>
            </div>

            <div class="global-numbers-venus" v-if="venusNextExtension">
                <div :class="getScaleCSS(lvl)" v-for="lvl in getValuesForParameter('venus')">{{ lvl.strValue }}</div>
            </div>

            <div class="global-numbers-oceans" v-html="oceansValue()">
            </div>

            <div v-if="aresExtension && aresData !== undefined">
                <div v-if="aresData.hazardData.erosionOceanCount.available">
                    <div class="global-ares-erosions-icon"></div>
                    <div class="global-ares-erosions-val">{{aresData.hazardData.erosionOceanCount.threshold}}</div>
                </div>
                <div v-if="aresData.hazardData.removeDustStormsOceanCount.available">
                    <div class="global-ares-remove-dust-storms-icon"></div>
                    <div class="global-ares-remove-dust-storms-val">{{aresData.hazardData.removeDustStormsOceanCount.threshold}}</div>
                </div>
                <div v-if="aresData.hazardData.severeErosionTemperature.available">
                    <div class="global-ares-severe-erosions"
                    :class="'global-ares-severe-erosions-'+aresData.hazardData.severeErosionTemperature.threshold"></div>
                </div>
                <div v-if="aresData.hazardData.severeDustStormOxygen.available">
                    <div class="global-ares-severe-dust-storms"
                    :class="'global-ares-severe-dust-storms-'+aresData.hazardData.severeDustStormOxygen.threshold"></div>
                </div>
            </div>
        </div>

        <div class="board" id="main_board">
            <board-space :space="curSpace" :is_selectable="true" :key="'board-space-'+curSpace.id" :aresExtension="aresExtension" v-for="curSpace in getAllSpacesOnMars()"></board-space>
            <svg id="board_legend" height="550" width="630" class="board-legend">
                <g v-if="boardName === 'tharsis'" id="noctis_city" transform="translate(85, 320)">
                    <text class="board-caption">
                        <tspan dy="15">Noctis</tspan>
                        <tspan x="7" dy="12">City</tspan>
                    </text>
                    <line x1="30" y1="20" x2="140" y2="-20" class="board-line"></line>
                    <text x="136" y="-18" class="board-caption board_caption--black">&#x25cf;</text>
                </g>
            </svg>
        </div>
    </div>
    `,
});
