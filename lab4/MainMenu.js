export class MainMenu {
  constructor(container, owner) {
    this.container = container;
    this.owner = owner;
    this.menus = [];
    document.addEventListener('click', (event) => this.#onDocumentClick(event));
  }

  addMenu(title, items, id = '') {
    const menu = document.createElement('div');
    menu.className = 'menu';
    if (id) menu.id = id;

    const titleButton = document.createElement('button');
    titleButton.className = 'menu-title';
    titleButton.type = 'button';
    titleButton.textContent = title;
    titleButton.addEventListener('click', (event) => this.#onTitleClick(event, menu));

    const popup = document.createElement('div');
    popup.className = 'menu-popup';
    for (const item of items) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.id = item.id;
      button.textContent = item.text;
      if (item.shape) {
        button.dataset.shape = item.id;
        button.setAttribute('role', 'menuitemradio');
        button.setAttribute('aria-checked', 'false');
        const check = document.createElement('span');
        check.className = 'menu-check';
        check.textContent = '✓';
        button.prepend(check);
      }
      button.addEventListener('click', () => this.#onItemClick(item.id));
      popup.appendChild(button);
    }

    menu.append(titleButton, popup);
    this.container.appendChild(menu);
    this.menus.push(menu);
    return menu;
  }

  closeAll() {
    this.menus.forEach((menu) => menu.classList.remove('open'));
  }

  #onTitleClick(event, menu) {
    event.stopPropagation();
    const wasOpen = menu.classList.contains('open');
    this.closeAll();
    if (!wasOpen) {
      this.owner.onInitMenuPopup(menu);
      menu.classList.add('open');
    }
  }

  #onItemClick(id) {
    this.closeAll();
    this.owner.onCommand(id);
  }

  #onDocumentClick(event) {
    if (!this.container.contains(event.target)) {
      this.closeAll();
    }
  }
}
