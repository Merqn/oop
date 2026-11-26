import { findTool } from './tools.js';

const MAX_SHAPES = 114;

export class Editor {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.shapes = new Array(MAX_SHAPES).fill(null);
    this.count = 0;
    this.currentType = 'point';
    this.currentShape = null;
    this.onMessage = () => {};

    canvas.addEventListener('pointerdown', (event) => this.#startDrawing(event));
    canvas.addEventListener('pointermove', (event) => this.#continueDrawing(event));
    canvas.addEventListener('pointerup', (event) => this.#finishDrawing(event));
  }

  setType(type) {
    if (!findTool(type)) {
      throw new Error(`Невідомий тип об'єкта: ${type}`);
    }
    this.currentType = type;
  }

  clear() {
    this.shapes.fill(null);
    this.count = 0;
    this.currentShape = null;
    this.repaint();
    this.onMessage(`Об'єктів: 0 / ${MAX_SHAPES}`);
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

  #getPosition(event) {
    const bounds = this.canvas.getBoundingClientRect();
    return {
      x: (event.clientX - bounds.left) * this.canvas.width / bounds.width,
      y: (event.clientY - bounds.top) * this.canvas.height / bounds.height
    };
  }

  #startDrawing(event) {
    if (this.count >= MAX_SHAPES) {
      this.onMessage(`Масив заповнено (${MAX_SHAPES} об'єктів).`);
      return;
    }

    const ShapeType = findTool(this.currentType).shapeClass;
    this.currentShape = new ShapeType();
    this.currentShape.setStart(this.#getPosition(event));

    if (this.currentType === 'point') {
      this.shapes[this.count] = this.currentShape;
      this.count += 1;
      this.currentShape = null;
      this.repaint();
      this.onMessage(`Об'єктів: ${this.count} / ${MAX_SHAPES}`);
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
    this.canvas.releasePointerCapture(event.pointerId);
    this.repaint();
    this.onMessage(`Об'єктів: ${this.count} / ${MAX_SHAPES}`);
  }
}
