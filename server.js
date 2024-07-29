#!/usr/bin/env node
'use strict';
const Fastify = require('fastify');
const authenticate = require('./src/authenticate');
const params = require('./src/params');
const proxy = require('./src/proxy');

const app = Fastify({ logger: true });

app.get('/', {
  handler: [authenticate, params, proxy] // List middleware in an array
});
app.get('/favicon.ico', (_, reply) => reply.code(204).send());

app.listen({ port: process.env.PORT || 8080 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
