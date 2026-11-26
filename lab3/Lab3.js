import { Editor } from './Editor.js';
import { MainMenu } from './MainMenu.js';
import { Toolbar } from './Toolbar.js';
import { findTool, TOOLS } from './tools.js';

const CMD_CLEAR = 'clear';
const CMD_ABOUT = 'about';

export class MainWindow {
  constructor({ menubar, toolbar, canvas, status, helpDialog }) {
    this.statusElement = status;
    this.helpDialog = helpDialog;
    this.editor = new Editor(canvas);
    this.editor.onMessage = (message) => this.setStatus(message);
    this.menu = new MainMenu(menubar, this);
    this.toolbar = new Toolbar(toolbar, this);
    this.objectsMenu = null;
  }

  onCreate() {
    this.menu.addMenu('Файл', [{ id: CMD_CLEAR, text: 'Очистити' }]);
    this.objectsMenu = this.menu.addMenu(
      'Об’єкти',
      TOOLS.map((tool) => ({ id: tool.id, text: tool.name, shape: true })),
      'menu-objects'
    );
    this.menu.addMenu('Довідка', [{ id: CMD_ABOUT, text: 'Про програму' }]);
    TOOLS.forEach((tool) => this.toolbar.addButton(tool.id, tool.icon));
    this.toolbar.setPressed(this.editor.currentType);
    this.onInitMenuPopup(this.objectsMenu);
    this.setStatus(`Об'єктів: 0 / ${this.editor.shapes.length}`);
  }

  onCommand(id) {
    if (id === CMD_CLEAR) {
      this.editor.clear();
      return;
    }
    if (id === CMD_ABOUT) {
      this.helpDialog.showModal();
      return;
    }

    const tool = findTool(id);
    if (!tool) return;

    this.editor.setType(tool.id);
    this.toolbar.setPressed(tool.id);
    this.onInitMenuPopup(this.objectsMenu);
  }

  onNotify(notification) {
    if (notification.code !== 'TTN_NEEDTEXT') return null;
    if (notification.id === CMD_CLEAR) return 'Очистити';
    if (notification.id === CMD_ABOUT) return 'Про програму';
    return findTool(notification.id)?.name ?? null;
  }

  onInitMenuPopup(menu) {
    if (menu !== this.objectsMenu) return;
    menu.querySelectorAll('[data-shape]').forEach((item) => {
      item.setAttribute('aria-checked', String(item.dataset.shape === this.editor.currentType));
    });
  }

  setStatus(message) {
    this.statusElement.textContent = message;
  }
}

const mainWindow = new MainWindow({
  menubar: document.querySelector('#menubar'),
  toolbar: document.querySelector('#toolbar'),
  canvas: document.querySelector('#editor-canvas'),
  status: document.querySelector('#status'),
  helpDialog: document.querySelector('#help-dialog')
});
mainWindow.onCreate();
