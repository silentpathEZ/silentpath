import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useMap } from '@/contexts/MapContext';
import type { Route } from '@/types';
import { Clock, Ruler, Volume2, Navigation, Check, X } from 'lucide-react';

// Функция для расчета расстояния между двумя точками (в км)
function calculateDistance(point1: [number, number], point2: [number, number]): number {
  const R = 6371; // Радиус Земли в км
  const dLat = (point2[0] - point1[0]) * Math.PI / 180;
  const dLon = (point2[1] - point1[1]) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1[0] * Math.PI / 180) * Math.cos(point2[0] * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Функция для генерации точек маршрута
function generateRoutePoints(start: [number, number], end: [number, number], avoidNoise: boolean): [number, number][] {
  const points: [number, number][] = [start];
  
  if (avoidNoise) {
    const midLat = (start[0] + end[0]) / 2;
    const midLng = (start[1] + end[1]) / 2;
    points.push([start[0] + 0.002, start[1] - 0.003]);
    points.push([midLat + 0.003, midLng - 0.002]);
    points.push([end[0] + 0.002, end[1] - 0.003]);
  } else {
    const midLat = (start[0] + end[0]) / 2;
    const midLng = (start[1] + end[1]) / 2;
    points.push([midLat, midLng]);
  }
  
  points.push(end);
  return points;
}

// Функция для расчета среднего шума на маршруте
function calculateAvgNoise(_distance: number, isQuiet: boolean): number {
  if (isQuiet) {
    return Math.round(48 + Math.random() * 7);
  } else {
    return Math.round(68 + Math.random() * 10);
  }
}

// Функция для расчета оценки комфорта
function calculateNoiseScore(avgNoise: number): number {
  if (avgNoise < 45) return 10;
  if (avgNoise < 50) return 9;
  if (avgNoise < 55) return 8;
  if (avgNoise < 60) return 7;
  if (avgNoise < 65) return 6;
  if (avgNoise < 70) return 5;
  if (avgNoise < 75) return 4;
  if (avgNoise < 80) return 3;
  if (avgNoise < 85) return 2;
  return 1;
}

interface RouteCardProps {
  route: Route;
  type: 'regular' | 'quiet';
  isSelected: boolean;
  onSelect: () => void;
}

function RouteCard({ route, type, isSelected, onSelect }: RouteCardProps) {
  const isQuiet = type === 'quiet';
  
  return (
    <Card 
      className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-md'}`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Navigation className={`w-5 h-5 ${isQuiet ? 'text-green-500' : 'text-red-500'}`} />
            {route.name}
          </CardTitle>
          {isSelected && <Check className="w-5 h-5 text-blue-500" />}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Ruler className="w-4 h-4" />
            <span className="text-sm">Расстояние</span>
          </div>
          <span className="font-medium">{route.distance.toFixed(1)} км</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Время</span>
          </div>
          <span className="font-medium">{route.duration} мин</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Volume2 className="w-4 h-4" />
              <span className="text-sm">Средний шум</span>
            </div>
            <span 
              className="font-medium"
              style={{ color: route.avgNoiseLevel < 55 ? '#22C55E' : route.avgNoiseLevel < 70 ? '#EAB308' : '#EF4444' }}
            >
              {route.avgNoiseLevel} dB
            </span>
          </div>
          <Progress 
            value={route.avgNoiseLevel} 
            max={100}
            className="h-2"
          />
        </div>
        
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Оценка комфорта</span>
            <div className="flex items-center gap-1">
              <span className="font-bold" style={{ 
                color: route.noiseScore >= 7 ? '#22C55E' : route.noiseScore >= 4 ? '#EAB308' : '#EF4444' 
              }}>
                {route.noiseScore}/10
              </span>
            </div>
          </div>
        </div>
        
        {isQuiet && (
          <div className="bg-green-50 p-3 rounded-lg space-y-2">
            <p className="text-sm font-medium text-green-800">Преимущества:</p>
            <ul className="text-sm text-green-700 space-y-1">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Низкий уровень стресса
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Лучше для концентрации
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Комфортная прогулка
              </li>
            </ul>
          </div>
        )}
        
        {!isQuiet && (
          <div className="bg-red-50 p-3 rounded-lg space-y-2">
            <p className="text-sm font-medium text-red-800">Влияние на здоровье:</p>
            <ul className="text-sm text-red-700 space-y-1">
              <li className="flex items-center gap-2">
                <X className="w-4 h-4" />
                Повышенный уровень кортизола
              </li>
              <li className="flex items-center gap-2">
                <X className="w-4 h-4" />
                Риск усталости и раздражительности
              </li>
              <li className="flex items-center gap-2">
                <X className="w-4 h-4" />
                Негативное влияние на сосуды
              </li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function RouteComparison() {
  const { routePoints, setCompareRoutes, setActiveRoute } = useMap();
  const [selectedRoute, setSelectedRoute] = useState<'regular' | 'quiet' | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [routes, setRoutes] = useState<{ regular: Route | null; quiet: Route | null }>({
    regular: null,
    quiet: null,
  });

  const buildRoutes = () => {
    if (routePoints.A && routePoints.B) {
      const distanceAB = calculateDistance(routePoints.A, routePoints.B);
      
      const regularDistance = distanceAB;
      const regularDuration = Math.round(regularDistance * 12);
      const regularNoise = calculateAvgNoise(regularDistance, false);
      const regularPoints = generateRoutePoints(routePoints.A, routePoints.B, false);
      
      const regularRoute: Route = {
        id: 'regular-1',
        name: 'Обычный маршрут',
        points: regularPoints,
        distance: regularDistance,
        duration: regularDuration,
        avgNoiseLevel: regularNoise,
        noiseScore: calculateNoiseScore(regularNoise),
      };

      const quietDistance = distanceAB * 1.3;
      const quietDuration = Math.round(quietDistance * 12);
      const quietNoise = calculateAvgNoise(quietDistance, true);
      const quietPoints = generateRoutePoints(routePoints.A, routePoints.B, true);
      
      const quietRoute: Route = {
        id: 'quiet-1',
        name: 'Тихий маршрут',
        points: quietPoints,
        distance: quietDistance,
        duration: quietDuration,
        avgNoiseLevel: quietNoise,
        noiseScore: calculateNoiseScore(quietNoise),
      };

      setRoutes({ regular: regularRoute, quiet: quietRoute });
      setCompareRoutes({ regular: regularRoute, quiet: quietRoute });
      setShowComparison(true);
    }
  };

  const handleSelectRoute = (type: 'regular' | 'quiet') => {
    setSelectedRoute(type);
    setActiveRoute(type === 'regular' ? routes.regular : routes.quiet);
  };

  const canBuildRoutes = routePoints.A && routePoints.B;

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Как построить тихий маршрут:</h4>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Установите точку A (откуда) на карте</li>
            <li>Установите точку B (куда) на карте</li>
            <li>Нажмите "Сравнить маршруты"</li>
            <li>Выберите оптимальный вариант</li>
          </ol>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className={routePoints.A ? 'bg-blue-50 border-blue-200' : ''}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${routePoints.A ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                A
              </div>
              <div>
                <p className="font-medium">Точка отправления</p>
                <p className="text-sm text-gray-500">
                  {routePoints.A ? 'Установлена' : 'Не выбрана'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={routePoints.B ? 'bg-purple-50 border-purple-200' : ''}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${routePoints.B ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}>
                B
              </div>
              <div>
                <p className="font-medium">Точка назначения</p>
                <p className="text-sm text-gray-500">
                  {routePoints.B ? 'Установлена' : 'Не выбрана'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button 
        className="w-full" 
        size="lg"
        disabled={!canBuildRoutes}
        onClick={buildRoutes}
      >
        <Navigation className="w-5 h-5 mr-2" />
        Сравнить маршруты
      </Button>

      {showComparison && routes.regular && routes.quiet && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Сравнение маршрутов</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <RouteCard
              route={routes.regular}
              type="regular"
              isSelected={selectedRoute === 'regular'}
              onSelect={() => handleSelectRoute('regular')}
            />
            <RouteCard
              route={routes.quiet}
              type="quiet"
              isSelected={selectedRoute === 'quiet'}
              onSelect={() => handleSelectRoute('quiet')}
            />
          </div>
          
          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Экономия здоровья на тихом маршруте:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    -{routes.regular.avgNoiseLevel - routes.quiet.avgNoiseLevel} dB
                  </p>
                  <p className="text-sm text-gray-600">Снижение шума</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    -45%
                  </p>
                  <p className="text-sm text-gray-600">Стресс-гормонов</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    +23%
                  </p>
                  <p className="text-sm text-gray-600">Концентрация</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    +{routes.quiet.noiseScore - routes.regular.noiseScore}
                  </p>
                  <p className="text-sm text-gray-600">Баллы комфорта</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!canBuildRoutes && (
        <div className="text-center text-gray-500 text-sm">
          Установите обе точки на карте, чтобы увидеть сравнение маршрутов
        </div>
      )}
    </div>
  );
}
