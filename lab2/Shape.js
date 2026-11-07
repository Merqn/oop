const coordinates = new WeakMap();

export class Shape {
  constructor() {
    if (this.constructor === Shape) {
      throw new Error('Не можна створити об’єкт абстрактного класу Shape.');
    }

    coordinates.set(this, {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 }
    });
  }

  setStart(point) {
    const data = coordinates.get(this);
    data.start = { ...point };
    data.end = { ...point };
  }

  setEnd(point) {
    coordinates.get(this).end = { ...point };
  }

  get start() {
    return coordinates.get(this).start;
  }

  get end() {
    return coordinates.get(this).end;
  }

  trace(_context) {
    throw new Error('Похідний клас повинен реалізувати метод trace.');
  }

  show(context) {
    context.save();
    context.beginPath();
    this.trace(context);
    context.stroke();
    context.restore();
  }

  showRubber(context) {
    context.save();
    context.strokeStyle = '#d13b3b';
    context.lineWidth = 2;
    context.setLineDash([]);
    context.beginPath();
    this.trace(context);
    context.stroke();
    context.restore();
  }
}
