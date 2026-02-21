import { useState } from 'react';
import { UserProvider } from '@/contexts/UserContext';
import { MapProvider } from '@/contexts/MapContext';
import Navbar from '@/components/Navbar';
import NoiseMap from '@/components/NoiseMap';
import MapLegend from '@/components/MapLegend';
import RouteComparison from '@/components/RouteComparison';
import NoiseTimeChart from '@/components/NoiseTimeChart';
import HealthEffects from '@/components/HealthEffects';
import AboutPage from '@/components/AboutPage';
import ScrollToTop from '@/components/ScrollToTop';
import CityRecommendations from '@/components/CityRecommendations';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  Navigation, 
  Heart, 
  Volume2, 
  Shield, 
  Users, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Hero Section
function HeroSection({ onStart }: { onStart: (section: string) => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Hero */}
      <div className="flex-1 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Платформа городского шумового мониторинга
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Найдите <span className="text-green-300">тихий путь</span> в городе
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-lg">
                SilentPath помогает снизить воздействие транспортного шума на ваше здоровье. 
                Визуализация шумовых зон, тихие маршруты и рекомендации для городов Казахстана.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg"
                  onClick={() => onStart('map')}
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Открыть карту
                </Button>
                <Button 
                  size="lg" 
                  className="bg-green-500 text-white hover:bg-green-600 font-semibold shadow-lg border-0"
                  onClick={() => onStart('routes')}
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  Построить маршрут
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <p className="text-3xl font-bold">75 dB</p>
                  <p className="text-sm text-blue-200">Средний шум в центре</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">-30%</p>
                  <p className="text-sm text-blue-200">Снижение стресса</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-sm text-blue-200">Города</p>
                </div>
              </div>
            </div>
            
            {/* Preview Card */}
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Тихий маршрут найден</p>
                      <p className="text-sm text-blue-200">На 32 dB тише обычного</p>
                    </div>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-green-500 rounded-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-xl font-bold">3.1 км</p>
                      <p className="text-xs text-blue-200">Расстояние</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-xl font-bold">38 мин</p>
                      <p className="text-xs text-blue-200">Время</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-xl font-bold text-green-400">48 dB</p>
                      <p className="text-xs text-blue-200">Шум</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Возможности платформы</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            SilentPath объединяет данные о шумовых зонах, тихие маршруты и рекомендации 
            для защиты вашего здоровья от городского шума
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: 'Шумовая карта',
                desc: 'Визуализация уровня шума в реальном времени с цветными зонами для 3 городов',
                color: 'blue',
                section: 'map',
              },
              {
                icon: Navigation,
                title: 'Тихие маршруты',
                desc: 'Построение альтернативных маршрутов с минимальным уровнем шума',
                color: 'green',
                section: 'routes',
              },
              {
                icon: BarChart3,
                title: 'График шума',
                desc: 'Анализ пиковых часов и рекомендации по времени прогулок в каждом городе',
                color: 'purple',
                section: 'chart',
              },
              {
                icon: Heart,
                title: 'Здоровье',
                desc: 'Информация о влиянии шума на организм с ссылками на исследования',
                color: 'red',
                section: 'health',
              },
            ].map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1" onClick={() => onStart(feature.section)}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-sm text-blue-600">
                    <span>Подробнее</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Проблема городского шума</h2>
              <div className="space-y-4">
                {[
                  'Транспортный шум — второй по значимости экологический фактор риска',
                  'В Алматы средний уровень шума достигает 75-80 dB',
                  'Хронический шум повышает риск сердечно-сосудистых заболеваний',
                  'Шум вызывает стресс, бессонницу и снижение продуктивности',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              <Button 
                className="mt-6" 
                variant="outline"
                onClick={() => onStart('health')}
              >
                Узнать больше о влиянии на здоровье
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-red-50 border-red-100">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-red-600">80 dB</p>
                  <p className="text-sm text-gray-600 mt-2">Проспект Аль-Фараби</p>
                </CardContent>
              </Card>
              <Card className="bg-yellow-50 border-yellow-100">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-yellow-600">65 dB</p>
                  <p className="text-sm text-gray-600 mt-2">Жилые районы</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-100">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-green-600">45 dB</p>
                  <p className="text-sm text-gray-600 mt-2">Парки и скверы</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-100">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-blue-600">40 dB</p>
                  <p className="text-sm text-gray-600 mt-2">Норма ВОЗ ночью</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Наше решение</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Защита здоровья</h3>
              <p className="text-gray-600">
                Снижение воздействия шума на 30-40% при использовании тихих маршрутов
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Сообщество</h3>
              <p className="text-gray-600">
                Отзывы и заметки пользователей помогают создавать актуальную карту шума
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Масштабирование</h3>
              <p className="text-gray-600">
                Возможность расширения на другие города Казахстана
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Начните использовать SilentPath сегодня</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Платформа поможет вам находить тихие маршруты, планировать прогулки в комфортное время 
            и защищать своё здоровье от негативного воздействия городского шума.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg"
              onClick={() => onStart('map')}
            >
              Перейти к карте
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              className="bg-green-500 text-white hover:bg-green-600 font-semibold shadow-lg border-0"
              onClick={() => onStart('about')}
            >
              Узнать больше
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              <span className="text-white font-semibold">SilentPath</span>
            </div>
            <p className="text-sm">
              Интерактивная платформа для тихих маршрутов и шумовых зон
            </p>
            <p className="text-sm">
              Авторы: Сағади Сұлтан & Аубакиров Алихан
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Main App Content
function AppContent() {
  const [activeSection, setActiveSection] = useState('hero');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activeSection === 'hero') {
    return (
      <>
        <HeroSection onStart={handleSectionChange} />
        <ScrollToTop />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeSection === 'map' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Карта шумовых зон</h2>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-sm">
                  <span className="w-3 h-3 bg-red-500 rounded-full" />
                  Высокий
                </span>
                <span className="flex items-center gap-1 text-sm">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                  Средний
                </span>
                <span className="flex items-center gap-1 text-sm">
                  <span className="w-3 h-3 bg-green-500 rounded-full" />
                  Низкий
                </span>
              </div>
            </div>
            <div className="h-[600px] rounded-xl overflow-hidden shadow-lg relative">
              <NoiseMap showRoutePoints={false} />
              <MapLegend />
            </div>
          </div>
        )}

        {activeSection === 'routes' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Построение тихих маршрутов</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <RouteComparison />
              </div>
              <div className="lg:col-span-2">
                <div className="h-[600px] rounded-xl overflow-hidden shadow-lg relative">
                  <NoiseMap showRoutePoints={true} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'chart' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">График шумового времени</h2>
            <NoiseTimeChart />
          </div>
        )}

        {activeSection === 'health' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Влияние шума на здоровье</h2>
            <HealthEffects />
          </div>
        )}

        {activeSection === 'recommendations' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Рекомендации для городских служб</h2>
            <CityRecommendations />
          </div>
        )}

        {activeSection === 'about' && (
          <div className="space-y-4">
            <AboutPage />
          </div>
        )}
      </main>
      
      <ScrollToTop />
    </div>
  );
}

// Main App
function App() {
  return (
    <UserProvider>
      <MapProvider>
        <AppContent />
      </MapProvider>
    </UserProvider>
  );
}

export default App;
