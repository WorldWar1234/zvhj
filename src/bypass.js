function bypass(req, res, buffer) {
  res.setHeader('x-proxy-bypass', 0);
  res.setHeader('content-length', buffer.length);
  res.status(200).send(buffer);
}

module.exports = bypass;
