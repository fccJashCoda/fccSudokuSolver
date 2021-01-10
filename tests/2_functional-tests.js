const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('/api/solve', function () {
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle:
            '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, {
            solution:
              '568913724342687519197254386685479231219538467734162895926345178473891652851726943',
          });
          done();
        });
    });
    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, {
            error: 'Required field missing',
          });
          done();
        });
    });
    test('Solve a puzzle with invalid characters: POST request to /api/solve', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle:
            '5a.91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, {
            error: 'Invalid characters in puzzle',
          });
          done();
        });
    });
    test('Solve a puzzle with incorrect length: POST request to /api/solve', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle:
            '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3..',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, {
            error: 'Expected puzzle to be 81 characters long',
          });
          done();
        });
    });
    test('Solve a puzzle that cannot be solved: POST request to /api/solve', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle:
            '111111111111111111111111111111111111111111111111111111111111111111111111111111111',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, {
            error: 'Puzzle cannot be solved',
          });
          done();
        });
    });
  });

  suite('/api/check', function () {
    test('Check a puzzle placement with all fields: POST request to /api/check', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
          coordinate: 'a2',
          value: '4',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, { valid: true });
          done();
        });
    });
    test('Check a puzzle placement with single placement conflict: POST request to /api/check', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
          coordinate: 'a2',
          value: '1',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, { valid: false, conflict: ['row'] });
          done();
        });
    });
    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
          coordinate: 'a2',
          value: '3',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, {
            valid: false,
            conflict: ['row', 'region'],
          });
          done();
        });
    });
    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
          coordinate: 'a2',
          value: '9',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, {
            valid: false,
            conflict: ['row', 'column', 'region'],
          });
          done();
        });
    });
    test('Check a puzzle placement with missing required fields: POST request to /api/check', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
          coordinate: 'a2',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, { error: 'Required field(s) missing' });
          done();
        });
    });
    test('Check a puzzle placement with invalid characters: POST request to /api/check', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
          coordinate: 'a2',
          value: 'a',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, { error: 'Invalid value' });
          done();
        });
    });
    test('Check a puzzle placement with incorrect length: POST request to /api/check', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
          coordinate: 'a2',
          value: '11',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, { error: 'Invalid value' });
          done();
        });
    });
    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
          coordinate: 'a,2',
          value: '1',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, { error: 'Invalid coordinate' });
          done();
        });
    });
    test('Check a puzzle placement with invalid placement value: POST request to /api/check', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
          coordinate: 'z0',
          value: '1',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, { error: 'Invalid coordinate' });
          done();
        });
    });
  });
});
