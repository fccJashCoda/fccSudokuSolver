const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

'5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
  '568913724342687519197254386685479231219538467734162895926345178473891652851726943';

suite('UnitTests', () => {
  suite('Puzzle string validation', function () {
    test('Logic handles a valid puzzle string of 81 characters', function (done) {
      const puzzle =
        '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';

      assert.equal(solver.validate(puzzle), true);
      done();
    });
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function (done) {
      const puzzle =
        '5aa91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';

      assert.isObject(solver.validate(puzzle));
      assert.deepEqual(solver.validate(puzzle), {
        error: 'Invalid characters in puzzle',
      });
      done();
    });
    test('Logic handles a puzzle string that is not 81 characters in length', function (done) {
      const puzzle =
        '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72.';

      assert.isObject(solver.validate(puzzle));
      assert.deepEqual(solver.validate(puzzle), {
        error: 'Expected puzzle to be 81 characters long',
      });
      done();
    });
  });
  suite('Grid position validation', function () {
    const puzzle =
      '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
    test('Logic handles a valid row placement', function (done) {
      assert.equal(solver.checkRowPlacement(puzzle, 0, 1, 4), true);

      done();
    });
    test('Logic handles an invalid row placement', function (done) {
      assert.equal(solver.checkRowPlacement(puzzle, 0, 1, 7), false);

      done();
    });
    test('Logic handles a valid column placement', function (done) {
      assert.equal(solver.checkColPlacement(puzzle, 0, 1, 7), true);

      done();
    });
    test('Logic handles an invalid column placement', function (done) {
      assert.equal(solver.checkColPlacement(puzzle, 0, 1, 8), false);

      done();
    });
    test('Logic handles a valid region (3x3 grid) placement', function (done) {
      assert.equal(solver.checkRegionPlacement(puzzle, 0, 1, 4), true);

      done();
    });
    test('Logic handles an invalid region (3x3 grid) placement', function (done) {
      assert.equal(solver.checkRegionPlacement(puzzle, 0, 1, 3), false);

      done();
    });
  });
  suite('Solver tests', function () {
    test('Valid puzzle strings pass the solver', function (done) {
      const puzzle =
        '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';

      assert.equal(solver.solve(puzzle), true);
      done();
    });
    test('Invalid puzzle strings fail the solver', function (done) {
      const puzzle =
        '111111111111111111111111111111111111111111111111111111111111111111111111111111111';
      assert.isObject(solver.solve(puzzle));
      assert.deepEqual(solver.solve(puzzle), {
        error: 'Puzzle cannot be solved',
      });
      done();
    });
    test('Solver returns the expected solution for an incomplete puzzle', function (done) {
      const puzzle =
        '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
      const expected =
        '568913724342687519197254386685479231219538467734162895926345178473891652851726943';

      assert.equal(solver.solve(puzzle), true);
      assert.isString(solver.solution);
      assert.equal(solver.solution, expected);
      done();
    });
  });
});
