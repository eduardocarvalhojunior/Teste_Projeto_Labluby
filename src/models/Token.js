const { Model } = require('sequelize');

class Token extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Token;
