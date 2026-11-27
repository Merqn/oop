import { Line } from './Line.js';
import { Rectangle } from './Rectangle.js';
import { Shape } from './Shape.js';

const OFFSET = 20;
const CUBE_COLOR = '#1769d2';

export class Cube extends Shape {
  constructor() {
    super();
    this.front = new Rectangle();
    this.back = new Rectangle();
    this.edges = Array.from({ length: 4 }, () => new Line());
  }

  setStart(point) {
    super.setStart(point);
    this.#syncParts();
  }

  setEnd(point) {
    super.setEnd(point);
    this.#syncParts();
  }

  trace(context) {
    this.front.trace(context);
    this.back.trace(context);
    this.edges.forEach((edge) => edge.trace(context));
  }

  show(context) {
    context.save();
    context.strokeStyle = CUBE_COLOR;
    context.lineWidth = 2;
    context.beginPath();
    this.trace(context);
    context.stroke();
    context.restore();
  }

  #syncParts() {
    const left = Math.min(this.start.x, this.end.x);
    const top = Math.min(this.start.y, this.end.y);
    const right = Math.max(this.start.x, this.end.x);
    const bottom = Math.max(this.start.y, this.end.y);
    const offset = Math.min(
      OFFSET,
      Math.max(4, (right - left) / 3),
      Math.max(4, (bottom - top) / 3)
    );
    const backLeft = left + offset;
    const backTop = top + offset;
    const backRight = right + offset;
    const backBottom = bottom + offset;

    this.front.setStart({ x: left, y: top });
    this.front.setEnd({ x: right, y: bottom });
    this.back.setStart({ x: backLeft, y: backTop });
    this.back.setEnd({ x: backRight, y: backBottom });

    const endpoints = [
      [left, top, backLeft, backTop],
      [right, top, backRight, backTop],
      [left, bottom, backLeft, backBottom],
      [right, bottom, backRight, backBottom]
    ];
    this.edges.forEach((edge, index) => {
      const [x1, y1, x2, y2] = endpoints[index];
      edge.setStart({ x: x1, y: y1 });
      edge.setEnd({ x: x2, y: y2 });
    });
  }
}
