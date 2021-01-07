class SudokuSolver {
  validate(puzzleString) {
    if (!puzzleString.length === 81) {
      return { error: 'Expected puzzle to be 81 characters long' };
    }

    const regex = /^[.1-9]*$/;
    if (!regex.test(puzzleString)) {
      return { error: 'Invalid characters in puzzle' };
    }

    const preGrid = puzzleString.replaceAll('.', '0');
    const regex = /[0-9]{9}/g;
    const rows = preGrid.match(regex);
    this.grid = rows.map(row.split('').map((char) => Number(char)));

    return true;
  }
  checkRowPlacement(puzzleString, row, column, value) {
    const regex = /[.1-9]{9}/g;

    const rowNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const rowNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const y = rowNum[rowNames.indexOf(row.toLowerCase())];
    const rows = puzzleString.match(regex);

    if (rows[y].indexOf(value) !== -1) {
      return false;
    }

    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    const regex = /[.1-9]{9}/g;
    const rows = puzzleString.match(regex);
    const x = column - 1;
    const columns = Array.from(Array(9), () => '');

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < columns.length; j++) {
        columns[j] += rows[i][j];
      }
    }

    if (columns[x].indexOf(value) !== -1) {
      return false;
    }

    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const regex = /[.1-9]{9}/g;
    const rows = puzzleString.match(regex);
    const regions = Array.from(Array(9), () => '');
    let regionRow;
    let regionCol;
    let region;

    if (row === 'a' || row === 'b' || row === 'c') {
      regionRow = 1;
    } else if (row === 'd' || row === 'e' || row === 'f') {
      regionRow = 2;
    } else {
      regionRow = 3;
    }

    if (column === 1 || column === 2 || column === 3) {
      regionCol = 1;
    } else if (column === 4 || column === 5 || column === 6) {
      regionCol = 2;
    } else {
      regionCol = 3;
    }

    region = regionRow * regionCol - 1;

    rows.forEach((line, i) => {
      const rgx = /[.1-9]{3}/g;
      const currentLines = line.match(rgx);
      if (i < 3) {
        for (let j = 0; j < regions.length - 6; j++) {
          regions[j] += currentLines[j];
        }
      } else if (i < 6) {
        for (let j = 3; j < regions.length - 3; j++) {
          regions[j] += currentLines[j - 3];
        }
      } else {
        for (let j = 6; j < regions.length; j++) {
          regions[j] += currentLines[j - 6];
        }
      }
    });

    if (regions[region].indexOf(value) !== -1) {
      return false;
    }
    return true;
  }

  solve(puzzleString) {
    if (!this.validate(puzzleString)) {
    }
  }

  // slow but steady: backtracking algorythm;

  // most efficient:
  // https://www.cs.mcgill.ca/~aassaf9/python/sudoku.txt
  // knut's algorythm x
}

module.exports = SudokuSolver;
