"use strict";
// Resolveur de sudoku graçe au backtracking (brute force)
// Reuperation DOM
const grilleSudoku = document.querySelector('#gilleSudoku');
const startBtn = document.getElementById('start');
// Const et Let
const tabSudoku = [];
let sudokuGridEx = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];
// Variable juste pou rvoir le nombre de rafraichissement effectués
let solution = 0;
// Fonction pour creer la grille de sudoku dans le DOM
function creerGrile() {
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < 9; j++) {
            const block = document.createElement('div');
            block.className = 'emptyBlock';
            block.id = `${i}-${j}`;
            const input = document.createElement('input');
            input.className = 'inputNombre';
            input.id = `i${i}-${j}`;
            input.type = 'number';
            if (j == 2 || j == 5) {
                block.style.borderRight = '1px solid #ffffff';
            }
            if (i == 2 || i == 5) {
                block.style.borderBottom = '1px solid #ffffff';
            }
            block.append(input);
            row.append(block);
        }
        grilleSudoku.append(row);
    }
}
// Fonctoin pour recuperer les chiffres entrés dans la grille de sudoku par l'utilisateur et les affichés dans une balise 'p'
function recupererInputs() {
    for (let i = 0; i < 9; i++) {
        tabSudoku.push([]);
        for (let j = 0; j < 9; j++) {
            const input = document.getElementById(`i${i}-${j}`);
            const p = document.createElement('p');
            p.id = `p${i}-${j}`;
            if (!isNaN(input.valueAsNumber) && input.valueAsNumber > 0 && input.valueAsNumber < 10) {
                tabSudoku[i].push(input.valueAsNumber);
                p.textContent = input.valueAsNumber.toString();
                input.remove();
                document.getElementById(`${i}-${j}`)?.append(p);
            }
            else {
                tabSudoku[i].push(0);
                p.textContent = '°';
                input.remove();
                document.getElementById(`${i}-${j}`)?.append(p);
            }
        }
    }
}
// Fonction poour checker si le chiffre peut etre mis dans sa ligne
function isAllowedLigne(tab, nb, row, col) {
    for (let j = 0; j < 9; j++) {
        if (j != col && tab[row][j] == nb) {
            return false;
        }
    }
    return true;
}
// Fonction poour checker si le chiffre peut etre mis dans sa colonne
function isAllowedColonne(tab, nb, row, col) {
    for (let j = 0; j < 9; j++) {
        if (j != row && tab[j][col] == nb) {
            return false;
        }
    }
    return true;
}
// Fonction poour checker si le chiffre peut etre mis dans son carré 3*3
function isAllowedSquare(tab, nb, row, col) {
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tab[startRow + i][startCol + j] == nb) {
                return false;
            }
        }
    }
    return true;
}
// Fonction pour checker si le chiffre est valide dans tout le sudoku
function isAllowed(tab, nb, row, col) {
    return isAllowedLigne(tab, nb, row, col) && isAllowedColonne(tab, nb, row, col) && isAllowedSquare(tab, nb, row, col);
}
// Fonction pour avoir les cases vide à traiter de la grille de sudoku
function getEmptyCells(tab) {
    const emptyCells = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (tab[i][j] == 0) {
                emptyCells.push([i, j]);
            }
        }
    }
    return emptyCells;
}
// Fonction pour résoudre le sudoku en Backtracking
async function solveSudoku(tab) {
    const emptyCells = getEmptyCells(tab);
    if (emptyCells.length === 0) {
        return true;
    }
    const [row, col] = emptyCells[0];
    for (let num = 1; num <= 9; num++) {
        if (isAllowed(tab, num, row, col)) {
            tab[row][col] = num;
            await delay(0.1);
            miseAJourDOM(tab);
            if (await solveSudoku(tab)) {
                return true;
            }
            tab[row][col] = 0;
        }
    }
    return false;
}
// Fonction pour placer un delay
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Fonction pour mettre a jour l'affichage de la grille de sudoku dans le DOM
function miseAJourDOM(tab) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const p = document.getElementById(`p${i}-${j}`);
            if (tab[i][j] != 0) {
                p.textContent = tab[i][j].toString();
            }
        }
    }
    solution++;
}
creerGrile();
// Fonction principale pour lancer la résolution
startBtn.addEventListener('click', function () {
    recupererInputs();
    solveSudoku(tabSudoku);
});
