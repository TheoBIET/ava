const { postTranscript } = require('../controllers/transcript');

const routes = async (api) => {
  api.post('/', postTranscript);
}

module.exports = routes;