const path = require('path');
const fs = require('fs');
const User = require('../models/User');

module.exports = {
  async updateAvatar(req, res) {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (user.avatar) {
      const userAvatarFilePath = path.resolve(
        __dirname,
        '..',
        '..',
        'tmp',
        user.avatar,
      );

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    // req.file.filename
    user.avatar = req.file.filename;

    return res.json(user);
  },

  async create(req, res) {
    const { name, username, email, avatar, bio, location } = req.body;

    const user = await User.create({
      name,
      username,
      email,
      avatar,
      bio,
      location,
    });

    return res.json(user);
  },

  async findOne(req, res) {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'follower',
          through: { attributes: [] },
        },
        {
          model: User,
          as: 'following',
          through: { attributes: [] },
        },
        {
          association: 'repositories',
          include: { model: User, as: 'stars', through: { attributes: [] } },
        },
      ],
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      followers: user.follower.length,
      followings: user.following.length,
      repositories: user.repositories.length,
      bio: user.bio,
    });
  },

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    await User.destroy({
      where: { id },
    });

    return res.json({ deleted: true });
  },

  async update(req, res) {
    const { id } = req.params;
    const newInfos = req.body;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    await User.update(newInfos, { where: { id } });

    const userUpdated = await User.findOne({ where: { id } });

    return res.json(userUpdated);
  },
};
