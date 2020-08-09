import { Vue, Component } from "vue-property-decorator";
import * as d3 from "d3";

const debugJson = {
  nodes: [
    { id: 0, name: "Me", type: 0 },
    { id: 1, name: "She", type: 0 },
    { id: 2, name: "He", type: 0 },
    { id: 3, name: "LocA", type: 2 },
    { id: 4, name: "LocB", type: 2 },
    { id: 5, name: "LocC", type: 2 },
    { id: 6, name: "Mos1", type: 1 },
  ],
  links: [
    { source: 0, target: 4 },
    { source: 1, target: 3 },
    { source: 2, target: 4 },
    { source: 3, target: 4 },
    { source: 4, target: 5 },
    { source: 5, target: 3 },
    { source: 6, target: 2 },
    { source: 6, target: 4 },
  ],
};

@Component({
  template: `
    <div>
      <svg id="svg" height="510" width="510">
        <line
          v-for="link in links"
          :x1="coords[link.source.index].x"
          :y1="coords[link.source.index].y"
          :x2="coords[link.target.index].x"
          :y2="coords[link.target.index].y"
          stroke="black"
          stroke-width="1"
        />

        <circle
          v-for="node in nodes"
          :cx="coords[node.index].x"
          :cy="coords[node.index].y"
          :r="10"
          :fill="colors[node.type]"
          stroke="white"
          stroke-width="5"
        />

        <text
          v-for="node in nodes"
          :x="coords[node.index].x-5"
          :y="coords[node.index].y-5"
        >
          {{ node.name }}
        </text>
      </svg>
    </div>
  `,
})
export class Board extends Vue {
  padding = 30;

  width = 500;

  height = 500;

  mSavedNode: d3.SimulationNodeDatum[] = [];

  mLinks: Array<any> = [];

  colors = [
    "#2196F3",
    "#E91E63",
    "#7E57C2",
    "#009688",
    "#00BCD4",
    "#EF6C00",
    "#4CAF50",
    "#FF9800",
    "#F44336",
    "#CDDC39",
    "#9C27B0",
  ];

  get nodes(): d3.SimulationNodeDatum[] {
    return this.mSavedNode;
  }

  get links(): any {
    return this.mLinks;
  }

  static mlog(info: string): void {
    console.log(info);
  }

  get coords(): any {
    const minX = Math.min(
      ...this.mSavedNode.map((n: d3.SimulationNodeDatum) => n.x as number),
    );
    const maxX = Math.max(
      ...this.mSavedNode.map((n: d3.SimulationNodeDatum) => n.x as number),
    );
    const minY = Math.min(
      ...this.mSavedNode.map((n: d3.SimulationNodeDatum) => n.y as number),
    );
    const maxY = Math.max(
      ...this.mSavedNode.map((n: d3.SimulationNodeDatum) => n.y as number),
    );
    return this.mSavedNode.map((node: d3.SimulationNodeDatum) => ({
      x:
        this.padding
        + ((node.x as number) - minX)
          * ((this.width - 2 * this.padding) / (maxX - minX)),
      y:
        this.padding
        + ((node.y as number) - minY)
          * ((this.height - 2 * this.padding) / (maxY - minY)),
    }));
  }

  mounted(): void {
    // console.log("board mounted");
    this.mLinks = debugJson.links;
    const simulation = d3
      .forceSimulation(debugJson.nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink().links(this.mLinks).distance(20))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));
    simulation.stop();
    for (let index = 0; index < 40; index += 1) {
      simulation.tick();
    }
    this.mSavedNode = simulation.nodes();
  }
  /*
  drag(e: any): void {
    console.log("drag");
    if (this.currentMove) {
      const minX = Math.min(...this.mSimulation.nodes().map((n: any) => n.x));
      const maxX = Math.max(...this.mSimulation.nodes().map((n: any) => n.x));
      const minY = Math.min(...this.mSimulation.nodes().map((n: any) => n.y));
      const maxY = Math.max(...this.mSimulation.nodes().map((n: any) => n.y));
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

  mdown(e: any, xnode: any): void {
    this.currentMove = {
      x: e.screenX,
      y: e.screenY,
      node: xnode,
    };
  }

  drop(): void {
    console.log("drop");
    delete this.currentMove.node.fx;
    delete this.currentMove.node.fy;
    this.currentMove = null;
    this.mSimulation.alpha(1);
    this.mSimulation.restart();
  }
  */
}
