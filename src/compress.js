const sharp = require('sharp');
const bypass = require('./bypass');

async function compress(request, reply, input) {
  try {
    const format = request.params.webp ? 'webp' : 'jpeg';

    const { data, info } = await sharp(input)
      .grayscale(request.params.grayscale)
      .toFormat(format, {
        quality: request.params.quality,
        progressive: true,
        optimizeScans: true
      })
      .toBuffer();

    reply.header('content-type', `image/${format}`);
    reply.header('content-length', info.size);
    reply.header('x-original-size', request.params.originSize);
    reply.header('x-bytes-saved', request.params.originSize - info.size);
    reply.status(200).send(data);
  } catch (err) {
    console.error('Error compressing image:', err);
    bypass(request, reply, input);
  }
}

module.exports = compress;
