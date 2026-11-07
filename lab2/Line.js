import { Shape } from './Shape.js';

const BLACK = '#182230';

export class Line extends Shape {
  trace(context) {
    context.moveTo(this.start.x, this.start.y);
    context.lineTo(this.end.x, this.end.y);
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



  drawPreview(context) {
    context.moveTo(this.start.x, this.start.y);
    context.lineTo(this.end.x, this.end.y);
  }
}
