export class FirstPage {
  constructor(root, onConfirm) {
    this.root = root;
    this.onConfirm = onConfirm;
    this.dialog = null;
  }

  createButton(text, handler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.addEventListener('click', handler);
    return button;
  }

  show() {
    this.root.replaceChildren();

    this.dialog = document.createElement('dialog');
    const title = document.createElement('h3');
    title.textContent = 'Робота 2 - перше вікно';

    const text = document.createElement('p');
    text.textContent = 'Натисніть "Далі >", щоб перейти до другого вікна.';

    const cancel = this.createButton('Відміна', () => this.close());
    const next = this.createButton('Далі >', () => { 
      this.close();
      this.openNextPage();
    });

    this.dialog.append(title, text, cancel, next);
    this.root.append(this.dialog);
    this.dialog.addEventListener('close', () => this.dialog.remove(), { once: true });
    this.dialog.showModal();
  }

  close() {
    if (this.dialog?.open) {
      this.dialog.close();
    }
  }

  openNextPage() {
    const event = new CustomEvent('open-second-page', {
      detail: { root: this.root, onConfirm: this.onConfirm }
    });
    this.root.dispatchEvent(event);
  }
}
