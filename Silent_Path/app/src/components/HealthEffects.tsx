import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { healthEffects, healthSources } from '@/data/mockData';
import { Brain, Moon, Heart, Focus, Battery, Volume2, ArrowRight, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  moon: Moon,
  heart: Heart,
  focus: Focus,
  battery: Battery,
};

// Дополнительная информация о влиянии шума
const extendedInfo: Record<string, { details: string; tips: string[]; sources: string[] }> = {
  '1': {
    details: 'Хронический шумовой стресс активирует симпато-адреналовую систему, вызывая постоянное напряжение. Это приводит к повышению уровня кортизола и адреналина, что влияет на эмоциональное состояние.',
    tips: [
      'Используйте наушники с шумоподавлением в шумных местах',
      'Планируйте маршруты через тихие зоны',
      'Делайте перерывы в тихих местах во время длительных прогулок',
      'Практикуйте дыхательные упражнения при попадании в шумную среду',
    ],
    sources: ['WHO Guidelines for Community Noise', 'European Environment Agency'],
  },
  '2': {
    details: 'Шум во время сна, даже если он не будит полностью, может вызывать микропробуждения, нарушая фазы глубокого сна. Это приводит к утренней усталости и снижению когнитивных функций.',
    tips: [
      'Выбирайте жильё в тихих районах города',
      'Используйте беруши или белый шум для маскировки',
      'Закрывайте окна в часы пикового шума',
      'Планируйте сон в наиболее тихие часы (обычно 2-5 утра)',
    ],
    sources: ['Sleep Foundation', 'Journal of Environmental Health'],
  },
  '3': {
    details: 'Длительное воздействие шума 65+ dB ассоциируется с повышением артериального давления на 5-10 мм рт.ст. и увеличением риска ишемической болезни сердца на 8-10%.',
    tips: [
      'Минимизируйте время в зонах с шумом выше 65 dB',
      'Используйте тихие маршруты для ежедневных прогулок',
      'Регулярно проверяйте артериальное давление',
      'Сообщайте о превышении шумовых норм в городские службы',
    ],
    sources: ['WHO Environmental Noise Guidelines', 'European Heart Journal'],
  },
  '4': {
    details: 'Шум отвлекает внимание, снижая продуктивность работы на 15-30%. Особенно негативно влияет на задачи, требующие концентрации и запоминания информации.',
    tips: [
      'Работайте в тихих кафе или коворкингах',
      'Используйте приложения с фоновыми звуками природы',
      'Планируйте важные задачи на тихие часы дня',
      'Создавайте тихую домашнюю обстановку для учёбы',
    ],
    sources: ['Journal of Applied Psychology', 'Noise & Health Journal'],
  },
  '5': {
    details: 'Постоянная борьба организма с шумом требует дополнительных энергетических ресурсов, что приводит к хронической усталости и снижению иммунной функции.',
    tips: [
      'Чередуйте активность в шумных и тихих местах',
      'Проводите выходные в парках и загородных зонах',
      'Используйте SilentPath для планирования тихих маршрутов',
      'Обращайте внимание на сигналы усталости организма',
    ],
    sources: ['International Journal of Environmental Research', 'Public Health Reviews'],
  },
};

export default function HealthEffects() {
  return (
    <div className="space-y-6">
      {/* Введение */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-100">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Volume2 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Почему шум важен для здоровья?
              </h3>
              <p className="text-red-800">
                Согласно ВОЗ, транспортный шум является вторым по значимости экологическим фактором риска 
                для здоровья в Европе после загрязнения воздуха. В Алматы средний уровень шума в центре 
                города достигает 75-80 dB, что превышает рекомендуемые нормы ВОЗ (55 dB днём, 40 dB ночью).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Карточки эффектов */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {healthEffects.map((effect) => {
          const Icon = iconMap[effect.icon] || Volume2;
          return (
            <Dialog key={effect.id}>
              <DialogTrigger asChild>
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                  style={{ borderTop: `4px solid ${effect.color}` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${effect.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: effect.color }} />
                      </div>
                      <div>
                        <CardTitle className="text-base">{effect.title}</CardTitle>
                        <span 
                          className="text-xs px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: effect.color }}
                        >
                          {effect.dbRange}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3">{effect.description}</p>
                    <div className="flex items-center gap-1 mt-3 text-sm text-blue-600">
                      <span>Подробнее</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${effect.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: effect.color }} />
                    </div>
                    <div>
                      <span className="block">{effect.title}</span>
                      <span 
                        className="text-xs px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: effect.color }}
                      >
                        {effect.dbRange}
                      </span>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-700">{effect.description}</p>
                  
                  {extendedInfo[effect.id] && (
                    <>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Научное обоснование</h4>
                        <p className="text-sm text-gray-600">{extendedInfo[effect.id].details}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Рекомендации по защите</h4>
                        <ul className="space-y-2">
                          {extendedInfo[effect.id].tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-green-600 text-xs">{idx + 1}</span>
                              </div>
                              <span className="text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="text-xs text-gray-400">
                        <span className="font-medium">Источники:</span>{' '}
                        {extendedInfo[effect.id].sources.join(', ')}
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>

      {/* Шкала уровней шума */}
      <Card>
        <CardHeader>
          <CardTitle>Шкала уровней шума</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { range: '30-40 dB', label: 'Тихая комната', color: '#22C55E', desc: 'Рекомендуется для сна' },
              { range: '50-60 dB', label: 'Обычный разговор', color: '#84CC16', desc: 'Комфортно для работы' },
              { range: '70-80 dB', label: 'Городской трафик', color: '#EAB308', desc: 'Может вызывать раздражение' },
              { range: '85-90 dB', label: 'Метро, грузовик', color: '#F97316', desc: 'Вредно при длительном воздействии' },
              { range: '100+ dB', label: 'Концерт, стройка', color: '#EF4444', desc: 'Опасно для слуха' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div 
                  className="w-20 h-10 rounded flex items-center justify-center text-white text-sm font-medium"
                  style={{ backgroundColor: item.color }}
                >
                  {item.range}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Источники */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Источники и исследования
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {healthSources.map((source, idx) => (
              <a
                key={idx}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-700">{source.name}</span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Призыв к действию */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Защитите своё здоровье</h3>
              <p className="text-blue-100">
                Используйте SilentPath для планирования тихих маршрутов и снижения воздействия шума на ваш организм.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="text-center">
                <p className="text-3xl font-bold">-30%</p>
                <p className="text-sm text-blue-100">Стресса</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">+25%</p>
                <p className="text-sm text-blue-100">Концентрации</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">+40%</p>
                <p className="text-sm text-blue-100">Комфорта</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
