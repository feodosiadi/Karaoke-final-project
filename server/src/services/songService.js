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

  async getOneSongId(id) {
    const data = await this.#models.Song.findOne({ where: { id } });
    return data;
  }

  async postOnRecord(data) {
    const res = await this.#models.Record.create(data);
    return res;
  }
}

const songService = new SongService(models);
module.exports = songService;
