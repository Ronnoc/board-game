import { Vue, Component } from "vue-property-decorator";
import * as d3 from "d3";

const debugJson = {
  nodes: [
    { id: 0 },
    { id: 1 },
    { id: 2 },
  ],
  links: [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
  ],
};

@Component({
  template: `
        <div>
            <h1>Arkham Horror LCG</h1>
            <div>
                <a href="/new-game">New game</a>
                <button v-on:click="update">You clicked me {{ count }} times.</button>
            </div>
            <div class="svg-container">
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
                  :r="10" :fill="colors[node.index]"
                  stroke="white" stroke-width="5"
                  @mousedown="mdown($event,node)"/>
            </svg>
        </div>
        </div>
    `,
})
export class StartScreen extends Vue {
  private mCounter = 0;

  get count():number {
    return this.mCounter;
  }

  padding= 10;

  width=300;

  height=150;

  mSavedNode:Array<any> =[];

  mLinks:Array<any> = [];

  private mSimulation = null as any;

  private currentMove = null as any;

  colors= ["#2196F3", "#E91E63", "#7E57C2", "#009688", "#00BCD4", "#EF6C00", "#4CAF50", "#FF9800", "#F44336", "#CDDC39", "#9C27B0"];

  get nodes():any {
    return this.mSavedNode;
  }

  get links():any {
    return this.mLinks;
  }

  static mlog(info:string):void {
    console.log(info);
  }

  get coords():any {
    console.log("coords");
    const minX = Math.min(...this.mSavedNode.map((n:any) => n.x));
    const maxX = Math.max(...this.mSavedNode.map((n:any) => n.x));
    const minY = Math.min(...this.mSavedNode.map((n:any) => n.y));
    const maxY = Math.max(...this.mSavedNode.map((n:any) => n.y));
    return this.mSavedNode.map((node:d3.SimulationNodeDatum) => ({
      x: this.padding + (node.x as number - minX)
      * ((this.width - 2 * this.padding) / (maxX - minX)),
      y: this.padding + (node.y as number - minY)
      * ((this.height - 2 * this.padding) / (maxY - minY)),
    }));
  }

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
    let simulation = d3.forceSimulation(debugJson.nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(debugJson.links).distance(20).strength(0.1))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(600 / 2, 600 / 2));
    this.mSavedNode = simulation.nodes();
    this.mLinks = debugJson.links;
    simulation = d3.forceSimulation(this.mSavedNode as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(this.mLinks).distance(20).strength(0.1))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));
    this.mSimulation = simulation;
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

  mdown(e:any, xnode:any):void{
    this.currentMove = {
      x: e.screenX,
      y: e.screenY,
      node: xnode,
    };
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
