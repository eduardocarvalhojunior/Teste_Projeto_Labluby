const User = require('../models/User');
const Repository = require('../models/Repository');

module.exports = {
  async create(req, res) {
    const { id } = req.params;
    const { name, description, public: publicRepo } = req.body;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const slug = `${user.username}/${name}`;

    const repository = await Repository.create({
      name,
      description,
      public: publicRepo,
      slug,
      user_id: id,
    });

    return res.json(repository);
  },

  async findOne(req, res) {
    const { id, repositoryId } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const repository = await Repository.findOne({
      where: { id: repositoryId, user_id: id },
      include: [
        {
          model: User,
          as: 'stars',
          through: { attributes: [] },
        },
      ],
    });

    if (!repository) {
      return res.status(400).json({ error: 'Repository not found' });
    }

    return res.json({
      name: repository.name,
      description: repository.description,
      public: repository.public,
      slug: repository.slug,
      stars: repository.stars.length,
    });
  },

  async findAll(req, res) {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const repositories = await Repository.findAll({
      where: { user_id: id },
      include: [
        {
          model: User,
          as: 'stars',
          through: { attributes: [] },
        },
      ],
    });

    if (!repositories) {
      return res.status(400).json({ error: 'Repository not found' });
    }

    const repositoriesFormated = [];

    repositories.forEach(repository => {
      repositoriesFormated.push({
        name: repository.name,
        description: repository.description,
        public: repository.public,
        slug: repository.slug,
        stars: repository.stars.length,
      });
    });

    return res.json({
      count: repositories.length,
      data: repositoriesFormated,
    });
  },

  async update(req, res) {
    const { id, repositoryId } = req.params;
    const newInfos = req.body;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    await Repository.update(newInfos, {
      where: { id: repositoryId, user_id: id },
      include: [
        {
          model: User,
          as: 'stars',
          through: { attributes: [] },
        },
      ],
    });

    const repository = await Repository.findOne({
      where: { id: repositoryId, user_id: id },
      include: [
        {
          model: User,
          as: 'stars',
          through: { attributes: [] },
        },
      ],
    });

    if (!repository) {
      return res.status(400).json({ error: 'Repository not found' });
    }

    return res.json({
      name: repository.name,
      description: repository.description,
      public: repository.public,
      slug: repository.slug,
      stars: repository.stars.length,
    });
  },

  async delete(req, res) {
    const { id, repositoryId } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const repository = await Repository.findOne({
      where: { id: repositoryId },
    });

    if (!repository) {
      return res.status(400).json({ error: 'Repository not found' });
    }

    await Repository.destroy({
      where: { id: repositoryId },
    });

    return res.json({ deleted: true });
  },
};
