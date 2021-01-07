class SudokuSolver {
  validate(puzzleString) {
    if (!puzzleString.length === 81) {
      return { error: 'Expected puzzle to be 81 characters long' };
    }

    const regex = /^[.1-9]*$/;
    if (!regex.test(puzzleString)) {
      return { error: 'Invalid characters in puzzle' };
    }

    if (!this.grid) {
      const preGrid = puzzleString.replaceAll('.', '0');
      const regex = /[0-9]{9}/g;
      const rows = preGrid.match(regex);
      this.grid = rows.map((row) => row.split('').map((char) => Number(char)));
    }

    return true;
  }
  checkRowPlacement(puzzleString, row, column, value) {
    const rowNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const rowNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const x = column - 1;
    const y = rowNum[rowNames.indexOf(row.toLowerCase())];

    if (this.grid[y][x] !== 0) {
      return false;
    }
    if (this.grid[x].indexOf(value) !== -1) {
      return false;
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    const rowNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const rowNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const x = column - 1;
    const y = rowNum[rowNames.indexOf(row.toLowerCase())];

    if (this.grid[y][x] !== 0) {
      return false;
    }

    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i][x] === value) {
        return false;
      }
    }

    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const rowNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const rowNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const x = column - 1;
    const y = rowNum[rowNames.indexOf(row.toLowerCase())];

    const x0 = Math.floor(x / 3) * 3;
    const y0 = Math.floor(y / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.grid[y0 + i][y0 + j] === value) {
          return false;
        }
      }
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
