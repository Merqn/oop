import { Editor } from './Editor.js';
import { getShapeLabel } from './shapeLabels.js';

const canvas = document.querySelector('#editor-canvas');
const editor = new Editor(canvas);
const menus = document.querySelectorAll('.menu');
const objectButtons = document.querySelectorAll('.shape-choice');

function closeMenus() {
  menus.forEach((menu) => {
    menu.removeAttribute('open');
  });
}

function selectShape(type) {
  editor.setType(type);
  document.title = getShapeLabel(type);
  closeMenus();
}

objectButtons.forEach((button) => {
  button.addEventListener('click', () => selectShape(button.dataset.shape));
});

document.querySelector('#clear-canvas').addEventListener('click', () => {
  editor.clear();
  closeMenus();
});

const helpDialog = document.querySelector('#help-dialog');
document.querySelector('#show-help').addEventListener('click', () => helpDialog.showModal());
document.querySelector('#close-help').addEventListener('click', () => helpDialog.close());
