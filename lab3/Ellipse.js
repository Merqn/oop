import { Shape } from './Shape.js';

const BLACK = '#182230';
const LIGHT_GREEN = '#b9e6c1';

export class Ellipse extends Shape {
  trace(context) {
    const radiusX = Math.abs(this.end.x - this.start.x);
    const radiusY = Math.abs(this.end.y - this.start.y);
    context.ellipse(this.start.x, this.start.y, radiusX, radiusY, 0, 0, Math.PI * 2);
  }

  show(context) {
    context.save();
    context.fillStyle = LIGHT_GREEN;
    context.strokeStyle = BLACK;
    context.lineWidth = 2;
    context.beginPath();
    this.trace(context);
    context.fill();
    context.stroke();
    context.restore();
  }
}
