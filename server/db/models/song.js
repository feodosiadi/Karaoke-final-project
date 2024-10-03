'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Genre, { foreignKey: 'genreId' });
      this.belongsToMany(models.User, { through: models.Record, foreignKey: 'songId' });
    }
  }
  Song.init(
    {
      name: DataTypes.STRING,
      minus: DataTypes.STRING,
      acapella: DataTypes.STRING,
      text: DataTypes.TEXT,
      genreId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Song',
    },
  );
  return Song;
};
