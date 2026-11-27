import { MAX_SHAPES, MyEditor } from './Editor.js';
import { MainMenu } from './MainMenu.js';
import { Toolbar } from './Toolbar.js';
import { findTool, TOOLS } from './tools.js';

const CMD_CLEAR = 'clear';
const CMD_ABOUT = 'about';
const canvas = document.querySelector('#editor-canvas');

export const myEditor = new MyEditor(canvas);

class MainWindow {
  constructor({ menubar, toolbar, status, helpDialog, editor }) {
    this.statusElement = status;
    this.helpDialog = helpDialog;
    this.editor = editor;
    this.editor.onMessage = (message) => this.setStatus(message);
    this.menu = new MainMenu(menubar, this);
    this.toolbar = new Toolbar(toolbar, this);
    this.objectsMenu = null;
    this.currentType = null;
  }

  onCreate() {
    this.menu.addMenu('Файл', [{ id: CMD_CLEAR, text: 'Очистити' }]);
    this.objectsMenu = this.menu.addMenu(
      'Об’єкти',
      TOOLS.map((tool) => ({ id: tool.id, text: tool.name, shape: true })),
      'menu-objects'
    );
    this.menu.addMenu('Довідка', [{ id: CMD_ABOUT, text: 'Про програму' }]);
    this.toolbar.addButton(
      CMD_CLEAR,
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 3v7m4-7v7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    );
    this.toolbar.addSeparator();
    TOOLS.forEach((tool) => this.toolbar.addButton(tool.id, tool.icon));
    this.setStatus(`Об’єктів: 0 / ${MAX_SHAPES}`);
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

    this.editor.setType(tool.shapeClass);
    this.currentType = tool.id;
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
      item.setAttribute('aria-checked', String(item.dataset.shape === this.currentType));
    });
  }

  setStatus(message) {
    this.statusElement.textContent = message;
  }
}

const mainWindow = new MainWindow({
  menubar: document.querySelector('#menubar'),
  toolbar: document.querySelector('#toolbar'),
  status: document.querySelector('#status'),
  helpDialog: document.querySelector('#help-dialog'),
  editor: myEditor
});
mainWindow.onCreate();
