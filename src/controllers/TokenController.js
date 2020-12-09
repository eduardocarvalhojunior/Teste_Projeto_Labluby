const User = require('../models/User');
const Token = require('../models/Token');

module.exports = {
  async create(req, res) {
    const { username } = req.body;

    const user = await User.findOne({
      where: { username },
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

    await Token.create({
      user_id: user.id,
    });

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
};
