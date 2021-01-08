'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    // const rowNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    // const rowNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // this conversion should be handled in the router
  });

  app.route('/api/solve').post((req, res) => {});
};
