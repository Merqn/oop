import { openWork as openWork1 } from './module1.js';
import { FirstPage } from './module2-page1.js';
import { SecondPage } from './module2-page2.js';

const resultElement = document.querySelector('#result');
const dialogRoot = document.querySelector('#dialog-root');

dialogRoot.addEventListener('open-second-page', (event) => {
  const { root, onConfirm } = event.detail;
  new SecondPage(root, onConfirm).show();
});

dialogRoot.addEventListener('open-first-page', (event) => {
  const { root, onConfirm } = event.detail;
  new FirstPage(root, onConfirm).show();
});

document.querySelector('#work1').addEventListener('click', () => {
  openWork1(dialogRoot, (result) => {
    resultElement.textContent = `Робота 1\nВи обрали число: ${result}`;
  });
});

document.querySelector('#work2').addEventListener('click', () => {
  const firstPage = new FirstPage(dialogRoot, (result) => {
    resultElement.textContent = `Робота 2\n${result}`;
  });
  firstPage.show();
});
