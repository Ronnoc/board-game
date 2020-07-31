import { Vue, Component } from "vue-property-decorator";
import * as d3 from "d3";

@Component({
  template: `
        <div>
            <h1>Arkham Horror LCG</h1>
            <div>
                <a href="/new-game">New game</a>
                <button v-on:click="update">You clicked me {{ count }} times.</button>
            </div>
            <div class="svg-container" :style="{width: 100 +'%'}">
            <svg id="svg" pointer-events="all" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">
                <line v-for="link in links"
                :x1="coords[link.source.index].x"
                :y1="coords[link.source.index].y"
                :x2="coords[link.target.index].x"
                :y2="coords[link.target.index].y"
                stroke="black" stroke-width="1"/>

                <circle v-for="(node, i) in nodes"
                  :cx="coords[i].x"
                  :cy="coords[i].y"
                  :r="20" :fill="colors[Math.ceil(Math.sqrt(node.index))]"
                  stroke="white" stroke-width="1"
                  @mousedown="currentMove = {x: $event.screenX, y: $event.screenY, node: node}"/>
            </svg>
        </div>
        </div>
    `,
})
export class StartScreen extends Vue {
  private mCounter = 0;

  padding= 20;

  width=100;

  height=100;

  get count():number {
    return this.mCounter;
  }

  get links():any {
    return this.debugJson.links;
  }

  get coords():any {
    if (this.mSimulation === null) return undefined;
    const minX = Math.min(...this.mSimulation.nodes().map((n:any) => n.x));
    const maxX = Math.max(...this.mSimulation.nodes().map((n:any) => n.x));
    const minY = Math.min(...this.mSimulation.nodes().map((n:any) => n.y));
    const maxY = Math.max(...this.mSimulation.nodes().map((n:any) => n.y));
    return this.mSimulation.nodes().map((node:d3.SimulationNodeDatum) => ({
      x: this.padding + (node.x as number - minX)
      * ((this.width - 2 * this.padding) / (maxX - minX)),
      y: this.padding + (node.y as number - minY)
      * ((this.height - 2 * this.padding) / (maxY - minY)),
    }));
  }

  private mSimulation = null as any;

  // private graph = null as any;

  update():void {
    this.mCounter += 1;
  }

  static created():void {
    console.log("created");
  }

  mounted():void {
    console.log("mounted");
    // this.graph = this.debugJson;
    const simulation = d3.forceSimulation(this.debugJson.nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(this.debugJson.links).distance(100).strength(0.1))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(600 / 2, 600 / 2));
    this.mSimulation = simulation;
    for (let i = 0; i < 10; i += 1) {
      simulation.tick();
      simulation.nodes().forEach((element) => {
        console.log(element.index, " ", element.x, " ", element.y);
      });
    }
  }

  updated():void {
    console.log(typeof (this.mSimulation));
  }

  public debugJson = {
    nodes: [
      { id: 0 },
      { id: 1 },
      { id: 2 },
    ],
    links: [
      { source: 0, target: 1 },
      { source: 1, target: 2 },
    ],
  }
}
