export const postTranscript = async (request, reply) => {
  return reply
    .status(200)
    .send({
      status: 'WIP',
    });
}