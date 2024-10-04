const genreService = require('../services/genreService');

const genresRouter = require('express').Router();

genresRouter.route('/').get(async (req, res) => {
  try {
    const allGenres = await genreService.getAllGenres()    
    return res.status(200).json(allGenres) 
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ text: 'allgenres problem server', message: error.message });
  }
});

module.exports = genresRouter;
