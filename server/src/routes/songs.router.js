const upload = require('../middlewares/multer');
const songService = require('../services/songService');
const fs = require('fs').promises;
const path = require('path');
const Meyda = require('meyda');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const { log } = require('console');

const songsRouter = require('express').Router();

songsRouter.route('/:genreId').get(async (req, res) => {
  try {
    const { genreId } = req.params;

    if (!genreId || Number.isNaN(Number(genreId))) {
      return res.status(400).json({ message: 'Invalid id' });
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
      return res.status(400).json({ message: 'Invalid id' });
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

// Функция для извлечения характеристик аудиофайла
async function extractFeatures(buffer) {
  const maxBufferSize = 44100; // Максимально допустимый размер буфера (например, 1 секунда)

  // Преобразуем buffer в Float32Array
  const inputBuffer = new Float32Array(buffer);

  // Убедитесь, что длина входного буфера не превышает maxBufferSize
  const effectiveBufferLength = Math.min(inputBuffer.length, maxBufferSize);

  // Находим ближайшую степень двойки к длине буфера
  const nearestPowerOfTwo = 2 ** Math.ceil(Math.log2(effectiveBufferLength));

  // Создаем audioBuffer с учетом ближайшей степени двойки
  const audioBuffer = new Float32Array(nearestPowerOfTwo);

  // Устанавливаем значения из inputBuffer в audioBuffer
  audioBuffer.set(inputBuffer.subarray(0, effectiveBufferLength), 0);

  // Если длина буфера меньше nearestPowerOfTwo, заполняем нулями
  if (effectiveBufferLength < nearestPowerOfTwo) {
    audioBuffer.fill(0, effectiveBufferLength, nearestPowerOfTwo);
  }

  console.log('Audio Buffer:', audioBuffer);
  console.log('Buffer Length:', audioBuffer.length);

  try {
    // Извлечение характеристик аудио
    const features = Meyda.extract(['energy', 'spectralCentroid', 'mfcc'], audioBuffer);
    return features; // Возвращаем извлеченные характеристики
  } catch (error) {
    console.error('Error extracting features:', error);
    throw new Error('Feature extraction failed'); // Обработка ошибок
  }
}

// Функция для генерации весов для каждой характеристики
function generateWeights() {
  const energyWeight = Math.random();
  const centroidWeight = Math.random();
  const mfccWeight = Math.random();

  const total = energyWeight + centroidWeight + mfccWeight;

  return {
    energy: energyWeight / total,
    centroid: centroidWeight / total,
    mfcc: mfccWeight / total, // Возвращаем нормализованные веса
  };
}

// Функция для сравнения характеристик записи и акапеллы
async function compareFeatures(recordFeatures, acapellaFeatures) {
  const weights = generateWeights(); // Генерируем веса для характеристики

  // Разница по энергии
  const logEnergyDifference = Math.abs(
    Math.log(recordFeatures.energy) - Math.log(acapellaFeatures.energy),
  );
  const maxLogEnergy =
    Math.max(Math.log(recordFeatures.energy), Math.log(acapellaFeatures.energy)) || 1;
  const normalizedLogEnergyDiff = 1 - Math.min(logEnergyDifference / maxLogEnergy, 1);

  // Разница по центроиду спектра
  const centroidDifference = Math.abs(
    recordFeatures.spectralCentroid - acapellaFeatures.spectralCentroid,
  );
  const maxCentroid =
    Math.max(recordFeatures.spectralCentroid, acapellaFeatures.spectralCentroid) || 1;
  const normalizedCentroidDiff = 1 - Math.min(centroidDifference / maxCentroid, 1);

  // Разница по MFCC
  const mfccDifference = recordFeatures.mfcc.reduce(
    (acc, val, idx) => acc + Math.abs(val - acapellaFeatures.mfcc[idx]),
    0,
  );
  const maxMfccDifference = Math.max(...recordFeatures.mfcc.map(Math.abs)) || 1;
  const normalizedMfccDiff =
    1 - Math.min(mfccDifference / (maxMfccDifference * recordFeatures.mfcc.length), 1);

  // Итоговая оценка
  const finalScore =
    normalizedLogEnergyDiff * weights.energy +
    normalizedCentroidDiff * weights.centroid +
    normalizedMfccDiff * weights.mfcc;

  console.log(`Final Score Calculation:
    normalizedLogEnergyDiff: ${normalizedLogEnergyDiff},
    normalizedCentroidDiff: ${normalizedCentroidDiff},
    normalizedMfccDiff: ${normalizedMfccDiff},
    weights: ${JSON.stringify(weights)}
  `);

  return Math.round(finalScore * 100); // Возвращаем итоговую оценку
}

songsRouter
  .route('/one/:songId/record')
  .post(verifyAccessToken, upload.single('record'), async (req, res) => {
    try {
      const { songId } = req.params;

      if (!songId || Number.isNaN(Number(songId))) {
        return res.status(400).json({ message: 'Invalid id' });
      }
      if (!req.file) {
        return res.status(400).json({ message: 'File not found' });
      }

      const nameRec = `${Date.now()}-record.wav`;
      const recDir = path.join(__dirname, '../../public/song/record');

      await fs.mkdir(recDir, { recursive: true });
      await fs.writeFile(path.join(recDir, nameRec), req.file.buffer);

      const songData = await songService.getOneSongId(songId);
      const acapellaPath = path.join(__dirname, `../../public/${songData.acapella}`);

      const acapellaBuffer = await fs.readFile(acapellaPath);

      console.log('=== File Buffers ===');
      console.log('Record Buffer Size:', req.file.buffer.length);
      console.log('Acapella Buffer Size:', acapellaBuffer.length);

      // Извлечение характеристик
      const recordFeatures = await extractFeatures(req.file.buffer);
      const acapellaFeatures = await extractFeatures(acapellaBuffer);

      // Логируем извлечённые характеристики для анализа
      console.log('Record Features:', recordFeatures);
      console.log('Acapella Features:', acapellaFeatures);

      // Рассчитываем оценку
      const score = await compareFeatures(recordFeatures, acapellaFeatures);
      console.log('Final Score:', score);

      const data = {
        record: `/song/record/${nameRec}`,
        userId: res.locals.user.id,
        songId: songData.id,
        score,
      };

      const recordFinal = await songService.postOnRecord(data);

      return res.status(200).json(recordFinal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });

songsRouter.route('/leaderboard/all/').get(async (req, res) => {
  try {
    const leaderBoard = await songService.getLeaderBoard();

    if (!leaderBoard) {
      return res.status(400).json({ message: 'No leaders' });
    }

    return res.status(200).json(leaderBoard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

songsRouter.route('/leaderboard/one/:songId').get(async (req, res) => {
  try {
    const { songId } = req.params;

    if (!songId || Number.isNaN(Number(songId))) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const leaderBoardByOneSong = await songService.getLeaderBoardOfOneSong(songId);

    if (!leaderBoardByOneSong) {
      return res.status(400).json({ message: 'No leaders' });
    }

    return res.status(200).json(leaderBoardByOneSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = songsRouter;
