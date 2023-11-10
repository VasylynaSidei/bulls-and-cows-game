var assert = require('assert');
var centerText = require('../');

function runCenterText() {
  before(function () {
    this.actual = centerText(this.file.input, {columns: this.file.columns});
  });
}

describe('An even string in an even amount of columns', function () {
  before(function () {
    this.file = require('./test-files/even-in-even');
  });

  describe('when centered', function () {
    runCenterText();

    it('generates centered text', function () {
      assert.strictEqual(this.file.expected, this.actual);
    });
  });
});

describe('An ANSI colored string', function () {
  before(function () {
    this.file = require('./test-files/ansi-colors');
  });

  describe('when centered', function () {
    runCenterText();

    it('generates colored centered text', function () {
      assert.strictEqual(this.file.expected, this.actual);
    });
  });
});

// Automate the remaining test cases
var glob = require('glob');
var remainingFiles = glob
                       .sync('*.js', {cwd: __dirname + '/test-files'})
                       .filter(function (filename) {
                         return !filename.match(/ansi-colors|even-in-even/);
                       });
remainingFiles.forEach(function (filename) {
  describe(filename, function () {
    before(function () {
      this.file = require(__dirname + '/test-files/' + filename);
    });
    runCenterText();

    it('generates centered text', function () {
      assert.strictEqual(this.file.expected, this.actual);
    });
  });
});
