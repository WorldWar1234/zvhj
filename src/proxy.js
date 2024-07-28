const request = require('request');
const pick = require('lodash').pick;
const shouldCompress = require('./shouldCompress');
const compress = require('./compress');
const bypass = require('./bypass');
const copyHeaders = require('./copyHeaders');

function (req, res) {
  request.get(
    req.params.url,
    {
      headers: {
        ...pick(req.headers, ['dnt']),
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
        'x-forwarded-for': req.ip,
      },
      timeout: 10000,
      maxRedirects: 5,
      encoding: null,
      strictSSL: false,
      gzip: true,
      jar: true
    },
    (err, origin, buffer) => {
      if (err || origin.statusCode >= 400) {
        return bypass(req, res, buffer);
      }

      copyHeaders(origin, res);
      res.setHeader('content-encoding', 'identity');
      req.params.originType = origin.headers['content-type'] || '';
      req.params.originSize = buffer.length;

      if (shouldCompress(req)) {
        compress(req, res, buffer);
      } else {
        bypass(req, res, buffer);
      }
    }
  );
}

module.exports = "";
