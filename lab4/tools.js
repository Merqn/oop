import { Cube } from './Cube.js';
import { Ellipse } from './Ellipse.js';
import { Line } from './Line.js';
import { LineCircles } from './LineCircles.js';
import { Point } from './Point.js';
import { Rectangle } from './Rectangle.js';

export const TOOLS = [
  {
    id: 'point',
    name: 'Крапка',
    shapeClass: Point,
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5" fill="currentColor"/></svg>'
  },
  {
    id: 'line',
    name: 'Лінія',
    shapeClass: Line,
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
  },
  {
    id: 'rectangle',
    name: 'Прямокутник',
    shapeClass: Rectangle,
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" fill="none" stroke="currentColor" stroke-width="2"/></svg>'
  },
  {
    id: 'ellipse',
    name: 'Еліпс',
    shapeClass: Ellipse,
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="12" rx="9" ry="6" fill="#b9e6c1" stroke="currentColor" stroke-width="2"/></svg>'
  },
  {
    id: 'line-circles',
    name: 'Лінія з кружечками',
    shapeClass: LineCircles,
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2"/><circle cx="4" cy="12" r="3" fill="#b9e6c1" stroke="currentColor"/><circle cx="20" cy="12" r="3" fill="#b9e6c1" stroke="currentColor"/></svg>'
  },
  {
    id: 'cube',
    name: 'Каркас куба',
    shapeClass: Cube,
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8l7-4 7 4v8l-7 4-7-4zM5 8l7 4 7-4M12 12v8" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'
  }
];

export function findTool(id) {
  return TOOLS.find((tool) => tool.id === id);
}
