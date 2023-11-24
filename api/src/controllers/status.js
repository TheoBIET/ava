import { Status } from '../constants/locales.js';
import pkg from '../../../package.json' assert { type: 'json' };

export const getStatus = async (_, reply) => {
  return reply
    .status(200)
    .send({
      status: Status.OK,
      version: pkg.version,
    });
}