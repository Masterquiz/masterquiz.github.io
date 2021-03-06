// Game propriety
const MIN_WIDTH = 4;
const MAX_WIDTH = 8;
const EXAMPLES = {
  4: [['3 9 -1 9', '9 9 9 9', '0 9 9 0', '-2 9 0 9']],
  5: [['9 9 9 2 9', '2 2 -1 1 1', '9 9 9 9 9', '9 9 -3 2 2', '-3 9 9 9 9']],
  6: [
    [
      '9 9 0 9 -2 9',
      '-1 9 -2 9 -2 9',
      '9 9 2 9 2 9',
      '-3 9 1 9 3 9',
      '9 9 9 9 9 9',
      '9 -3 9 -1 9 -1',
    ],
    [
      '9 9 0 9 9 0',
      '-1 9 -2 9 0 9',
      '9 9 -2 9 -4 9',
      '9 9 -2 9 -4 9',
      '1 9 0 9 -2 9',
      '9 9 0 9 9 -2',
    ],
  ],
  7: [
    [
      '1 9 0 9 -3 9 -3',
      '1 0 9 9 9 9 9',
      '9 9 1 9 0 9 1',
      '3 9 9 9 9 9 9',
      '9 9 4 9 6 9 1',
      '-1 9 9 9 9 9 9',
      '9 9 -3 9 3 9 1',
    ],
  ],
  8: [
    [
      '-3 9 9 9 0 9 -2 9',
      '9 9 -6 9 0 9 0 9',
      '-4 9 9 9 -3 9 -2 9',
      '9 -2 -4 -3 0 9 0 9',
      '9 9 9 9 9 9 -4 9',
      '9 3 2 2 1 9 -2 9',
      '9 9 9 9 9 9 -1 9',
      '-1 9 1 9 9 2 9 2',
    ],
    [
      '0 9 1 -1 9 9 9 0',
      '9 2 9 9 4 2 1 9',
      '9 9 9 9 9 9 9 -2',
      '3 9 3 2 3 4 9 9',
      '9 9 9 9 9 1 9 1',
      '2 9 9 1 9 0 9 9',
      '9 3 9 2 9 -2 9 -2',
      '0 9 -1 9 9 9 -3 9',
    ],
  ],
};

const CODE = `
  'pmat' ⎕CY 'dfns'

  f ← {
    y←⍺ ⋄ x←⍵ ⋄ mat←⍺⍺
    n ← ≢near ← ({1↓↓⍵⌿⍨∧/⍵∊⍳≢mat}y+⍤1⊢↑,∘.,⍨0 1 ¯1)~⍸0≠x+9≠mat
    s ← y⌷mat-{+/,⍵}⌺3 3⊢x
    ((0=n)∧0≠s)∨(≠/2|n s)∨n<|s:⍬
    sum ← {1 ¯1/⍨⍵⊃⍨⍸s=-/¨⍵}(⌽,¨⊢)0,⍳n
    {⍵@near⊢x}¨↓∪sum[pmat n]
  }

  solver ← {⊃⊃{⊃,/⍺∘(mat f)¨⍵}/(⍸9≠⍵),(⊂∘⊂0⍴⍨⍴)⍵⊣mat←⍵}
  format ← '- +'⌷⍨∘⊂2∘+`;

document.querySelector('.dimension__button').addEventListener('click', function customisedTD() {
  [...document.querySelectorAll('.input__table tr')].map((tr, i) =>
    [...tr.querySelectorAll('.input__table td')].map((td, j) => {
      td.contentEditable = true;

      td.addEventListener('input', () => {
        UNDO.push([[i, j], td.innerText.replace('\n', '')]);
        document.querySelector('.input__modify .btns__undo').disabled = false;

        REDO = [];
        document.querySelector('.input__modify .btns__redo').disabled = true;
      });
    })
  );
});

document.querySelector('.input__modify .btns__undo').addEventListener('click', function undo() {
  if (UNDO.length) {
    const [[i, j], value] = UNDO.slice(-1)[0];
    UNDO.pop();

    REDO.push([[i, j], value]);

    [...document.querySelectorAll('.input__table tr')].map(tr => tr.querySelectorAll('td'))[i][
      j
    ].innerText =
      UNDO.map(x => (JSON.stringify(x[0]) === `[${i},${j}]` ? x[1] : ''))
        .filter(x => x !== '')
        .slice(-1) + '\n';
  }

  if (!UNDO.length) this.disabled = true;

  document.querySelector('.input__modify .btns__redo').disabled = false;
});

