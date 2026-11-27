import { Point } from './Point.js';

export const MAX_SHAPES = 113;

export class MyEditor {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.shapes = new Array(MAX_SHAPES).fill(null);
    this.count = 0;
    this.currentShape = null;
    this.ShapeType = null;
    this.onMessage = () => {};

    this.onPointerDown = (event) => this.#startDrawing(event);
    this.onPointerMove = (event) => this.#continueDrawing(event);
    this.onPointerUp = (event) => this.#finishDrawing(event);
    canvas.addEventListener('pointerdown', this.onPointerDown);
    canvas.addEventListener('pointermove', this.onPointerMove);
    canvas.addEventListener('pointerup', this.onPointerUp);
  }

  setType(ShapeType) {
    this.ShapeType = ShapeType;
  }

  clear() {
    this.shapes.fill(null);
    this.count = 0;
    this.currentShape = null;
    this.repaint();
    this.onMessage(`Об’єктів: 0 / ${MAX_SHAPES}`);
  }

  repaint() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let index = 0; index < this.count; index += 1) {
      this.shapes[index].show(this.context);
    }
    if (this.currentShape) {
      this.currentShape.showRubber(this.context);
    }
  }

  destroy() {
    this.canvas.removeEventListener('pointerdown', this.onPointerDown);
    this.canvas.removeEventListener('pointermove', this.onPointerMove);
    this.canvas.removeEventListener('pointerup', this.onPointerUp);
  }

  #getPosition(event) {
    const bounds = this.canvas.getBoundingClientRect();
    return {
      x: (event.clientX - bounds.left) * this.canvas.width / bounds.width,
      y: (event.clientY - bounds.top) * this.canvas.height / bounds.height
    };
  }

  #startDrawing(event) {
    if (!this.ShapeType) {
      this.onMessage('Спочатку оберіть тип об’єкта.');
      return;
    }
    if (this.count >= MAX_SHAPES) {
      this.onMessage(`Масив заповнено (${MAX_SHAPES} об’єктів).`);
      return;
    }

    this.currentShape = new this.ShapeType();
    this.currentShape.setStart(this.#getPosition(event));

    if (this.ShapeType === Point) {
      this.shapes[this.count] = this.currentShape;
      this.count += 1;
      this.currentShape = null;
      this.repaint();
      this.onMessage(`Об’єктів: ${this.count} / ${MAX_SHAPES}`);
      return;
    }

    this.canvas.setPointerCapture(event.pointerId);
    this.repaint();
  }

  #continueDrawing(event) {
    if (!this.currentShape) return;
    this.currentShape.setEnd(this.#getPosition(event));
    this.repaint();
  }

  #finishDrawing(event) {
    if (!this.currentShape) return;
    this.currentShape.setEnd(this.#getPosition(event));
    this.shapes[this.count] = this.currentShape;
    this.count += 1;
    this.currentShape = null;
    if (this.canvas.hasPointerCapture(event.pointerId)) {
      this.canvas.releasePointerCapture(event.pointerId);
    }
    this.repaint();
    this.onMessage(`Об’єктів: ${this.count} / ${MAX_SHAPES}`);
  }
}
