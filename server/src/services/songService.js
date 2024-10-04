const models = require('../../db/models');

class SongService {
  #models;

  constructor(dbModels) {
    this.#models = dbModels;
  }

  async getSongsByGenreId(id) {
    const data = await this.#models.Song.findAll({ where: { genreId: id } });
    return data;
  }
}

const songService = new SongService(models);
module.exports = songService;
