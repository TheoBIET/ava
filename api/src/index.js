const Fastify = require('fastify');
const { FASTIFY_CONFIG: CONFIG, ROUTES } = require('./constants/fastify');

const statusRoutes = require('./routes/status');
const transcriptRoutes = require('./routes/transcript');
const completionRoutes = require('./routes/completion');

const api = Fastify({
  logger: CONFIG,
});

api.register(async (scope) => {
  scope.register(statusRoutes, { prefix: ROUTES.STATUS.PREFIX });
  scope.register(transcriptRoutes, { prefix: ROUTES.TRANSCRIPT.PREFIX });
  scope.register(completionRoutes, { prefix: ROUTES.COMPLETION.PREFIX });
}, { prefix: CONFIG.PREFIX });

api.listen({ port: CONFIG.PORT, host: CONFIG.HOST }, (err, address) => {
  if (err) {
    api.log.error(err);
    process.exit(1);
  }

  api.log.info(`🚀 Fastify server listening on ${address}`);
});