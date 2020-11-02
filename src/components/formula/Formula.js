import { ExcelComponent } from '@core/ExcelComponent';
export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  toHTML() {
    return `
    <div class="excel__formula__info">fx</div>
    <div
      class="excel__formula__input"
      contenteditable
      spellcheck="false"
    ></div>
    `;
  }

  onInput(event) {
    console.log(this.$root);
    console.log('onInputFormula:', event.target.textContent.trim());
  }

  onClick(event) {
    console.log(event);
  }
}
