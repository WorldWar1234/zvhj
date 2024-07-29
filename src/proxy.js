const shouldCompress = require('./shouldCompress');
const compress = require('./compress');
const bypass = require('./bypass');

function handler(req, res) {
  
  if (shouldCompress(req)) {
    compress(req, res, buffer);
  } else {
    bypass(req, res, buffer);
  }
}

module.exports = handler;
