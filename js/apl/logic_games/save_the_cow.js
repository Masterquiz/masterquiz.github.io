// Game propriety
const MIN_WIDTH = 10;
const MAX_WIDTH = 13;
// prettier-ignore
const EXAMPLES = {
  10: [
    ["0 0 0 0 0 0 0 0 0 1", "0 0 0 0 0 0 0 0 0 0", "0 0 0 0 0 0 0 0 0 1", "0 0 0 1 0 0 1 0 0 0", "0 0 0 1 0 0 0 0 0 0", "0 0 0 0 0 0 0 1 1 0", "1 0 0 0 0 0 1 1 1 0", "1 0 0 1 1 0 0 1 0 0", "0 0 0 1 0 0 0 0 0 0", "0 0 0 0 0 0 0 0 1 0"],
  ],
  11: [
    ["0 0 0 0 0 0 0 0 0 0 0", "0 0 0 0 0 0 0 0 0 0 0", "1 0 0 0 0 1 0 0 0 0 0", "0 0 0 0 1 0 0 0 1 0 0", "0 1 0 0 0 0 0 1 0 0 0", "0 0 0 0 0 0 0 0 0 1 0", "0 0 0 0 0 0 0 0 1 0 0", "0 0 0 0 0 1 1 0 1 0 1", "0 0 1 0 0 1 1 1 0 0 0", "0 0 0 0 0 0 0 0 0 0 0", "0 0 0 0 0 0 0 1 0 0 1"],
  ],
  12: [
    ["1 0 0 0 1 0 0 0 0 0 1 0", "0 0 0 0 0 0 0 0 0 0 0 0", "0 0 0 0 0 0 0 0 0 0 0 0", "1 0 1 1 1 1 0 0 0 0 0 0", "0 1 0 0 0 0 0 0 0 0 0 0", "0 0 0 0 0 0 1 0 1 1 0 0", "0 0 0 0 0 0 0 0 1 0 0 0", "0 0 0 0 0 0 1 0 0 0 0 0", "1 0 0 0 1 0 1 1 1 1 0 0", "0 0 0 0 1 1 0 1 0 0 0 0", "0 0 0 0 0 0 0 0 0 0 0 0", "0 0 0 0 1 0 0 0 0 1 0 0"],
    ["0 0 0 0 1 0 0 0 0 0 0 1", "0 0 0 0 0 0 0 0 1 0 0 0", "0 0 0 1 0 0 0 0 1 0 0 0", "0 0 0 0 0 0 0 0 0 0 0 0", "0 0 0 1 0 0 0 0 0 1 0 0", "0 0 0 0 1 0 0 1 0 0 0 0", "0 0 0 0 0 1 0 0 0 0 0 1", "0 0 0 0 0 0 0 0 0 0 0 0", "0 0 0 0 0 0 0 0 0 1 0 0", "1 0 0 1 1 0 0 0 1 0 1 0", "0 1 0 1 0 0 0 0 0 0 1 0", "0 0 0 0 0 0 0 0 0 0 0 0"],
    ["1 0 0 0 0 0 0 1 0 0 0 0", "0 0 0 0 0 0 0 0 0 0 1 0", "0 0 0 0 0 1 0 0 0 0 1 0", "0 0 0 0 0 0 0 0 0 1 0 0", "0 0 0 0 0 0 0 1 0 1 0 0", "1 0 1 0 1 0 0 0 0 0 0 0", "0 0 0 0 0 0 0 1 0 0 0 0", "1 0 0 0 1 1 0 0 0 1 1 0", "0 0 0 0 0 0 0 1 0 1 0 0", "0 0 0 0 0 0 0 1 1 0 0 1", "0 0 0 0 0 0 0 0 1 0 0 0", "1 0 0 1 0 0 0 0 0 0 0 0"],
  ],
  13: [
    ["0 0 0 0 0 0 0 1 0 1 0 0 0", "0 0 0 0 0 0 0 0 0 0 0 1 0", "1 0 0 0 0 0 0 0 1 0 0 0 0", "0 0 0 0 1 0 0 0 0 1 0 0 1", "1 0 0 0 0 0 0 0 0 0 1 0 1", "0 0 0 1 0 0 0 0 0 0 1 0 0", "0 0 1 0 0 0 0 0 1 0 0 0 0", "0 1 1 0 0 0 0 1 0 0 1 0 0", "0 0 1 0 0 0 1 0 0 0 0 0 0", "0 0 0 0 0 0 1 0 0 0 1 1 0", "0 0 0 1 0 0 1 1 0 0 0 0 0", "0 0 0 0 0 0 0 0 0 0 1 0 1", "0 1 0 1 1 0 1 0 0 0 0 0 0"],
  ]
};

