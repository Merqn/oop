export class Toolbar {
  static TOOLTIP_DELAY = 400;

  constructor(container, owner) {
    this.container = container;
    this.owner = owner;
    this.buttons = new Map();
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'tooltip';
    this.tooltip.setAttribute('role', 'tooltip');
    document.body.appendChild(this.tooltip);
    this.timer = null;
  }

  addButton(id, icon) {
    const button = document.createElement('button');
    button.className = 'tool-button';
    button.type = 'button';
    button.dataset.id = id;
    button.setAttribute('aria-label', this.owner.onNotify({ code: 'TTN_NEEDTEXT', id }));
    button.innerHTML = icon;
    button.addEventListener('click', (event) => this.#onClick(event));
    button.addEventListener('pointerenter', (event) => this.#onPointerEnter(event));
    button.addEventListener('pointerleave', () => this.#hideTooltip());
    button.addEventListener('focus', (event) => this.#onFocus(event));
    button.addEventListener('blur', () => this.#hideTooltip());
    this.container.appendChild(button);
    this.buttons.set(id, button);
  }

  setPressed(id) {
    for (const [buttonId, button] of this.buttons) {
      const selected = buttonId === id;
      button.classList.toggle('pressed', selected);
      button.setAttribute('aria-pressed', String(selected));
    }
  }

  #onClick(event) {
    this.#hideTooltip();
    this.owner.onCommand(event.currentTarget.dataset.id);
  }

  #onPointerEnter(event) {
    const button = event.currentTarget;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const text = this.owner.onNotify({
        code: 'TTN_NEEDTEXT',
        id: button.dataset.id
      });
      if (text) this.#showTooltip(button, text);
    }, Toolbar.TOOLTIP_DELAY);
  }

  #onFocus(event) {
    const button = event.currentTarget;
    const text = this.owner.onNotify({
      code: 'TTN_NEEDTEXT',
      id: button.dataset.id
    });
    if (text) this.#showTooltip(button, text);
  }

  #showTooltip(button, text) {
    const bounds = button.getBoundingClientRect();
    this.tooltip.textContent = text;
    this.tooltip.style.left = `${bounds.left}px`;
    this.tooltip.style.top = `${bounds.bottom + 4}px`;
    this.tooltip.classList.add('visible');
  }

  #hideTooltip() {
    clearTimeout(this.timer);
    this.tooltip.classList.remove('visible');
  }
}
