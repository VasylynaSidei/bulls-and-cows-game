
var cliFormat = require('./bin/index.js');
var colors = require('colors');
var chalk = require('chalk');


var input = 'The quick brown fox jumped over the lazy dog and the cow said moo to you too.';
var result = cliFormat.wrap(input, { width: 20, justify: true });
console.log(result);