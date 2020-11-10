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
      const sideProp = type === 'col' ? 'bottom' : 'right';
      let value;

      $resizer.updateCss({ background: '#3c74ff', [sideProp]: '-5000px' });

      document.onmousemove = (e) => {
        if (type === 'col') {
          const delta = e.pageX - coords.right;
          value = coords.width + delta;
          $resizer.updateCss({ right: -delta + 'px' });
        } else {
          const delta = e.pageY - coords.bottom;
          value = coords.height + delta;
          $resizer.updateCss({ bottom: -delta + 'px' });
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;

        if (type === 'col') {
          $parent.updateCss({ widht: value + 'px' });
          this.$root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach((el) => (el.style.width = value + 'px'));
        } else {
          $parent.updateCss({ height: value + 'px' });
        }

        $resizer.updateCss({
          background: 'none',
          bottom: 0,
          right: 0,
        });
      };
    }
  }
}
