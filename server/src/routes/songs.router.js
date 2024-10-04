const songService = require('../services/songService');

const songsRouter = require('express').Router();

songsRouter.route('/:genreId').get(async (req, res) => {
  try {
    const { genreId } = req.params;
    console.log(genreId);
    
    if (!genreId || Number.isNaN(Number(genreId))) {
      res.status(400).json({ message: 'Invalid id' });
    }
    const songsByGenre = await songService.getSongsByGenreId(genreId);
    
    if (!songsByGenre) {
      return res.status(400).json({ message: 'No such songs' });
    }
    return res.status(200).json(songsByGenre);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

songsRouter.route('/one/:songId').get(async (req, res) => {
  try {
    const { songId } = req.params;    
    if (!songId || Number.isNaN(Number(songId))) {
      res.status(400).json({ message: 'Invalid id' });
    }
    const oneSong = await songService.getOneSongId(songId);
    
    if (!oneSong) {
      return res.status(400).json({ message: 'No this song' });
    }
    return res.status(200).json(oneSong);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = songsRouter;
