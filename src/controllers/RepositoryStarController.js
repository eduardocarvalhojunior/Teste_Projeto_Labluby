const User = require('../models/User');
const Repository = require('../models/Repository');

module.exports = {
  async create(req, res) {
    const { id, repositoryId } = req.params;
    const { userId } = req.body;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const repository = await Repository.findOne({
      where: { id: repositoryId, user_id: id },
    });

    repository.addStars(userId);

    return res.json(repository);
  },

  async delete(req, res) {
    const { id, repositoryId } = req.params;
    const { userId } = req.body;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const repository = await Repository.findOne({
      where: { id: repositoryId, user_id: id },
    });

    repository.removeStars(userId);

    return res.json(repository);
  },
};
