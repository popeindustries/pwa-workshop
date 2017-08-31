'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function readFile(filepath) {
  filepath = path.resolve(filepath);
  try {
    return fs.readFileSync(filepath, 'utf8');
  } catch (err) {
    return '';
  }
}