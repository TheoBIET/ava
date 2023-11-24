import { getStatus } from '../controllers/status.js';

export default async function routes(fastify) {
  fastify.get('/', getStatus);
}