document.querySelector('.input__modify .btns__redo').addEventListener('click', function redo() {
  if (REDO.length) {
    const [[i, j], value] = REDO.slice(-1)[0];
    REDO.pop();

    UNDO.push([[i, j], value]);

    [...document.querySelectorAll('.input__table tr')].map(tr => tr.querySelectorAll('td'))[i][
      j
    ].innerText =
      UNDO.map(x => (JSON.stringify(x[0]) === `[${i},${j}]` ? x[1] : ''))
        .filter(x => x !== '')
        .slice(-1) + '\n';
  }

  if (!REDO.length) this.disabled = true;
  document.querySelector('.input__modify .btns__undo').disabled = false;
});

document.querySelector('.btns__solve').addEventListener('click', async function solve() {
  [...document.querySelectorAll('.input__btns button')].map(btn => (btn.disabled = true));

  const matrix = [...document.querySelectorAll('.input__table tr')].map(tr =>
    [...tr.querySelectorAll('td')].map(td =>
      td.innerText.replace('\n', '') === '' ? 9 : +td.innerText
    )
  );

  const output_table = document.querySelector('.output__table');
  output_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  output_table.appendChild(table);

  (await executeAPL(CODE, `format solver fromJSON '${JSON.stringify(matrix)}'`)).map((item, i) => {
    const tr = document.createElement('tr');
    item.split``.map((x, j) => {
      const td = document.createElement('td');

      if (x === ' ' && matrix[i][j] != 9) td.innerText = matrix[i][j];
      else {
        td.style.backgroundSize = '50%';
        if (x === '+') td.style.backgroundImage = 'url("/img/logic_games/plus.png")';
        if (x === '-') td.style.backgroundImage = 'url("/img/logic_games/minus.png")';
      }

      td.appendChild(document.createElement('br'));
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  [...document.querySelectorAll('.input__btns button')].map(btn => (btn.disabled = false));
  session_style(2);
});

document.querySelector('.btns__create').addEventListener('click', async function create() {
  session_style(1);
  [...document.querySelectorAll('.input__btns button')].map(btn => (btn.disabled = true));

  const input_table = document.querySelector('.input__table');
  const width =
    document.querySelector('.dimension__value').value ||
    input_table.querySelector('tr').childElementCount;

  input_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  input_table.appendChild(table);

  EXAMPLES[width][(EXAMPLES[width].length * Math.random()) | 0].map((item, i) => {
    const tr = document.createElement('tr');
    item.split` `.map((x, j) => {
      const td = document.createElement('td');

      td.contentEditable = true;
      td.innerText = x === '9' ? '' : x;

      td.addEventListener('input', () => {
        UNDO.push([[i, j], td.innerText.replace('\n', '')]);
        document.querySelector('.input__modify .btns__undo').disabled = false;

        REDO = [];
        document.querySelector('.input__modify .btns__redo').disabled = true;
      });

      td.appendChild(document.createElement('br'));
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  [...document.querySelectorAll('.input__btns button')].map(btn => (btn.disabled = false));
});

document.querySelector('.btns__try').addEventListener('click', async function try_solve() {
  const matrix = [...document.querySelectorAll('.input__table tr')].map(tr =>
    [...tr.querySelectorAll('td')].map(td =>
      td.innerText.replace('\n', '') === '' ? 9 : +td.innerText
    )
  );

  const try_label = document.querySelector('.try h2');
  try_label.innerText = 'Solve';
  try_label.style.color = '#4169e1';

  document.querySelector('.btns__mode').style.backgroundSize = '50%';

  const try_table = document.querySelector('.try__table');
  try_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  try_table.appendChild(table);

  matrix.map((item, i) => {
    const tr = document.createElement('tr');

    item.map((x, j) => {
      const td = document.createElement('td');

      if (x === 9) td.style.color = '#4169e1';
      else {
        td.style.pointerEvents = 'none';
        td.innerText = x;
      }

      td.addEventListener('click', function f() {
        const btn_mode = document.querySelector('.btns__mode').style.backgroundImage;
        if (try_label.innerText === 'Correct!') this.removeEventListener('click', f);
        else {
          if (try_label.innerText === 'Wrong!') {
            try_label.innerText = 'Try again!';
            try_label.style.color = '#4169e1';
          }

          value =
            td.style.backgroundImage === 'url("/img/logic_games/plus.png")'
              ? 1
              : td.style.backgroundImage === 'url("/img/logic_games/minus.png")'
              ? -1
              : 0;

          TRY_UNDO.push([[i, j], value]);
          document.querySelector('.try__modify .btns__undo').disabled = false;

          TRY_REDO = [];
          document.querySelector('.try__modify .btns__redo').disabled = true;

          td.style.backgroundSize = '50%';
          td.style.backgroundImage = td.style.backgroundImage === btn_mode ? '' : btn_mode;
        }
      });

      td.appendChild(document.createElement('br'));
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  document.querySelector('.btns__verify').disabled = false;
  document.querySelector('.btns__mode').style.color = '#4169e1';
  document.querySelector('.btns__mode').style.backgroundImage = 'url("/img/logic_games/plus.png")';

  session_style(3);
});

document.querySelector('.try__modify .btns__undo').addEventListener('click', function try_undo() {
  if (TRY_UNDO.length) {
    const [[i, j], _] = TRY_UNDO.slice(-1)[0];

    const td = [...document.querySelectorAll('.try__table tr')].map(tr =>
      tr.querySelectorAll('td')
    )[i][j];

    if (td.style.backgroundImage === 'url("/img/logic_games/plus.png")') TRY_REDO.push([[i, j], 1]);
    else if (td.style.backgroundImage === 'url("/img/logic_games/minus.png")')
      TRY_REDO.push([[i, j], -1]);
    else TRY_REDO.push([[i, j], 0]);

    let new_value = TRY_UNDO.map(x => (JSON.stringify(x[0]) === `[${i},${j}]` ? x[1] : ''))
      .filter(x => x !== '')
      .slice(-1)[0];

    TRY_UNDO.pop();

    if (new_value === 1) td.style.backgroundImage = 'url("/img/logic_games/plus.png")';
    else if (new_value === -1) td.style.backgroundImage = 'url("/img/logic_games/minus.png")';
    else td.style.backgroundImage = '';
  }

  if (!TRY_UNDO.length) this.disabled = true;

  document.querySelector('.try__modify .btns__redo').disabled = false;
});

document.querySelector('.try__modify .btns__redo').addEventListener('click', function try_redo() {
  if (TRY_REDO.length) {
    const [[i, j], _] = TRY_REDO.slice(-1)[0];

    const td = [...document.querySelectorAll('.try__table tr')].map(tr =>
      tr.querySelectorAll('td')
    )[i][j];

    if (td.style.backgroundImage === 'url("/img/logic_games/plus.png")') TRY_UNDO.push([[i, j], 1]);
    else if (td.style.backgroundImage === 'url("/img/logic_games/minus.png")')
      TRY_UNDO.push([[i, j], -1]);
    else TRY_UNDO.push([[i, j], 0]);

    let new_value = TRY_REDO.map(x => (JSON.stringify(x[0]) === `[${i},${j}]` ? x[1] : ''))
      .filter(x => x !== '')
      .slice(-1)[0];

    TRY_REDO.pop();

    if (new_value === 1) td.style.backgroundImage = 'url("/img/logic_games/plus.png")';
    else if (new_value === -1) td.style.backgroundImage = 'url("/img/logic_games/minus.png")';
    else td.style.backgroundImage = '';
  }

  if (!TRY_REDO.length) this.disabled = true;
  document.querySelector('.try__modify .btns__undo').disabled = false;
});

document.querySelector('.btns__verify').addEventListener('click', async function verify() {
  const matrix = [...document.querySelectorAll('.input__table tr')].map(tr =>
    [...tr.querySelectorAll('td')].map(td =>
      td.innerText.replace('\n', '') === '' ? 9 : +td.innerText
    )
  );

  const solution = await executeAPL(CODE, `toJSON solver fromJSON '${JSON.stringify(matrix)}'`);

  const try_matrix = JSON.stringify(
    [...document.querySelectorAll('.try__table tr')].map(tr =>
      [...tr.querySelectorAll('td')].map(td =>
        td.style.backgroundImage === 'url("/img/logic_games/plus.png")'
          ? 1
          : td.style.backgroundImage === 'url("/img/logic_games/minus.png")'
          ? -1
          : 0
      )
    )
  );

  const try_label = document.querySelector('.try h2');

  if (solution[0] === try_matrix) {
    try_label.style.color = '#080';
    try_label.innerText = 'Correct!';

    this.disabled = true;
    document.querySelector('.try__modify .btns__undo').disabled = true;
    document.querySelector('.try__modify .btns__redo').disabled = true;
  } else {
    try_label.style.color = '#e62020';
    try_label.innerText = 'Wrong!';
  }
});

document.querySelector('.btns__mode').addEventListener('click', function mode() {
  if (document.querySelector('.try h2').innerText === 'Correct!')
    document.querySelector('.btns__mode').removeEventListener('click', mode);
  else {
    this.style.backgroundSize = '50%';
    this.style.backgroundImage =
      this.style.backgroundImage === 'url("/img/logic_games/plus.png")'
        ? 'url("/img/logic_games/minus.png")'
        : 'url("/img/logic_games/plus.png")';
  }
});
