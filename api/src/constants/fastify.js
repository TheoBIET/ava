const FASTIFY_CONFIG = {
  LOGGER: true,
  PORT: 3000,
  HOST: '0.0.0.0',
  PREFIX: 'api/v1',
};

const ROUTES = {
  STATUS: {
    PREFIX: '/status'
  },
  TRANSCRIPT: {
    PREFIX: '/transcript',
  },
  COMPLETION: {
    PREFIX: '/completion',
  },
};

module.exports = {
  FASTIFY_CONFIG,
  ROUTES,
};