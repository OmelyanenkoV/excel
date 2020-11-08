import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }
  toHTML() {
    return createTable(20);
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const type = $resizer.data.resize;
      const coords = $parent.getCoords();
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);
      $resizer.updateCss({ background: '#3c74ff', height: '100vh' });
      document.onmousemove = (e) => {
        if (type === 'col') {
          const delta = e.pageX - coords.right;
          const value = coords.width + delta;
          $parent.updateCss({ widht: value + 'px' });
          cells.forEach((el) => (el.style.width = value + 'px'));
        } else {
          const delta = e.pageY - coords.bottom;
          const value = coords.height + delta;
          $parent.updateCss({ height: value + 'px' });
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        $resizer.updateCss({ background: 'transparent' });
      };
    }
  }
}
