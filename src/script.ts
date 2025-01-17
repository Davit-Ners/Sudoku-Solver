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

