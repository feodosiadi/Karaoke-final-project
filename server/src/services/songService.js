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

  async getLeaderBoardOfOneSong(songId) {
    const data = await this.#models.Record.findAll({
      where: { songId },
      order: [['score', 'DESC']],
      limit: 5,
    });
    return data;
  }

  async getLeaderBoard() {
    const data = await this.#models.Record.findAll({
      attributes: ['id', 'record', 'userId', 'songId', 'score'],
      order: [['score', 'DESC']],
      limit: 10,
      include: [
        {
          model: this.#models.User,
          attributes: ['id', 'name'],
        },
        {
          model: this.#models.Song,
          attributes: ['id', 'name'],
        },
      ],
    });
    return data;
  }
}

const songService = new SongService(models);
module.exports = songService;
