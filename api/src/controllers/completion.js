const postCompletion = async (_, reply) => {
  return reply
    .status(200)
    .send({
      status: 'WIP',
    });
}

module.exports = {
  postCompletion,
}