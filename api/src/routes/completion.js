const { postCompletion } = require('../controllers/completion');

const completion = async (api) => {
  api.post('/', postCompletion);
}

module.exports = completion;