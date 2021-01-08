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

  checkRowPlacement(puzzleString, row, col, value) {
    // const rowNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    // const rowNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // this conversion should be handled in the router

    if (this.grid[row][col] !== 0) {
      return false;
    }
    if (this.grid[row].indexOf(value) !== -1) {
      return false;
    }
    return true;
  }

  checkColPlacement(puzzleString, row, col, value) {
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

  solve(puzzleString) {
    if (!this.grid) {
      const valid = this.validate(puzzleString);
      if (valid.error) {
        return valid.error;
      }
    }
    console.log(this.grid);

    const possible = (row, col, value) => {
      if (
        this.checkRowPlacement('', row, col, value) &&
        this.checkColPlacement('', row, col, value) &&
        this.checkRegionPlacement('', row, col, value)
      ) {
        return true;
      }
      return false;
    };

    const [row, col] = this.nextEmptySpot();

    if (row === -1) {
      return true;
    }

    for (let v = 1; v < 10; v++) {
      if (possible(row, col, v)) {
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
