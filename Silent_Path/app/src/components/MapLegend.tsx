import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useMap } from '@/contexts/MapContext';
import { noiseLevelColors, noiseLevelLabels } from '@/data/mockData';
import { Volume2, VolumeX, Eye } from 'lucide-react';

export default function MapLegend() {
  const { visibleLevels, toggleLevel, reviews, notes, noiseZones, selectedCity } = useMap();

  // Статистика по текущему городу
  const stats = {
    high: noiseZones.filter(z => z.level === 'high').length,
    medium: noiseZones.filter(z => z.level === 'medium').length,
    low: noiseZones.filter(z => z.level === 'low').length,
  };

  return (
    <Card className="absolute bottom-4 right-4 z-[1000] w-64 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Легенда карты — {selectedCity.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Уровни шума */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-medium">Уровни шума</p>
          {(Object.keys(noiseLevelColors) as Array<keyof typeof noiseLevelColors>).map((level) => (
            <div key={level} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: noiseLevelColors[level] }}
                />
                <span className="text-sm">{noiseLevelLabels[level]}</span>
              </div>
              <Switch
                checked={visibleLevels[level]}
                onCheckedChange={() => toggleLevel(level)}
              />
            </div>
          ))}
        </div>

        {/* Разделитель */}
        <div className="border-t" />

        {/* Слои */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-medium">Слои</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Отзывы ({reviews.length})</span>
            </div>
            <Eye className="w-4 h-4 text-green-500" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <VolumeX className="w-4 h-4 text-green-500" />
              <span className="text-sm">Заметки ({notes.length})</span>
            </div>
            <Eye className="w-4 h-4 text-green-500" />
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t" />

        {/* Статистика города */}
        <div className="space-y-1">
          <p className="text-xs text-gray-500 font-medium">Статистика {selectedCity.name}</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-red-50 p-2 rounded text-center">
              <p className="text-red-600 font-bold">{stats.high}</p>
              <p className="text-gray-600">Высокий</p>
            </div>
            <div className="bg-yellow-50 p-2 rounded text-center">
              <p className="text-yellow-600 font-bold">{stats.medium}</p>
              <p className="text-gray-600">Средний</p>
            </div>
            <div className="bg-green-50 p-2 rounded text-center">
              <p className="text-green-600 font-bold">{stats.low}</p>
              <p className="text-gray-600">Тихие</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
