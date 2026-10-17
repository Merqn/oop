class SliderPage {
  constructor(root, onConfirm) {
    this.root = root;
    this.onConfirm = onConfirm;
    this.dialog = null;
    this.slider = null;
    this.value = null;
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
    title.textContent = 'Робота 1';

    const text = document.createElement('p');
    text.textContent = 'Оберіть число від 1 до 100.';

    this.value = document.createElement('output');
    this.value.textContent = '50';

    this.slider = document.createElement('input');
    this.slider.type = 'range';
    this.slider.min = '1';
    this.slider.max = '100';
    this.slider.value = '50';
    this.slider.addEventListener('input', () => {
      this.value.textContent = this.slider.value;
    });

    const cancel = this.createButton('Відміна', () => this.close());
    const confirm = this.createButton('Так', () => {
      this.onConfirm(this.slider.value);
      this.close();
    });

    this.dialog.append(
      title,
      text,
      this.slider,
      this.value,
      document.createElement('br'),
      cancel,
      confirm
    );
    this.root.append(this.dialog);
    this.dialog.addEventListener('close', () => this.dialog.remove(), { once: true });
    this.dialog.showModal();
  }

  close() {
    if (this.dialog?.open) {
      this.dialog.close();
    }
  }
}

export function openWork(root, onConfirm) {
  new SliderPage(root, onConfirm).show();
}
