import fastify from 'fastify';
import fastify_static from 'fastify-static';
import path from 'path';
import fs from 'fs';
import routes from './api/routes';

const server = fastify({
  ignoreTrailingSlash: true
});

server.register(routes, { fs, path });
server.register(fastify_static, {
  root: path.resolve('./static'),
  prefix: '/static/'
});

server.listen(8080);