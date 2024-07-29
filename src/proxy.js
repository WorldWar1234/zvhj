const shouldCompress = require('./shouldCompress');
const compress = require('./compress');
const bypass = require('./bypass');

function handler(request, reply, buffer) {
  // Logic to generate content or fetch from a data source
  // Replace this placeholder with your actual content generation logic

  if (shouldCompress(request)) {
    compress(request, reply, buffer);
  } else {
    bypass(request, reply, buffer);
  }
}

module.exports = { handler, shouldCompress, compress, bypass };
