/*
  Index:
  - Trees table
  - Trees animation
  - Electric charges table
  - Electric charges animation
  - Save the cow table
  - Save the cow animation
  - Hitori table
  - Hitori animation
*/

// Trees table
table = document.createElement('table');
tbody = document.createElement('tbody');
table.appendChild(tbody);
document.querySelectorAll('.card__preview')[0].appendChild(table);

[
  [3, 3, 2, 2, 3, 2, 2, 2, 2],
  [1, 1, 0, 0, 1, 0, 0, 0, 0],
  [1, 2, 2, 2, 1, 0, 0, 3, 2],
  [1, 3, 2, 3, 2, 2, 2, 1, 0],
  [1, 1, 0, 2, 1, 0, 0, 1, 0],
  [1, 3, 1, 0, 3, 1, 0, 1, 0],
  [3, 0, 1, 0, 1, 2, 2, 1, 0],
  [1, 0, 2, 3, 2, 2, 2, 1, 0],
  [1, 0, 0, 1, 0, 0, 0, 2, 1],
].map(item => {
  const tr = document.createElement('tr');
  item.map(x => {
    const td = document.createElement('td');
    if (x & 1) td.style.borderLeft = '1px solid #000';
    if (x & 2) td.style.borderTop = '1px solid #000';
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
});

// Trees animation
const tree_tds = document.querySelectorAll('.card__preview')[0].querySelectorAll('td');
const tree_solution = [
  [0, [0, 2, 4, 9, 11, 13]],
  [1, [60]],
  [0, [48, 50, 51, 52, 57, 59, 61, 68, 69, 70]],
  [0, [22, 23, 24, 39, 30, 66, 75]],
  [1, [3, 21]],
  [0, [12, 20, 29, 31]],
  [1, [40, 58]],
  [0, [32, 41, 49, 67, 76, 54, 55, 56, 62]],
  [1, [77, 79]],
  [0, [71, 80, 72, 73, 74, 78, 34, 43, 6, 15]],
  [1, [28, 47]],
  [0, [37, 38, 19, 18, 27, 36, 46]],
  [1, [47, 45, 63, 65]],
  [0, [55, 64, 53]],
  [1, [44]],
  [0, [42, 35, 16, 17]],
  [1, [33]],
  [0, [25]],
  [1, [7, 10, 14, 26]],
];

(async function animateTree() {
  for (const step of tree_solution) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (step[0])
      step[1].map(
        pos => (tree_tds[pos].style.backgroundImage = 'url("/img/logic_games/trees.png")')
      );
    else
      step[1].map(
        pos => (tree_tds[pos].style.backgroundImage = 'url("/img/logic_games/erase.png")')
      );
  }

  await new Promise(resolve => setTimeout(resolve, 1000));
  [...tree_tds].map(td => {
    if (td.style.backgroundImage === 'url("/img/logic_games/erase.png")')
      td.style.backgroundImage = '';
  });

  await new Promise(resolve => setTimeout(resolve, 4000));
  [...tree_tds].map(td => (td.style.backgroundImage = ''));
  animateTree();
})();

// Electric charges table
table = document.createElement('table');
tbody = document.createElement('tbody');
table.appendChild(tbody);
document.querySelectorAll('.card__preview')[1].appendChild(table);

[
  [-3, 9, 9, 9, 0, 9, -2, 9],
  [9, 9, -6, 9, 0, 9, 0, 9],
  [-4, 9, 9, 9, -3, 9, -2, 9],
  [9, -2, -4, -3, 0, 9, 0, 9],
  [9, 9, 9, 9, 9, 9, -4, 9],
  [9, 3, 2, 2, 1, 9, -2, 9],
  [9, 9, 9, 9, 9, 9, -1, 9],
  [-1, 9, 1, 9, 9, 2, 9, 2],
].map(item => {
  const tr = document.createElement('tr');
  item.map(x => {
    const td = document.createElement('td');
    td.innerText = x === 9 ? '' : x;
    td.style.backgroundSize = '50%';
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
});

// Electric charges animation
const electric_charges_tds = document.querySelectorAll('.card__preview')[1].querySelectorAll('td');
const electric_charges_solution = [
  [
    [-1, [1, 9, 8, 17, 24]],
    [1, [55, 62]],
  ],
  [[-1, [45, 47, 53]]],
  [
    [1, [52, 60]],
    [-1, [31, 29]],
  ],
  [[1, [21, 23]]],
  [[-1, [13, 11, 19]]],
  [[1, [3, 5]]],
  [
    [-1, [7, 15]],
    [-1, [2, 18]],
  ],
  [
    [1, [51]],
    [-1, [34]],
  ],
  [[1, [50, 49]]],
  [[-1, [48, 57, 59]]],
  [[1, [32, 33, 40]]],
  [[-1, [35]]],
  [
    [1, [36, 37]],
    [-1, [39]],
  ],
];

(async function animateElectricCharges() {
  for (const list of electric_charges_solution) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    for (const step of list) {
      if (step[0] === 1)
        step[1].map(
          pos =>
            (electric_charges_tds[pos].style.backgroundImage = 'url("/img/logic_games/plus.png")')
        );
      else if (step[0] === -1)
        step[1].map(
          pos =>
            (electric_charges_tds[pos].style.backgroundImage = 'url("/img/logic_games/minus.png")')
        );
    }
  }

  await new Promise(resolve => setTimeout(resolve, 11000));
  [...electric_charges_tds].map(td => (td.style.backgroundImage = ''));
  animateElectricCharges();
})();

// Hitoti table
table = document.createElement('table');
tbody = document.createElement('tbody');
table.appendChild(tbody);
document.querySelectorAll('.card__preview')[2].appendChild(table);

[
  [8, 7, 4, 2, 4, 5, 6, 3],
  [4, 6, 2, 6, 5, 6, 6, 3],
  [3, 5, 4, 1, 4, 4, 8, 7],
  [6, 8, 7, 4, 1, 2, 3, 5],
  [5, 6, 1, 8, 3, 3, 7, 7],
  [8, 3, 8, 4, 8, 8, 1, 2],
  [1, 6, 3, 7, 2, 7, 4, 4],
  [7, 8, 5, 3, 8, 1, 2, 2],
].map(item => {
  const tr = document.createElement('tr');
  item.map(x => {
    const td = document.createElement('td');
    td.innerText = x;
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
});

// Hitori animation
const hitori_tds = document.querySelectorAll('.card__preview')[2].querySelectorAll('td');
const hitori_solution = [
  [
    [],
    [
      5, 12, 3, 1, 10, 8, 16, 17, 19, 22, 24, 26, 28, 29, 30, 31, 32, 35, 41, 46, 48, 50, 52, 56,
      58, 59, 61,
    ],
  ],
  [
    [11, 9, 18, 42, 40],
    [0, 2, 34, 43],
  ],
  [
    [14, 4, 21, 44, 39, 63, 57],
    [55, 62, 49, 36, 45, 20, 6, 13, 15, 25, 60, 47],
  ],
  [
    [33, 27, 7, 37, 54],
    [23, 38, 53],
  ],
  [[51], []],
];

(async function animateHitori() {
  for (const step of hitori_solution) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    step[0].map(pos => {
      const td = hitori_tds[pos];
      td.style.color = '#fff';
      td.style.backgroundColor = '#4169e1';
      td.style.opacity = 0.5;
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    step[1].map(pos => {
      const td = hitori_tds[pos];
      td.style.color = '#fff';
      td.style.backgroundColor = '#ba55d3';
      td.style.opacity = 0.5;
    });
  }

  await new Promise(resolve => setTimeout(resolve, 1000));
  [...hitori_tds].map(td => {
    if (td.style.backgroundColor === 'rgb(186, 85, 211)') {
      td.style.color = '';
      td.style.backgroundColor = '';
      td.style.opacity = 1;
    }
  });

  await new Promise(resolve => setTimeout(resolve, 13000));
  [...hitori_tds].map(td => {
    td.style.color = '';
    td.style.backgroundColor = '';
    td.style.opacity = 1;
  });
  animateHitori();
})();

// Save the cow table
table = document.createElement('table');
tbody = document.createElement('tbody');
table.appendChild(tbody);
document.querySelectorAll('.card__preview')[3].appendChild(table);

[
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
  [1, 0, 0, 1, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
].map(item => {
  const tr = document.createElement('tr');
  item.map(x => {
    const td = document.createElement('td');
    td.style.backgroundImage = +x ? 'url("/img/logic_games/cow.png")' : '';
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
});

// Save the cow animation
const save_the_cow_tds = document.querySelectorAll('.card__preview')[3].querySelectorAll('td');
const save_the_cow_solution = [
  [
    [67, 68],
    [67, 77],
  ],
  [
    [4, 14, 24, 34],
    [40, 41, 42, 43],
  ],
  [
    [8, 18],
    [28, 29],
  ],
  [
    [28, 38],
    [44, 45, 46, 47],
  ],
  [[], [48, 49]],
  [
    [43, 53, 63],
    [70, 71, 72],
  ],
  [[73, 83, 93], []],
  [
    [48, 58],
    [68, 69],
  ],
  [[56, 46], [66]],
  [[66], [73, 74, 75]],
  [[], [76]],
  [[78], [88, 89]],
  [[74], [83]],
  [[85, 95], [84]],
  [[75], []],
  [[88, 98], []],
];

(async function animateSaveTheCow() {
  for (const step of save_the_cow_solution) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    step[0].map(pos => (save_the_cow_tds[pos].style.borderLeft = '1px solid #000'));
    step[1].map(pos => (save_the_cow_tds[pos].style.borderTop = '1px solid #000'));
  }

  await new Promise(resolve => setTimeout(resolve, 8000));
  [...save_the_cow_tds].map(td => (td.style.border = '1px solid #20202050'));
  animateSaveTheCow();
})();

// Sudoku table
table = document.createElement('table');
tbody = document.createElement('tbody');
table.appendChild(tbody);
document.querySelectorAll('.card__preview')[4].appendChild(table);

[
  [0, 0, 6, 0, 4, 0, 0, 9, 7],
  [0, 4, 0, 7, 3, 0, 0, 1, 0],
  [0, 1, 7, 0, 9, 2, 0, 3, 0],
  [6, 0, 0, 0, 7, 0, 0, 8, 0],
  [1, 0, 5, 0, 6, 0, 9, 0, 3],
  [0, 2, 0, 0, 1, 0, 0, 0, 6],
  [0, 5, 0, 9, 8, 0, 1, 6, 0],
  [0, 9, 0, 0, 5, 6, 0, 7, 0],
  [8, 6, 0, 0, 2, 0, 3, 0, 0],
].map((item, i) => {
  const tr = document.createElement('tr');
  item.map((x, j) => {
    const td = document.createElement('td');

    if (0 === i % 3) td.style.borderTop = '1px solid #000';
    if (0 === j % 3) td.style.borderLeft = '1px solid #000';

    td.innerText = x === 0 ? '' : x;
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
});
