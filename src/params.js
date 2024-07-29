function params(request, reply, next) {
  const { url } = request.query;
  if (!url) {
    return reply.send('bandwidth-hero-proxy'); // Send response directly from middleware
  }

  request.params = request.params || {}; // Ensure params object exists
  request.params.url = decodeURIComponent(url);
  request.params.webp = !request.query.jpeg;
  request.params.grayscale = request.query.bw != 0;
  request.params.quality = parseInt(request.query.l, 10) || DEFAULT_QUALITY;

  next();
}

module.exports = params;
