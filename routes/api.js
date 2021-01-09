'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    const xInput = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const xTranslation = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    // const col =
    // const row =
    // const row = xTranslation[xInput.indexOf(req.body.row)]
    // const col = Number(req.body.col) - 1

    // reminder for tomorrow: make sure that req.body forwards the puzzleString
    // solver.validate(req.puzzle);
    // solver.checkPossibility(row, col, value);
    console.log(req.body);
    res.json({ message: 'work in progress' });
  });

  app.route('/api/solve').post((req, res) => {
    res.json({ message: 'work in progress' });
  });
};
