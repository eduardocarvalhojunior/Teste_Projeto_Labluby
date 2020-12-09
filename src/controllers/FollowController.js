const User = require('../models/User');

module.exports = {
  async create(req, res) {

    const { id } = req.params;
    const { userId } = req.body;

    const userFollowed = await User.findOne({ where: { id } });
    const userFollowing = await User.findOne({ where: { id: userId } });

    if (!userFollowed) {

      return res
        .status(400)
        .json({ error: 'User that will be followed not found' });
    }

    if (!userFollowing) {

      return res
        .status(400)
        .json({ error: 'User that will be following not found' });
    }

    userFollowed.addFollower(userFollowing.id);
    userFollowing.addFollowing(userFollowed.id);

    return res.json({ userFollowed, userFollowing });
  },

  async delete(req, res) {

    const { id } = req.params;
    const { userId } = req.body;

    const userFollowed = await User.findOne({ where: { id } });
    const userFollowing = await User.findOne({ where: { id: userId } });

    if (!userFollowed) {

      return res
        .status(400)
        .json({ error: 'User that will be followed not found' });
    }

    if (!userFollowing) {

      return res
        .status(400)
        .json({ error: 'User that will be following not found' });
    }

    userFollowed.removeFollower(userFollowing.id);
    userFollowing.removeFollowing(userFollowed.id);

    return res.json({ userFollowed, userFollowing });
  },

  async getFollowers(req, res) {

    const { id } = req.params;

    const user = await User.findOne({

      where: { id },
      include: [
        {

          model: User,
          as: 'follower',
          through: { attributes: [] },
        },
      ],
    });

    if (!user) {

      return res.status(400).json({ error: 'User not found' });
    }

    return res.json(user.follower);
  },

  async getFollowings(req, res) {

    const { id } = req.params;

    const user = await User.findOne({

      where: { id },
      include: [
        {
          model: User,
          as: 'following',
          through: { attributes: [] },
        },
      ],
    });

    if (!user) {
      
      return res.status(400).json({ error: 'User not found' });
    }

    return res.json(user.following);
  },
};
