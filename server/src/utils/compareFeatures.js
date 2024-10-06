function compareFeatures(recordFeatures, acapellaFeatures) {
    // Извлечение характеристик с обработкой отсутствующих данных
    const recordEnergy = recordFeatures.energy || 0;
    const acapellaEnergy = acapellaFeatures.energy || 0;
    const recordCentroid = recordFeatures.spectralCentroid || 0;
    const acapellaCentroid = acapellaFeatures.spectralCentroid || 0;
  
    // Вычисление разниц
    const energyDifference = Math.abs(recordEnergy - acapellaEnergy);
    const centroidDifference = Math.abs(recordCentroid - acapellaCentroid);
  
    // Нормализация разниц
    const maxEnergy = Math.max(recordEnergy, acapellaEnergy) || 1; // избежание деления на ноль
    const maxCentroid = Math.max(recordCentroid, acapellaCentroid) || 1;
  
    const normalizedEnergyDiff = 1 - (energyDifference / maxEnergy);
    const normalizedCentroidDiff = 1 - (centroidDifference / maxCentroid);
  
    // Расчет финального балла как среднее значение нормализованных различий
    const finalScore = (normalizedEnergyDiff + normalizedCentroidDiff) / 2;
  
    // Преобразование в процент
    return Math.round(finalScore * 100);
  }
  
  module.exports = compareFeatures;
  