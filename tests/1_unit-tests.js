const { AssertionError } = require('chai');
const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('UnitTests', () => {
  suite('Puzzle string validation', function () {
    test('Logic handles a valid puzzle string of 81 characters', function (done) {
      const puzzle =
        '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

      assert.equal(solver.validate(puzzle), true);
      done();
    });
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function (done) {
      const puzzle =
        '1.5.a2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

      assert.isObject(solver.validate(puzzle));
      assert.deepEqual(solver.validate(puzzle), {
        error: 'Invalid characters in puzzle',
      });
      done();
    });
    test('Logic handles a puzzle string that is not 81 characters in length', function (done) {
      const puzzle =
        '1.5.a2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

      assert.isObject(solver.validate(puzzle));
      assert.deepEqual(solver.validate(puzzle), {
        error: 'Expected puzzle to be 81 characters long',
      });
      done();
    });
  });
  suite('Grid position validation', function () {
    const puzzle =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    test('Logic handles a valid row placement', function (done) {
      assert.equal(solver.checkRowPlacement(puzzle, 0, 0, 2), true);

      done();
    });
    test('Logic handles an invalid row placement', function (done) {
      assert.equal(solver.checkRowPlacement(puzzle, 0, 2, 5), false);

      done();
    });
    test('Logic handles a valid column placement', function (done) {
      assert.equal(solver.checkRowPlacement(puzzle, 0, 1, 6), true);

      done();
    });
    test('Logic handles an invalid column placement', function (done) {
      assert.equal(solver.checkRowPlacement(puzzle, 0, 1, 5), false);

      done();
    });
    test('Logic handles a valid region (3x3 grid) placement', function (done) {
      assert.equal(solver.checkRowPlacement(puzzle, 0, 0, 6), true);

      done();
    });
    test('Logic handles an invalid region (3x3 grid) placement', function (done) {
      assert.equal(solver.checkRowPlacement(puzzle, 0, 0, 9), false);

      done();
    });
  });
  suite('Solver tests', function () {
    test('Valid puzzle strings pass the solver', function (done) {
      const puzzle =
        '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

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
    test('Solver returns the the expected solution for an incomplete puzzzle', function (done) {
      const puzzle =
        '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      const expected =
        '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

      assert.equal(solver.solve(puzzle), true);
      assert.isString(solver.solution);
      assert.equal(solver.solution, expected);
      done();
    });
  });
});
