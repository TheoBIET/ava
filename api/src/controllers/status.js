const { STATUS } = require('../constants/locales');
const pkg = require('../../../package.json');

const getStatus = async (_, reply) => {
  return reply
    .status(200)
    .send({
      status: STATUS.OK,
      version: pkg.version,
    });
}

module.exports = {
  getStatus,
}