const CODES = {
  A: 65,
  Z: 90,
};

function createRow(index, content) {
  const resizer = index ? '<div class="row-info-resize"></div>' : '';
  return `
    <div class="row">
        <div class="row-info">
          ${index ? index : ''}
          ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div> 
  `;
}

function createCol(col) {
  return `
    <div class="column">
        ${col}
        <div class="column-resize"></div>
    </div>
    `;
}

function createCell() {
  return `
  <div class="cell" contenteditable></div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createCol)
    .join('');
  rows.push(createRow(null, cols));
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(createCell).join('');
    rows.push(createRow(i + 1, cells));
  }
  return rows.join('');
}
