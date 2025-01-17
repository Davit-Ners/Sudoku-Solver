// Reuperation DOM
const grilleSudoku: HTMLDivElement = document.querySelector('#gilleSudoku') as HTMLDivElement;
const startBtn: HTMLButtonElement = document.getElementById('start') as HTMLButtonElement;

// Const et Let
const tabSudoku: number[][] = [];
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

function creerGrile(): void {
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

            block.append(input);
            row.append(block);
        }
        grilleSudoku.append(row);
    }
}

function recupererInputs(): void {
    for (let i = 0; i < 9; i++) {
        tabSudoku.push([]);
        for (let j = 0; j < 9; j++) {
            const input: HTMLInputElement = document.getElementById(`i${i}-${j}`) as HTMLInputElement;
            const p: HTMLParagraphElement = document.createElement('p');
            p.id = `p${i}-${j}`;

            if (!isNaN(input.valueAsNumber) && input.valueAsNumber > 0 && input.valueAsNumber < 10) {
                tabSudoku[i].push(input.valueAsNumber);
                p.textContent = input.valueAsNumber.toString();
                input.remove();
                document.getElementById(`${i}-${j}`)?.append(p);
            }
            else {
                tabSudoku[i].push(0);
                p.textContent = '';
                input.remove();
                document.getElementById(`${i}-${j}`)?.append(p);
            }
        }
    }
}

function checkLigne(tab: number[][]): boolean {
    for (let ligne of tab) {
        let nbDispo = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let block of ligne) {
            if (nbDispo.indexOf(block) != -1) {
                nbDispo[nbDispo.indexOf(block)] = 0;
            }
            else {
                return false;
            }
        }
    }
    return true;
}

function checkColonne(tab: number[][]): boolean {
    for (let i = 0; i < 9; i++) {
        const nbDispo = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let j = 0; j < 9; j++) {
            if (nbDispo.indexOf(tab[j][i]) != -1) {
                nbDispo[nbDispo.indexOf(tab[j][i])] = 0;
            }
            else {
                return false;
            }
        }
    }
    return true;
}

function checkCarre(tab: number[][]): boolean {
    let lig = 0;
    for (let count = 0; count < 3; count++) {
        let col = 0;
        for (let i = 0; i < 3; i++) {
            const nbDispo = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (let j = 0 + lig; j < 3 + lig; j++) {
                for (let k = 0 + col; k < 3 + col; k++) {
                    if (nbDispo.indexOf(tab[j][k]) != -1) {
                        nbDispo[nbDispo.indexOf(tab[j][k])] = 0;
                    }
                    else {
                        return false;
                    }
                }
            }
            col += 3;
        }
        lig += 3;
    }
    return true;
}

function checkSudoku(tab: number[][]): boolean {
    return checkCarre(tab) && checkColonne(tab) && checkLigne(tab);
}

function isAllowedLigne(tab: number[][], nb: number, row: number, col: number): boolean {
    for (let j = 0; j < 9; j++) {
        if (j != col && tab[row][j] == nb) {
            return false
        }
    }
    return true;
}

function isAllowedColonne(tab: number[][], nb: number, row: number, col: number): boolean {
    for (let j = 0; j < 9; j++) {
        if (j != row && tab[col][j] == nb) {
            return false
        }
    }
    return true;
}

function isAllowedSquare(tab: number[][], nb: number, row: number, col: number): boolean {
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tab[startRow + i][startCol + j] == nb) {
                return false
            }
        }
    }
    return true;
}

function isAllowed(tab: number[][], nb: number, row: number, col: number): boolean {
    return isAllowedLigne(tab, nb, row, col) && isAllowedColonne(tab, nb, row, col) && isAllowedSquare(tab, nb, row, col);
}

creerGrile();

// const solveSudoku(): void {
//     let isSolved = false;
//     let position = [0, 0];
//     while (!isSolved) {
        
//     }
// }