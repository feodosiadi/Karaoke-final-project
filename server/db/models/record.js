'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Song, { foreignKey: 'songId' });
    }
  }
  Record.init(
    {
      record: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      songId: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Record',
    },
  );
  return Record;
};