const CODE = `
  ∇ z ← y f m;l;pi;pl;na;ok;ls
    pl ← ⍸0=m
    pi ← 1↑pl
    ls ← {⍵/⍨~1∊¨×⍵}pi-cows,⊂1+,⍨dim
    :If 0≠≢ls
        l ← {(⊃⍵)+⍳|-/⍵}{⍵[2⍴⍋⍵]}⌈/¨|ls
        l ← {⍵/⍨∧/¨dim≥¯1+pi+⍵}l
        na ← {pi+¯1+⍳,⍨⍵}¨l
        ok ← {⍵/⍨~1∊¨(⊂0≠m)∧⍵}{⍵∊⍨⍳,⍨dim}¨na
        z ← (⊂m)+y×ok
    :EndIf
  ∇

  ∇ sol ← solver mat;cows;dim
    dim ← ≢mat
    sol ← ⊃{⍵/⍨~0∊¨⍵}⊃{⊃,/⍺ f¨⍵}/(⌽⍳⍴cows←⍸mat),⊂⊂(0⍴⍨⍴)mat
  ∇

  format ← {(1,2≠/⍵)+(2⍪2×2≠⌿⍵)}

  reverse_format ← {
    (x y) ← ⍵
    flat ← {⊃,/⍵}
    pos ← ⍳⍴x
    x ← ⊃,/pos⊂¨⍨⍥↓x
    y ← ⊃,/pos⊂¨⍨⍥↓⍥⍉y
    vec ← {∪¨x,∘flat¨(↓∨/¨x∘.∊⍵)/¨⊂⍵}y/⍨1≠≢¨y
    vec ← {flat¨(⊂⍵)⌷⍨¨⊂¨{∪{⍵[⍋⍵]}¨∪¨⍵,∘flat¨(↓∨/¨∘.∊⍨⍵)/¨⊂⍵}⍸¨↓∨/¨∘.∊⍨⍵}vec
    ⊃(⍳≢vec)+.×vec∊⍨¨⊂pos
  }`;

/**
 * Check if in td's background there's a cow.
 *
 * @param {element} td
 */
const isActiveBackground = td => td.style.backgroundImage === 'url("/img/logic_games/cow.png")';

/**
 * Check if a td's border color is black or not.
 *
 * @param {element} td
 * @param {string}  border  'border-left-color' | 'border-top-color'
 */
const isActiveBorder = (td, border) => 'rgb(0, 0, 0)' === window.getComputedStyle(td)[border];

