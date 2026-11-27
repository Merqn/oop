import { Ellipse } from './Ellipse.js';
import { Line } from './Line.js';
import { Shape } from './Shape.js';

const RADIUS = 5;
const MARKER_COLOR = '#b9e6c1';

export class LineCircles extends Shape {
  constructor() {
    super();
    this.line = new Line();
    this.startCircle = new Ellipse();
    this.endCircle = new Ellipse();
    this.startCircle.fillColor = MARKER_COLOR;
    this.endCircle.fillColor = MARKER_COLOR;
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
    this.line.trace(context);
    this.startCircle.trace(context);
    this.endCircle.trace(context);
  }

  show(context) {
    this.line.show(context);
    this.startCircle.show(context);
    this.endCircle.show(context);
  }

  #syncParts() {
    this.line.setStart(this.start);
    this.line.setEnd(this.end);
    this.#setCircle(this.startCircle, this.start);
    this.#setCircle(this.endCircle, this.end);
  }

  #setCircle(circle, center) {
    circle.setStart(center);
    circle.setEnd({ x: center.x + RADIUS, y: center.y + RADIUS });
  }
}
