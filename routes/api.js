'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    if (!req.body.puzzle || !req.body.coordinate || !req.body.value) {
      return res.json({ error: 'Required field(s) missing' });
    }

    const coordinate = req.body.coordinate.toLowerCase();
    const coordRgx = /^[a-i][1-9]$/;
    if (!coordRgx.test(coordinate)) {
      return res.json({ error: 'Invalid coordinate' });
    }

    const valueRgx = /^[1-9]$/;
    if (!valueRgx.test(req.body.value)) {
      return res.json({ error: 'Invalid value' });
    }

    const conflict = [];
    const [y, x] = coordinate.split('');
    const value = Number(req.body.value);

    const yDictionary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const yTranslation = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const col = Number(x) - 1;
    const row = yTranslation[yDictionary.indexOf(y)];

    const validate = solver.validate(req.body.puzzle);
    if (validate.error) {
      return res.json({ error: validate.error });
    }

    if (!solver.checkRowPlacement('', row, col, value)) {
      conflict.push('row');
    }
    if (!solver.checkColPlacement('', row, col, value)) {
      conflict.push('column');
    }
    if (!solver.checkRegionPlacement('', row, col, value)) {
      conflict.push('region');
    }

    if (conflict.length) {
      return res.json({ valid: false, conflict });
    }

    res.json({ valid: true });
  });

  app.route('/api/solve').post((req, res) => {
    if (!req.body.puzzle) {
      return res.json({ error: 'Required field missing' });
    }

    const validate = solver.validate(req.body.puzzle);
    if (validate.error) {
      return res.json({ error: validate.error });
    }

    if (!solver.solve()) {
      return res.json({ error: 'Puzzle cannot be solved' });
    }

    res.json({ solution: solver.solution });
  });
};