document.querySelector('.dimension__button').addEventListener('click', function customisedTD() {
  [...document.querySelectorAll('.input__table tr')].map((tr, i) =>
    [...tr.querySelectorAll('.input__table td')].map((td, j) => {
      td.addEventListener('click', () => {
        td.style.backgroundImage =
          td.style.backgroundImage === 'url("/img/logic_games/cow.png")'
            ? ''
            : 'url("/img/logic_games/cow.png")';

        UNDO.push([[i, j], +(td.style.backgroundImage != '')]);
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

    const new_value = UNDO.map(x =>
      JSON.stringify(x[0]) === `[${i},${j}]`
        ? x[1]
          ? 'url("/img/logic_games/cow.png")'
          : 'none'
        : ''
    )
      .filter(x => x !== '')
      .slice(-1);

    [...document.querySelectorAll('.input__table tr')].map(tr => tr.querySelectorAll('td'))[i][
      j
    ].style.backgroundImage = new_value ? new_value : '';
  }

  if (!UNDO.length) this.disabled = true;

  document.querySelector('.input__modify .btns__redo').disabled = false;
});

document.querySelector('.input__modify .btns__redo').addEventListener('click', function redo() {
  if (REDO.length) {
    const [[i, j], value] = REDO.slice(-1)[0];
    REDO.pop();

    UNDO.push([[i, j], value]);

    const new_value = UNDO.map(x =>
      JSON.stringify(x[0]) === `[${i},${j}]`
        ? x[1]
          ? 'url("/img/logic_games/cow.png")'
          : 'none'
        : ''
    )
      .filter(x => x !== '')
      .slice(-1);

    [...document.querySelectorAll('.input__table tr')].map(tr => tr.querySelectorAll('td'))[i][
      j
    ].style.backgroundImage = new_value ? new_value : '';
  }

  if (!REDO.length) this.disabled = true;
  document.querySelector('.input__modify .btns__undo').disabled = false;
});

document.querySelector('.btns__solve').addEventListener('click', async function solve() {
  [...document.querySelectorAll('.input__btns button')].map(btn => (btn.disabled = true));

  const matrix = [...document.querySelectorAll('.input__table tr')].map(tr =>
    [...tr.querySelectorAll('td')].map(
      td => +(td.style.backgroundImage === 'url("/img/logic_games/cow.png")')
    )
  );

  const output_table = document.querySelector('.output__table');
  output_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  output_table.appendChild(table);

  JSON.parse(
    await executeAPL(CODE, `toJSON format solver fromJSON '${JSON.stringify(matrix)}'`)
  ).map((item, i) => {
    const tr = document.createElement('tr');
    item.map((x, j) => {
      const td = document.createElement('td');

      if (x & 1) td.style.borderLeft = '1px solid #000';
      if (x & 2) td.style.borderTop = '1px solid #000';

      if (matrix[i][j]) td.style.backgroundImage = 'url("/img/logic_games/cow.png")';

      td.appendChild(document.createElement('br'));
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  [...document.querySelectorAll('.input__btns button')].map(btn => (btn.disabled = false));
  session_style(2);
});

document.querySelector('.btns__create').addEventListener('click', function create() {
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

  EXAMPLES[width][(EXAMPLES[width].length * Math.random()) | 0].map((y, i) => {
    const tr = document.createElement('tr');
    y.split` `.map((x, j) => {
      const td = document.createElement('td');

      td.addEventListener('click', () => {
        UNDO.push([[i, j], +(td.style.backgroundImage != '')]);
        td.style.backgroundImage =
          td.style.backgroundImage === 'url("/img/logic_games/cow.png")'
            ? ''
            : 'url("/img/logic_games/cow.png")';
      });

      td.style.backgroundImage = +x ? 'url("/img/logic_games/cow.png")' : '';

      td.addEventListener('click', e => {
        if (e.offsetY <= 10 && i > 0) {
          if (td.style.borderTop === '1px solid rgb(0, 0, 0)') {
            td.style.borderTop = '1px solid #20202055';
            value = -2;
          } else {
            td.style.borderTop = '1px solid #000';
            value = 2;
          }
        } else if (e.offsetX <= 10 && j > 0) {
          if (td.style.borderLeft === '1px solid rgb(0, 0, 0)') {
            td.style.borderLeft = '1px solid #20202055';
            value = -1;
          } else {
            td.style.borderLeft = '1px solid #000';
            value = 1;
          }
        }

        if ((e.offsetY <= 10 && i > 0) || (e.offsetX <= 10 && j > 0)) {
          UNDO.push([[i, j], value]);
          document.querySelector('.try__modify .btns__undo').disabled = false;

          REDO = [];
          document.querySelector('.try__modify .btns__redo').disabled = true;
        }
      });

      td.appendChild(document.createElement('br'));
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  [...document.querySelectorAll('.input__btns button')].map(btn => (btn.disabled = false));
});

document.querySelector('.btns__try').addEventListener('click', function try_solve() {
  // TODO Check if the puzzle has (one) solution
  const try_label = document.querySelector('.try h2');
  try_label.innerText = 'Solve';
  try_label.style.color = '#4169e1';

  const try_table = document.querySelector('.try__table');
  try_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  try_table.appendChild(table);

  [...document.querySelectorAll('.input__table tr')].map(tr => {
    const try_tr = document.createElement('tr');
    [...tr.querySelectorAll('td')].map(td => {
      const try_td = document.createElement('td');

      if (isActiveBackground(td)) try_td.style.backgroundImage = 'url("/img/logic_games/cow.png")';

      try_td.addEventListener('click', function f() {
        if (try_label.innerText === 'Correct!') try_td.removeEventListener('click', f);
        else {
          if (try_label.innerText === 'Wrong!') {
            try_label.innerText = 'Try again!';
            try_label.style.color = '#4169e1';
          }
        }
      });

      try_td.appendChild(document.createElement('br'));
      try_tr.appendChild(try_td);
    });
    tbody.appendChild(try_tr);
  });

  const try_matrix = [...document.querySelectorAll('.try__table tr')].map(tr => [
    ...tr.querySelectorAll('td'),
  ]);

  try_matrix.map((tr, i) =>
    tr.map((td, j) => {
      td.addEventListener('click', e => {
        let value = 0;
        let pos = [i, j];

        if (e.offsetY <= 10 && i > 0) {
          if (td.style.borderTop === '1px solid rgb(0, 0, 0)') {
            td.style.borderTop = '1px solid #20202055';
            value = -2;
          } else {
            td.style.borderTop = '1px solid #000';
            value = 2;
          }
        } else if (e.offsetY >= 30 && i < try_matrix.length) {
          pos = [i + 1, j];
          if (try_matrix[i + 1][j].style.borderTop === '1px solid rgb(0, 0, 0)') {
            try_matrix[i + 1][j].style.borderTop = '1px solid #20202055';
            value = -2;
          } else {
            try_matrix[i + 1][j].style.borderTop = '1px solid #000';
            value = 2;
          }
        } else if (e.offsetX <= 10 && j > 0) {
          if (td.style.borderLeft === '1px solid rgb(0, 0, 0)') {
            td.style.borderLeft = '1px solid #20202055';
            value = -1;
          } else {
            td.style.borderLeft = '1px solid #000';
            value = 1;
          }
        } else if (e.offsetX >= 30 && j < try_matrix[0].length) {
          pos = [i, j + 1];
          if (try_matrix[i][j + 1].style.borderLeft === '1px solid rgb(0, 0, 0)') {
            try_matrix[i][j + 1].style.borderLeft = '1px solid #20202055';
            value = -1;
          } else {
            try_matrix[i][j + 1].style.borderLeft = '1px solid #000';
            value = 1;
          }
        }

        if (value) {
          TRY_UNDO.push([pos, value]);
          document.querySelector('.try__modify .btns__undo').disabled = false;

          TRY_REDO = [];
          document.querySelector('.try__modify .btns__redo').disabled = true;
        }
      });
    })
  );

  document.querySelector('.btns__verify').disabled = false;

  session_style(3);
});

document.querySelector('.try__modify .btns__undo').addEventListener('click', function try_undo() {
  if (TRY_UNDO.length) {
    const [[i, j], value] = TRY_UNDO.slice(-1)[0];
    TRY_REDO.push([[i, j], value]);

    let new_value = TRY_UNDO.map(x =>
      JSON.stringify(x[0]) === `[${i},${j}]` && +x[1] === value ? x[1] : ''
    )
      .filter(x => x !== '')
      .slice(-1)[0];

    TRY_UNDO.pop();

    const td = [...document.querySelectorAll('.try__table tr')].map(tr =>
      tr.querySelectorAll('td')
    )[i][j];

    if (new_value === 2) td.style.borderTop = '1px solid #20202055';
    else if (new_value === 1) td.style.borderLeft = '1px solid #20202055';
    else if (new_value === -1) td.style.borderLeft = '1px solid #000';
    else if (new_value === -2) td.style.borderTop = '1px solid #000';
  }

  if (!TRY_UNDO.length) this.disabled = true;

  document.querySelector('.try__modify .btns__redo').disabled = false;
});

document.querySelector('.try__modify .btns__redo').addEventListener('click', function try_redo() {
  if (TRY_REDO.length) {
    const [[i, j], value] = TRY_REDO.slice(-1)[0];
    TRY_UNDO.push([[i, j], value]);

    let new_value = TRY_REDO.map(x =>
      JSON.stringify(x[0]) === `[${i},${j}]` && +x[1] === value ? x[1] : ''
    )
      .filter(x => x !== '')
      .slice(-1)[0];

    TRY_REDO.pop();

    const td = [...document.querySelectorAll('.try__table tr')].map(tr =>
      tr.querySelectorAll('td')
    )[i][j];

    if (new_value === -2) td.style.borderTop = '1px solid #20202055';
    else if (new_value === -1) td.style.borderLeft = '1px solid #20202055';
    else if (new_value === 1) td.style.borderLeft = '1px solid #000';
    else if (new_value === 2) td.style.borderTop = '1px solid #000';
  }

  if (!TRY_REDO.length) this.disabled = true;
  document.querySelector('.try__modify .btns__undo').disabled = false;
});

document.querySelector('.btns__verify').addEventListener('click', async function verify() {
  const matrix = [...document.querySelectorAll('.input__table tr')].map(tr =>
    [...tr.querySelectorAll('td')].map(td => +isActiveBackground(td))
  );

  const solution = await executeAPL(CODE, `toJSON solver fromJSON '${JSON.stringify(matrix)}'`);
  let try_matrix = [...document.querySelectorAll('.try__table tr')].map(tr => [
    ...tr.querySelectorAll('td'),
  ]);

  const try_rows = try_matrix.map(tr => tr.map(td => +isActiveBorder(td, 'border-left-color')));
  const try_cols = try_matrix.map(tr => tr.map(td => +isActiveBorder(td, 'border-top-color')));

  try_matrix = await executeAPL(
    `toJSON reverse_format fromJSON¨ '${JSON.stringify(try_rows)}' '${JSON.stringify(try_cols)}'`
  );

  const try_label = document.querySelector('.try h2');

  if (solution[0] === try_matrix[0]) {
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
