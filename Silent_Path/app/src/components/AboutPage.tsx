import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { faqData } from '@/data/mockData';
import { Volume2, Target, Users, MapPin, MessageSquare, Heart } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function AboutPage() {
  return (
    <div className="space-y-8">
      {/* О проекте */}
      <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <Volume2 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">SilentPath</h1>
              <p className="text-blue-100">Тихие маршруты для здоровой жизни</p>
            </div>
          </div>
          <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
            SilentPath — это инновационная веб-платформа для визуализации уровня транспортного шума 
            в городах Казахстана. Наша цель — помочь жителям снизить негативное воздействие шума 
            на здоровье, предоставляя инструменты для поиска тихих маршрутов и планирования 
            прогулок в комфортное время.
          </p>
        </CardContent>
      </Card>

      {/* Цели проекта */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Цели проекта</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Heart,
              title: 'Защита здоровья',
              desc: 'Снижение воздействия шума на сердечно-сосудистую систему и психику',
              color: 'red',
            },
            {
              icon: MapPin,
              title: 'Визуализация',
              desc: 'Наглядное отображение шумовых зон на интерактивной карте',
              color: 'blue',
            },
            {
              icon: MessageSquare,
              title: 'Сообщество',
              desc: 'Обмен опытом и отзывами между пользователями платформы',
              color: 'green',
            },
            {
              icon: Target,
              title: 'Осознанность',
              desc: 'Повышение информированности о влиянии шума на здоровье',
              color: 'purple',
            },
          ].map((item, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Как это работает */}
      <Card>
        <CardHeader>
          <CardTitle>Как работает SilentPath</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2">Анализ шумовых зон</h4>
              <p className="text-sm text-gray-600">
                Платформа собирает и визуализирует данные об уровне шума в различных районах города
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2">Построение маршрутов</h4>
              <p className="text-sm text-gray-600">
                Алгоритм находит оптимальные тихие маршруты между точками A и B
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2">Рекомендации</h4>
              <p className="text-sm text-gray-600">
                Пользователи получают персонализированные советы по выбору времени и маршрутов
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Часто задаваемые вопросы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Авторы */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Создатели
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                С
              </div>
              <div>
                <p className="font-semibold text-lg">Сағади Сұлтан</p>
                <div className="flex gap-2 mt-2">
                  <a 
                    href="https://t.me/Pampers_73" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Telegram
                  </a>
                  <a 
                    href="https://wa.me/77051850788" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                А
              </div>
              <div>
                <p className="font-semibold text-lg">Аубакиров Алихан</p>
                <div className="flex gap-2 mt-2">
                  <a 
                    href="https://t.me/Pampers_73" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Telegram
                  </a>
                  <a 
                    href="https://wa.me/77051850788" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Контакты */}
      <Card>
        <CardHeader>
          <CardTitle>Связаться с нами</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Если у вас есть вопросы, предложения или вы хотите сообщить о проблеме, 
            свяжитесь с нами через мессенджеры.
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            <a 
              href="https://t.me/Pampers_73" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Telegram: @Pampers_73
            </a>
            <a 
              href="https://wa.me/77051850788" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp: +7 705 185 07 88
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">
              Городская экология
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">
              Алматы, Казахстан
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm">
              Транспорт, шум и давление
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
