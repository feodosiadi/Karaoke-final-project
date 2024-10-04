const models = require('../../db/models');

class GenreService {
  #models;

  constructor(dbModels) {
    this.#models = dbModels;
  }

  getAllGenres() {
    return this.#models.Genre.findAll();
  }
}

const genreService = new GenreService(models);

module.exports = genreService;
