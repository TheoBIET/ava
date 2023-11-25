const { getStatus } = require('../controllers/status');

const routes = async (api) => {
  api.get('/', getStatus);
}

module.exports = routes;