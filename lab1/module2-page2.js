export class SecondPage {
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
    title.textContent = 'Робота 2 - друге вікно';

    const text = document.createElement('p');
    text.textContent = 'Це друге діалогове вікно.';

    const back = this.createButton('< Назад', () => {
      this.close();
      this.openPreviousPage();
    });
    const cancel = this.createButton('Відміна', () => this.close());
    const confirm = this.createButton('Так', () => {
      this.onConfirm('Обидва діалогові вікна успішно пройдено.');
      this.close();
    });

    this.dialog.append(title, text, back, cancel, confirm);
    this.root.append(this.dialog);
    this.dialog.addEventListener('close', () => this.dialog.remove(), { once: true });
    this.dialog.showModal();
  }

  close() {
    if (this.dialog?.open) {
      this.dialog.close();
    }
  }

  openPreviousPage() {
    const event = new CustomEvent('open-first-page', {
      detail: { root: this.root, onConfirm: this.onConfirm }
    });
    this.root.dispatchEvent(event);
  }
}
