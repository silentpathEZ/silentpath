import { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useMap } from '@/contexts/MapContext';
import { cities } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Sun, Moon, Car, MapPin } from 'lucide-react';

const getRecommendation = (noiseLevel: number): string => {
  if (noiseLevel < 45) {
    return 'Идеальное время для прогулок и отдыха на свежем воздухе';
  } else if (noiseLevel < 60) {
    return 'Приемлемый уровень шума для большинства активностей';
  } else if (noiseLevel < 75) {
    return 'Рекомендуется использовать наушники или искать тихие маршруты';
  } else {
    return 'Высокий уровень шума. Избегайте длительного пребывания на улице';
  }
};

export default function NoiseTimeChart() {
  const { selectedCity, setSelectedCity, getTimeSlotsForCity } = useMap();
  const [activeTab, setActiveTab] = useState('chart');

  const timeSlots = useMemo(() => getTimeSlotsForCity(selectedCity.id), [selectedCity.id, getTimeSlotsForCity]);

  const currentHour = new Date().getHours();
  const currentSlot = timeSlots.find(s => s.hour === currentHour);

  const morningSlots = timeSlots.filter(s => s.hour >= 6 && s.hour < 12);
  const daySlots = timeSlots.filter(s => s.hour >= 12 && s.hour < 18);
  const eveningSlots = timeSlots.filter(s => s.hour >= 18 && s.hour < 22);

  const getAverageNoise = (slots: typeof timeSlots) => 
    Math.round(slots.reduce((sum, s) => sum + s.noiseLevel, 0) / slots.length);

  // Получаем пиковый час
  const peakHour = useMemo(() => {
    return timeSlots.reduce((max, slot) => slot.noiseLevel > max.noiseLevel ? slot : max, timeSlots[0]);
  }, [timeSlots]);

  // Получаем самый тихий час
  const quietHour = useMemo(() => {
    return timeSlots.reduce((min, slot) => slot.noiseLevel < min.noiseLevel ? slot : min, timeSlots[0]);
  }, [timeSlots]);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof timeSlots[0] }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-semibold">{data.label}</p>
          <p className="text-sm">
            Уровень шума: <span className="font-medium">{data.noiseLevel} dB</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Трафик: {data.trafficIntensity === 'low' ? 'Низкий' : data.trafficIntensity === 'medium' ? 'Средний' : 'Высокий'}
          </p>
          <p className="text-xs text-gray-600 mt-2 max-w-[200px]">
            {getRecommendation(data.noiseLevel)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Выбор города */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">Город:</span>
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
        </CardContent>
      </Card>

      {/* Текущий статус */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Сейчас в {selectedCity.name}</p>
                <p className="text-2xl font-bold">{currentSlot?.noiseLevel || '-'} dB</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Sun className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Утро (6-12)</p>
                <p className="text-2xl font-bold">{getAverageNoise(morningSlots)} dB</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Car className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">День (12-18)</p>
                <p className="text-2xl font-bold">{getAverageNoise(daySlots)} dB</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Moon className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Вечер (18-22)</p>
                <p className="text-2xl font-bold">{getAverageNoise(eveningSlots)} dB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Пиковые часы */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-red-50 border-red-100">
          <CardContent className="p-4">
            <p className="text-sm text-red-600 font-medium">Пик шума</p>
            <p className="text-2xl font-bold text-red-700">{peakHour.label}</p>
            <p className="text-sm text-red-600">{peakHour.noiseLevel} dB — избегайте прогулок в это время</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-4">
            <p className="text-sm text-green-600 font-medium">Самое тихое время</p>
            <p className="text-2xl font-bold text-green-700">{quietHour.label}</p>
            <p className="text-sm text-green-600">{quietHour.noiseLevel} dB — идеальное время для прогулок</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chart">График шума</TabsTrigger>
          <TabsTrigger value="table">Таблица по часам</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Уровень шума в {selectedCity.name} в течение дня</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSlots} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorNoise" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="label" 
                      tick={{ fontSize: 10 }}
                      interval={2}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      domain={[0, 100]}
                      label={{ value: 'dB', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={55} stroke="#22C55E" strokeDasharray="3 3" label="Безопасно" />
                    <ReferenceLine y={70} stroke="#EAB308" strokeDasharray="3 3" label="Внимание" />
                    <ReferenceLine y={85} stroke="#EF4444" strokeDasharray="3 3" label="Опасно" />
                    <Area
                      type="monotone"
                      dataKey="noiseLevel"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorNoise)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              {/* Легенда */}
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded" />
                  <span className="text-sm">Безопасно (&lt;55 dB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded" />
                  <span className="text-sm">Внимание (55-70 dB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded" />
                  <span className="text-sm">Опасно (&gt;70 dB)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Детальная информация по часам — {selectedCity.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Время</th>
                      <th className="text-left p-2">Уровень шума</th>
                      <th className="text-left p-2">Интенсивность</th>
                      <th className="text-left p-2">Рекомендация</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((slot) => (
                      <tr 
                        key={slot.hour} 
                        className={`border-b hover:bg-gray-50 ${slot.hour === currentHour ? 'bg-blue-50' : ''}`}
                      >
                        <td className="p-2 font-medium">{slot.label}</td>
                        <td className="p-2">
                          <span 
                            className="px-2 py-1 rounded-full text-white text-sm"
                            style={{ 
                              backgroundColor: slot.noiseLevel < 55 ? '#22C55E' : slot.noiseLevel < 70 ? '#EAB308' : '#EF4444' 
                            }}
                          >
                            {slot.noiseLevel} dB
                          </span>
                        </td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            slot.trafficIntensity === 'low' 
                              ? 'bg-green-100 text-green-800' 
                              : slot.trafficIntensity === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {slot.trafficIntensity === 'low' ? 'Низкая' : slot.trafficIntensity === 'medium' ? 'Средняя' : 'Высокая'}
                          </span>
                        </td>
                        <td className="p-2 text-sm text-gray-600">{getRecommendation(slot.noiseLevel)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
