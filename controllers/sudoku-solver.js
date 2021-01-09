class SudokuSolver {
  validate(puzzleString) {
    if (!puzzleString.length === 81) {
      return { error: 'Expected puzzle to be 81 characters long' };
    }

    if (puzzleString.indexOf('.') === -1) {
      return { error: 'Puzzle cannot be solved' };
    }

    const regex = /^[.1-9]*$/;
    if (!regex.test(puzzleString)) {
      return { error: 'Invalid characters in puzzle' };
    }

    this.grid = this.buildGrid(puzzleString);

    return true;
  }

  nextEmptySpot() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        if (this.grid[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  }

  buildGrid(puzzleString) {
    let grid;
    const preGrid = puzzleString.replaceAll('.', '0');
    const regex = /[0-9]{9}/g;
    const rows = preGrid.match(regex);
    grid = rows.map((row) => row.split('').map((char) => Number(char)));
    return grid;
  }

  checkRowPlacement(puzzleString, row, col, value) {
    if (puzzleString) {
      this.validate(puzzleString);
    }

    if (this.grid[row][col] !== 0) {
      return false;
    }
    if (this.grid[row].indexOf(value) !== -1) {
      return false;
    }
    return true;
  }

  checkColPlacement(puzzleString, row, col, value) {
    if (puzzleString) {
      this.validate(puzzleString);
    }

    if (this.grid[row][col] !== 0) {
      return false;
    }

    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i][col] === value) {
        return false;
      }
    }

    return true;
  }

  checkRegionPlacement(puzzleString, row, col, value) {
    if (puzzleString) {
      this.validate(puzzleString);
    }

    const rowRegion = Math.floor(row / 3) * 3;
    const colRegion = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.grid[rowRegion + i][colRegion + j] === value) {
          return false;
        }
      }
    }
    return true;
  }

  checkPossibility(row, col, value) {
    if (
      this.checkRowPlacement('', row, col, value) &&
      this.checkColPlacement('', row, col, value) &&
      this.checkRegionPlacement('', row, col, value)
    ) {
      return true;
    }
    return false;
  }

  solve(puzzleString) {
    if (puzzleString) {
      const valid = this.validate(puzzleString);
      if (valid.error) {
        return valid.error;
      }
    }

    const [row, col] = this.nextEmptySpot();

    if (row === -1) {
      this.solution = this.grid.map((arr) => arr.join('')).join('');
      return true;
    }

    for (let v = 1; v < 10; v++) {
      if (this.checkPossibility(row, col, v)) {
        this.grid[row][col] = v;
        if (this.solve()) {
          return true;
        }
        this.grid[row][col] = 0;
      }
    }
    return false;
  }
}

module.exports = SudokuSolver;
