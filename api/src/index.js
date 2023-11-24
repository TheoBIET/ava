import Fastify from 'fastify';
import { FASTIFY_CONFIG as CONFIG, ROUTES } from './constants/fastify.js';

import statusRoutes from './routes/status.js';
import transcriptRoutes from './routes/transcript.js';

const fastify = Fastify({
  logger: CONFIG.LOGGER,
});

fastify.register(async (scope) => {
  scope.register(statusRoutes, { prefix: ROUTES.STATUS.PREFIX });
  scope.register(transcriptRoutes, { prefix: ROUTES.UTTERANCE.PREFIX });
}, { prefix: CONFIG.PREFIX });

fastify.listen({ port: CONFIG.PORT, host: CONFIG.HOST }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`🚀 Fastify server listening on ${address}`);
});