const postTranscript = async (_, reply) => {
  return reply
    .status(200)
    .send({
      status: 'WIP',
    });
}

module.exports = {
  postTranscript,
}