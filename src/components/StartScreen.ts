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
            <div class="svg-container" :style="{height: 200, width: 200}">
            <svg id="svg"
            @mousemove="drag($event)"
            @mouseup="drop()">
                <line v-for="link in links"
                :x1="coords[link.source.index].x"
                :y1="coords[link.source.index].y"
                :x2="coords[link.target.index].x"
                :y2="coords[link.target.index].y"
                stroke="black" stroke-width="1"/>

                <circle v-for="node in nodes"
                  :cx="coords[node.index].x"
                  :cy="coords[node.index].y"
                  :r="10" :fill="colors[Math.ceil(Math.sqrt(node.index))]"
                  stroke="white" stroke-width="5"
                  @mousedown="setMove($event.screenX,  $event.screenY, node)"/>
            </svg>
        </div>
        </div>
    `,
})
export class StartScreen extends Vue {
  private mCounter = 0;

  padding= 10;

  width=300;

  height=150;

  savedNode =[];

  colors= ["#2196F3", "#E91E63", "#7E57C2", "#009688", "#00BCD4", "#EF6C00", "#4CAF50", "#FF9800", "#F44336", "#CDDC39", "#9C27B0"];

  setMove(x:any, y:any, node:any):void {
    this.currentMove = { x, y, node };
  }

  get nodes():any {
    this.savedNode = this.mSimulation.nodes();
    return this.savedNode;
  }

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
    console.log(minX, maxX, minY, maxY);
    return this.mSimulation.nodes().map((node:d3.SimulationNodeDatum) => ({
      x: this.padding + (node.x as number - minX)
      * ((this.width - 2 * this.padding) / (maxX - minX)),
      y: this.padding + (node.y as number - minY)
      * ((this.height - 2 * this.padding) / (maxY - minY)),
    }));
  }

  private mSimulation = null as any;

  private currentMove = null as any;

  // private graph = null as any;

  update():void {
    this.mCounter += 1;
  }

  static created():void {
    console.log("created");
  }

  mounted():void {
    console.log("wh", this.width, this.height);
    console.log("mounted");
    // this.graph = this.debugJson;
    const simulation = d3.forceSimulation(this.debugJson.nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(this.debugJson.links).distance(100).strength(0.1))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(600 / 2, 600 / 2));
    this.mSimulation = simulation;
  }

  updated():void {
    console.log(typeof (this.mSimulation));
  }

  debugJson = {
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

  drag(e:any):void {
    console.log("drag");
    if (this.currentMove) {
      const minX = Math.min(...this.mSimulation.nodes().map((n:any) => n.x));
      const maxX = Math.max(...this.mSimulation.nodes().map((n:any) => n.x));
      const minY = Math.min(...this.mSimulation.nodes().map((n:any) => n.y));
      const maxY = Math.max(...this.mSimulation.nodes().map((n:any) => n.y));
      this.currentMove.node.fx = this.currentMove.node.x
      - ((this.currentMove.x - e.screenX) * (maxX - minX))
      / (this.width - 2 * this.padding);
      this.currentMove.node.fy = this.currentMove.node.y
      - ((this.currentMove.y - e.screenY) * (maxY - minY))
      / (this.height - 2 * this.padding);
      this.currentMove.x = e.screenX;
      this.currentMove.y = e.screenY;
    }
  }

  drop():void {
    console.log("drop");
    delete this.currentMove.node.fx;
    delete this.currentMove.node.fy;
    this.currentMove = null;
    this.mSimulation.alpha(1);
    this.mSimulation.restart();
  }
}
/*

  coords(): any {
    console.log("coords");
    const { minX } = this.bounds();
    const { maxX } = this.bounds();
    const { minY } = this.bounds();
    const { maxY } = this.bounds();
    const rtn = this.nodes.map((node) => ({
      x: this.padding + ((node.x - minX) * (this.width - 2 * this.padding)) / (maxX - minX),
      y: this.padding + ((node.y - minY) * (this.height - 2 * this.padding)) / (maxY - minY),
    }));
    console.log("query coords", rtn);
    return rtn;
  }

  mounted(): void {
    console.log("mounted");
    this.simulation = d3.forceSimulation(this.nodes as d3.SimulationNodeDatum[])
      .force("charge", d3.forceManyBody().strength(() => -100))
      .force("link", d3.forceLink(this.links))
      .force("x", d3.forceX())
      .force("y", d3.forceY());
    console.log("mounted done");
  }

  drag(e:any):void {
    console.log("drag");
    if (this.currentMove) {
      const { minX } = this.bounds();
      const { maxX } = this.bounds();
      const { minY } = this.bounds();
      const { maxY } = this.bounds();
      this.currentMove.node.fx = this.currentMove.node.x
      - ((this.currentMove.x - e.screenX) * (maxX - minX))
      / (this.width - 2 * this.padding);
      this.currentMove.node.fy = this.currentMove.node.y
      - ((this.currentMove.y - e.screenY) * (maxY - minY))
      / (this.height - 2 * this.padding);
      this.currentMove.x = e.screenX;
      this.currentMove.y = e.screenY;
    }
  }

  drop():void {
    console.log("drop");
    delete this.currentMove.node.fx;
    delete this.currentMove.node.fy;
    this.currentMove = null;
    this.simulation.alpha(1);
    this.simulation.restart();
  }
*/
