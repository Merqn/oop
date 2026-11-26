import { Shape } from './Shape.js';

const BLACK = '#182230';

export class Rectangle extends Shape {
  trace(context) {
    const left = Math.min(this.start.x, this.end.x);
    const top = Math.min(this.start.y, this.end.y);
    const width = Math.abs(this.end.x - this.start.x);
    const height = Math.abs(this.end.y - this.start.y);
    context.rect(left, top, width, height);
  }

  show(context) {
    context.save();
    context.strokeStyle = BLACK;
    context.lineWidth = 2;
    context.beginPath();
    this.trace(context);
    context.stroke();
    context.restore();
  }
}
