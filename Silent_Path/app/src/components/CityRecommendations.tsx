import { useMap } from '@/contexts/MapContext';
import { cityRecommendations, cities } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, TreePine, Shield, Car, Gauge, AlertTriangle, CheckCircle } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  tree: TreePine,
  shield: Shield,
  car: Car,
  park: TreePine,
  speed: Gauge,
};

export default function CityRecommendations() {
  const { selectedCity, setSelectedCity, noiseZones } = useMap();

  // Подсчитываем статистику по зонам
  const stats = {
    high: noiseZones.filter(z => z.level === 'high').length,
    medium: noiseZones.filter(z => z.level === 'medium').length,
    low: noiseZones.filter(z => z.level === 'low').length,
  };

  // Находим самую шумную зону
  const noisiestZone = noiseZones.reduce((max, zone) => zone.avgDb > max.avgDb ? zone : max, noiseZones[0]);

  return (
    <div className="space-y-6">
      {/* Заголовок и выбор города */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Рекомендации для городских служб</h2>
              <p className="text-gray-600 text-sm">Предложения по снижению шумовой нагрузки в городе</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <Select 
                value={selectedCity.id} 
                onValueChange={(cityId) => {
                  const city = cities.find(c => c.id === cityId);
                  if (city) setSelectedCity(city);
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Выберите город" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Статистика города */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-100">
          <CardContent className="p-4">
            <p className="text-sm text-red-600">Высокий шум</p>
            <p className="text-3xl font-bold text-red-700">{stats.high}</p>
            <p className="text-xs text-red-600">зон требуют внимания</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-100">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-600">Средний шум</p>
            <p className="text-3xl font-bold text-yellow-700">{stats.medium}</p>
            <p className="text-xs text-yellow-600">зон на контроле</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-4">
            <p className="text-sm text-green-600">Тихие зоны</p>
            <p className="text-3xl font-bold text-green-700">{stats.low}</p>
            <p className="text-xs text-green-600">зон — образец</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-4">
            <p className="text-sm text-blue-600">Пиковый шум</p>
            <p className="text-3xl font-bold text-blue-700">{noisiestZone?.avgDb || 0}</p>
            <p className="text-xs text-blue-600">dB — {noisiestZone?.name || '—'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Предупреждение о пиковых зонах */}
      {stats.high > 0 && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-800">Требуется внимание городских служб</h4>
                <p className="text-sm text-orange-700 mt-1">
                  В {selectedCity.name} выявлено {stats.high} зон с высоким уровнем шума (65+ dB). 
                  Рекомендуется принять меры по снижению шумового воздействия на жителей.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Рекомендации */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Меры по снижению шума</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {cityRecommendations.map((rec) => {
            const Icon = iconMap[rec.icon] || Shield;
            return (
              <Card key={rec.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      rec.priority === 'high' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        rec.priority === 'high' ? 'text-red-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{rec.title}</h4>
                        {rec.priority === 'high' && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                            Приоритетно
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Успешные кейсы */}
      <Card className="bg-green-50 border-green-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            Успешные примеры внедрения
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Европейский опыт</h4>
              <p className="text-sm text-gray-600">
                В Барселоне установка шумозащитных экранов вдоль оживлённых магистралей 
                снизила уровень шума для прилегающих жилых домов на средний 15 dB.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Озеленение улиц</h4>
              <p className="text-sm text-gray-600">
                В Сингапуре посадка деревьев вдоль дорог помогла снизить уровень шума 
                на 8-10 dB и улучшить качество воздуха в городе.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Тихие зоны</h4>
              <p className="text-sm text-gray-600">
                В Вене создание "тихих кварталов" с ограничением скорости до 30 км/ч 
                значительно улучшило качество жизни жителей центральных районов.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Призыв к действию */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Присоединяйтесь к улучшению города</h3>
              <p className="text-blue-100">
        SilentPath помогает выявлять проблемные зоны и предлагать решения. 
                Вместе мы можем сделать города Казахстана комфортнее для жизни.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
