const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        location: DataTypes.STRING,
        avatar: DataTypes.STRING,
        bio: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Repository, {
      foreignKey: 'user_id',
      as: 'repositories',
    });

    this.belongsToMany(models.User, {
      through: 'followers',
      foreignKey: 'follower',
      as: 'follower',
    });

    this.belongsToMany(models.User, {
      through: 'followers',
      foreignKey: 'user_id',
      as: 'userFollower',
    });

    this.belongsToMany(models.User, {
      through: 'followings',
      foreignKey: 'following',
      as: 'following',
    });

    this.belongsToMany(models.User, {
      through: 'followings',
      foreignKey: 'user_id',
      as: 'userFollowing',
    });

    this.belongsToMany(models.Repository, {
      through: 'repositories-stars',
      foreignKey: 'user_id',
      as: 'userStarred',
    });
  }
}

module.exports = User;
