import { Shape } from './Shape.js';

const BLACK = '#182230';

export class Rectangle extends Shape {
  trace(context) {
    const width = Math.abs(this.end.x - this.start.x);
    const height = Math.abs(this.end.y - this.start.y);
    context.strokeStyle = BLACK;
    context.rect(this.start.x - width, this.start.y - height, width * 2, height * 2);
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
    context.rect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);
  }
}
