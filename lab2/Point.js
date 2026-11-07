import { Shape } from './Shape.js';

const BLACK = '#182230';

export class Point extends Shape {
  trace(context) {
    context.arc(this.end.x, this.end.y, 4, 0, Math.PI * 2);
  }

  show(context) {
    context.save();
    context.fillStyle = BLACK;
    context.beginPath();
    this.trace(context);
    context.fill();
    context.restore();
  }



  drawPreview(_context) {
  }
}
