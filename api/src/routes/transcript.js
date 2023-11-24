import { postTranscript } from "../controllers/transcript.js";

export default async function routes(fastify) {
  fastify.post('/', postTranscript);
}