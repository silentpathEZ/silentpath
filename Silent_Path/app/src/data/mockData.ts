import type { NoiseZone, Review, Note, Route, TimeSlot, City, HealthEffect } from '@/types';

// Города Казахстана
export const cities: City[] = [
  { id: 'almaty', name: 'Алматы', center: [43.2380, 76.8829], zoom: 12 },
  { id: 'astana', name: 'Астана', center: [51.1699, 71.4491], zoom: 12 },
  { id: 'shymkent', name: 'Шымкент', center: [42.3417, 69.5901], zoom: 12 },
];

// Шумовые зоны Алматы (расширенные данные с разными формами)
export const noiseZonesAlmaty: NoiseZone[] = [
  // Высокий шум - центр, магистрали (полигоны)
  {
    id: 'alm-1',
    name: 'Проспект Назарбаева',
    coordinates: [
      [43.2380, 76.8829],
      [43.2400, 76.8850],
      [43.2420, 76.8880],
      [43.2410, 76.8900],
      [43.2390, 76.8870],
      [43.2370, 76.8840],
    ],
    level: 'high',
    avgDb: 78,
    description: 'Оживлённая магистраль с интенсивным движением',
    shape: 'polygon',
  },
  {
    id: 'alm-2',
    name: 'Улица Жибек Жолы',
    coordinates: [
      [43.2550, 76.8700],
      [43.2570, 76.8720],
      [43.2590, 76.8750],
      [43.2580, 76.8770],
      [43.2560, 76.8740],
      [43.2540, 76.8710],
    ],
    level: 'high',
    avgDb: 75,
    description: 'Центральная улица с магазинами и кафе',
    shape: 'polygon',
  },
  {
    id: 'alm-3',
    name: 'Проспект Аль-Фараби',
    coordinates: [
      [43.2250, 76.9000],
      [43.2270, 76.9030],
      [43.2290, 76.9060],
      [43.2280, 76.9080],
      [43.2260, 76.9050],
      [43.2240, 76.9020],
    ],
    level: 'high',
    avgDb: 80,
    description: 'Главная транспортная артерия города',
    shape: 'polygon',
  },
  {
    id: 'alm-4',
    name: 'Улица Сейфуллина',
    coordinates: [
      [43.2650, 76.9450],
      [43.2670, 76.9480],
      [43.2690, 76.9510],
      [43.2680, 76.9530],
      [43.2660, 76.9500],
      [43.2640, 76.9470],
    ],
    level: 'high',
    avgDb: 76,
    description: 'Оживлённая улица с интенсивным трафиком',
    shape: 'polygon',
  },
  {
    id: 'alm-5',
    name: 'Проспект Райымбека',
    coordinates: [
      [43.2800, 76.8900],
      [43.2820, 76.8930],
      [43.2840, 76.8960],
      [43.2830, 76.8980],
      [43.2810, 76.8950],
      [43.2790, 76.8920],
    ],
    level: 'high',
    avgDb: 77,
    description: 'Магистраль с плотным движением',
    shape: 'polygon',
  },
  // Средний шум (круги)
  {
    id: 'alm-6',
    name: 'Район Ауэзова',
    coordinates: [[43.2450, 76.8600]],
    level: 'medium',
    avgDb: 62,
    description: 'Жилой район с умеренным трафиком',
    shape: 'circle',
    radius: 800,
  },
  {
    id: 'alm-7',
    name: 'Район Бостандык',
    coordinates: [[43.2350, 76.9200]],
    level: 'medium',
    avgDb: 58,
    description: 'Спальный район с развитой инфраструктурой',
    shape: 'circle',
    radius: 900,
  },
  {
    id: 'alm-8',
    name: 'Район Жетысу',
    coordinates: [[43.2700, 76.9100]],
    level: 'medium',
    avgDb: 60,
    description: 'Жилой район со средним уровнем шума',
    shape: 'circle',
    radius: 700,
  },
  {
    id: 'alm-9',
    name: 'Район Алмалинский',
    coordinates: [[43.2520, 76.9350]],
    level: 'medium',
    avgDb: 63,
    description: 'Центральный жилой район',
    shape: 'circle',
    radius: 600,
  },
  // Низкий шум - парки, скверы (полигоны и круги)
  {
    id: 'alm-10',
    name: 'Парк имени 28 гвардейцев',
    coordinates: [
      [43.2500, 76.9550],
      [43.2520, 76.9580],
      [43.2540, 76.9610],
      [43.2530, 76.9630],
      [43.2510, 76.9600],
      [43.2490, 76.9570],
    ],
    level: 'low',
    avgDb: 45,
    description: 'Тихий парк для прогулок и отдыха',
    shape: 'polygon',
  },
  {
    id: 'alm-11',
    name: 'Сквер у Центрального стадиона',
    coordinates: [
      [43.2600, 76.9450],
      [43.2620, 76.9480],
      [43.2640, 76.9510],
      [43.2630, 76.9530],
      [43.2610, 76.9500],
      [43.2590, 76.9470],
    ],
    level: 'low',
    avgDb: 42,
    description: 'Зелёная зона с минимальным шумом',
    shape: 'polygon',
  },
  {
    id: 'alm-12',
    name: 'Ботанический сад',
    coordinates: [[43.2200, 76.9100]],
    level: 'low',
    avgDb: 38,
    description: 'Самое тихое место в городе',
    shape: 'circle',
    radius: 1000,
  },
  {
    id: 'alm-13',
    name: 'Парк Горького',
    coordinates: [
      [43.2750, 76.9350],
      [43.2770, 76.9380],
      [43.2790, 76.9410],
      [43.2780, 76.9430],
      [43.2760, 76.9400],
      [43.2740, 76.9370],
    ],
    level: 'low',
    avgDb: 44,
    description: 'Центральный парк отдыха',
    shape: 'polygon',
  },
  {
    id: 'alm-14',
    name: 'Сквер им. Абая',
    coordinates: [[43.2650, 76.8750]],
    level: 'low',
    avgDb: 41,
    description: 'Тихий сквер в центре',
    shape: 'circle',
    radius: 400,
  },
  {
    id: 'alm-15',
    name: 'Парк Достык',
    coordinates: [[43.2280, 76.9500]],
    level: 'low',
    avgDb: 43,
    description: 'Парк для семейного отдыха',
    shape: 'circle',
    radius: 500,
  },
];

// Шумовые зоны Астаны
export const noiseZonesAstana: NoiseZone[] = [
  // Высокий шум
  {
    id: 'ast-1',
    name: 'Проспект Кабанбай батыра',
    coordinates: [
      [51.1600, 71.4200],
      [51.1620, 71.4230],
      [51.1640, 71.4260],
      [51.1630, 71.4280],
      [51.1610, 71.4250],
      [51.1590, 71.4220],
    ],
    level: 'high',
    avgDb: 77,
    description: 'Главная магистраль левого берега',
    shape: 'polygon',
  },
  {
    id: 'ast-2',
    name: 'Проспект Туран',
    coordinates: [
      [51.1500, 71.4000],
      [51.1520, 71.4030],
      [51.1540, 71.4060],
      [51.1530, 71.4080],
      [51.1510, 71.4050],
      [51.1490, 71.4020],
    ],
    level: 'high',
    avgDb: 74,
    description: 'Оживлённый проспект с интенсивным движением',
    shape: 'polygon',
  },
  {
    id: 'ast-3',
    name: 'Улица Сарыарка',
    coordinates: [
      [51.1700, 71.4300],
      [51.1720, 71.4330],
      [51.1740, 71.4360],
      [51.1730, 71.4380],
      [51.1710, 71.4350],
      [51.1690, 71.4320],
    ],
    level: 'high',
    avgDb: 76,
    description: 'Центральная улица делового района',
    shape: 'polygon',
  },
  {
    id: 'ast-4',
    name: 'Проспект Мангилик Ел',
    coordinates: [[51.1400, 71.3800]],
    level: 'high',
    avgDb: 73,
    description: 'Новая магистраль города',
    shape: 'circle',
    radius: 700,
  },
  // Средний шум
  {
    id: 'ast-5',
    name: 'Район Нура',
    coordinates: [[51.1800, 71.3800]],
    level: 'medium',
    avgDb: 61,
    description: 'Жилой район с умеренным трафиком',
    shape: 'circle',
    radius: 800,
  },
  {
    id: 'ast-6',
    name: 'Район Алматы',
    coordinates: [[51.1400, 71.4500]],
    level: 'medium',
    avgDb: 59,
    description: 'Спальный район',
    shape: 'circle',
    radius: 750,
  },
  {
    id: 'ast-7',
    name: 'Район Есиль',
    coordinates: [[51.1650, 71.3900]],
    level: 'medium',
    avgDb: 60,
    description: 'Жилой район на левом берегу',
    shape: 'circle',
    radius: 650,
  },
  // Низкий шум
  {
    id: 'ast-8',
    name: 'Парк Президента',
    coordinates: [
      [51.1650, 71.4150],
      [51.1670, 71.4180],
      [51.1690, 71.4210],
      [51.1680, 71.4230],
      [51.1660, 71.4200],
      [51.1640, 71.4170],
    ],
    level: 'low',
    avgDb: 43,
    description: 'Парк для отдыха и прогулок',
    shape: 'polygon',
  },
  {
    id: 'ast-9',
    name: 'Набережная Есиль',
    coordinates: [
      [51.1550, 71.4100],
      [51.1570, 71.4130],
      [51.1590, 71.4160],
      [51.1580, 71.4180],
      [51.1560, 71.4150],
      [51.1540, 71.4120],
    ],
    level: 'low',
    avgDb: 46,
    description: 'Тихая набережная реки',
    shape: 'polygon',
  },
  {
    id: 'ast-10',
    name: 'Ботанический сад',
    coordinates: [[51.1750, 71.4400]],
    level: 'low',
    avgDb: 40,
    description: 'Тихая зона с редкими растениями',
    shape: 'circle',
    radius: 600,
  },
  {
    id: 'ast-11',
    name: 'Парк Жастар',
    coordinates: [[51.1450, 71.4200]],
    level: 'low',
    avgDb: 44,
    description: 'Парк для молодёжи',
    shape: 'circle',
    radius: 500,
  },
];

// Шумовые зоны Шымкента
export const noiseZonesShymkent: NoiseZone[] = [
  // Высокий шум
  {
    id: 'shy-1',
    name: 'Проспект Тауке хана',
    coordinates: [
      [42.3300, 69.5800],
      [42.3320, 69.5830],
      [42.3340, 69.5860],
      [42.3330, 69.5880],
      [42.3310, 69.5850],
      [42.3290, 69.5820],
    ],
    level: 'high',
    avgDb: 75,
    description: 'Главная магистраль города',
    shape: 'polygon',
  },
  {
    id: 'shy-2',
    name: 'Улица Байтурсынова',
    coordinates: [
      [42.3450, 69.5900],
      [42.3470, 69.5930],
      [42.3490, 69.5960],
      [42.3480, 69.5980],
      [42.3460, 69.5950],
      [42.3440, 69.5920],
    ],
    level: 'high',
    avgDb: 73,
    description: 'Центральная улица с активным движением',
    shape: 'polygon',
  },
  {
    id: 'shy-3',
    name: 'Улица Кунаева',
    coordinates: [[42.3350, 69.5700]],
    level: 'high',
    avgDb: 74,
    description: 'Оживлённая улица',
    shape: 'circle',
    radius: 600,
  },
  // Средний шум
  {
    id: 'shy-4',
    name: 'Район Абай',
    coordinates: [[42.3500, 69.5700]],
    level: 'medium',
    avgDb: 60,
    description: 'Жилой район',
    shape: 'circle',
    radius: 800,
  },
  {
    id: 'shy-5',
    name: 'Район Каратау',
    coordinates: [[42.3200, 69.6000]],
    level: 'medium',
    avgDb: 57,
    description: 'Спальный район',
    shape: 'circle',
    radius: 750,
  },
  {
    id: 'shy-6',
    name: 'Район Енбекши',
    coordinates: [[42.3400, 69.6100]],
    level: 'medium',
    avgDb: 59,
    description: 'Жилой район с умеренным шумом',
    shape: 'circle',
    radius: 700,
  },
  // Низкий шум
  {
    id: 'shy-7',
    name: 'Парк имени Абая',
    coordinates: [
      [42.3400, 69.5850],
      [42.3420, 69.5880],
      [42.3440, 69.5910],
      [42.3430, 69.5930],
      [42.3410, 69.5900],
      [42.3390, 69.5870],
    ],
    level: 'low',
    avgDb: 42,
    description: 'Центральный парк города',
    shape: 'polygon',
  },
  {
    id: 'shy-8',
    name: 'Сквер Жастар',
    coordinates: [
      [42.3350, 69.5950],
      [42.3370, 69.5980],
      [42.3390, 69.6010],
      [42.3380, 69.6030],
      [42.3360, 69.6000],
      [42.3340, 69.5970],
    ],
    level: 'low',
    avgDb: 44,
    description: 'Тихий сквер для отдыха',
    shape: 'polygon',
  },
  {
    id: 'shy-9',
    name: 'Ботанический сад',
    coordinates: [[42.3250, 69.5800]],
    level: 'low',
    avgDb: 39,
    description: 'Тихая зона с флорой',
    shape: 'circle',
    radius: 550,
  },
  {
    id: 'shy-10',
    name: 'Парк Независимости',
    coordinates: [[42.3550, 69.5950]],
    level: 'low',
    avgDb: 43,
    description: 'Парк для семейного отдыха',
    shape: 'circle',
    radius: 650,
  },
];

// Все шумовые зоны по городам
export const allNoiseZones: Record<string, NoiseZone[]> = {
  almaty: noiseZonesAlmaty,
  astana: noiseZonesAstana,
  shymkent: noiseZonesShymkent,
};

// Текущие зоны (для совместимости)
export const noiseZones = noiseZonesAlmaty;

// Отзывы пользователей
export const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Айгуль К.',
    location: [43.2380, 76.8829],
    noiseLevel: 'high',
    rating: 2,
    comment: 'Очень шумно, особенно в час пик. Лучше обходить стороной.',
    timestamp: '2026-01-15T14:30:00Z',
    likes: 12,
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Дмитрий М.',
    location: [43.2500, 76.9550],
    noiseLevel: 'low',
    rating: 5,
    comment: 'Отличное место для утренних пробежек! Тихо и спокойно.',
    timestamp: '2026-01-14T08:15:00Z',
    likes: 8,
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Елена С.',
    location: [43.2450, 76.8600],
    noiseLevel: 'medium',
    rating: 3,
    comment: 'Днём нормально, но вечером становится шумновато.',
    timestamp: '2026-01-13T18:45:00Z',
    likes: 5,
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'Нурлан А.',
    location: [43.2200, 76.9100],
    noiseLevel: 'low',
    rating: 5,
    comment: 'Ботанический сад - спасение от городского шума!',
    timestamp: '2026-01-12T10:00:00Z',
    likes: 15,
  },
  {
    id: '5',
    userId: 'user5',
    userName: 'Мария В.',
    location: [43.2250, 76.9000],
    noiseLevel: 'high',
    rating: 1,
    comment: 'Аль-Фараби - кошмар для пешеходов. Постоянный гул машин.',
    timestamp: '2026-01-11T16:20:00Z',
    likes: 20,
  },
];

// Заметки пользователей
export const mockNotes: Note[] = [
  {
    id: '1',
    userId: 'user1',
    location: [43.2520, 76.9580],
    text: 'Тихий уголок для чтения',
    type: 'quiet',
    timestamp: '2026-01-15T10:00:00Z',
  },
  {
    id: '2',
    userId: 'user2',
    location: [43.2400, 76.8850],
    text: 'Стройка! Очень шумно с 8 утра',
    type: 'noise',
    timestamp: '2026-01-14T09:30:00Z',
  },
  {
    id: '3',
    userId: 'user3',
    location: [43.2350, 76.9200],
    text: 'Уютный дворик без машин',
    type: 'quiet',
    timestamp: '2026-01-13T15:00:00Z',
  },
];

// Маршруты (обычный vs тихий)
export const mockRoutes: { regular: Route; quiet: Route } = {
  regular: {
    id: 'regular-1',
    name: 'Обычный маршрут',
    points: [
      [43.2380, 76.8829],
      [43.2400, 76.8850],
      [43.2420, 76.8880],
      [43.2450, 76.8900],
      [43.2480, 76.8930],
    ],
    distance: 2.3,
    duration: 28,
    avgNoiseLevel: 72,
    noiseScore: 3,
  },
  quiet: {
    id: 'quiet-1',
    name: 'Тихий маршрут',
    points: [
      [43.2380, 76.8829],
      [43.2390, 76.8810],
      [43.2410, 76.8790],
      [43.2430, 76.8770],
      [43.2450, 76.8750],
      [43.2470, 76.8780],
      [43.2480, 76.8800],
      [43.2480, 76.8930],
    ],
    distance: 3.1,
    duration: 38,
    avgNoiseLevel: 48,
    noiseScore: 8,
  },
};

// График шумового времени для Алматы (уникальные данные)
export const timeSlotsAlmaty: TimeSlot[] = [
  { hour: 0, label: '00:00', noiseLevel: 38, trafficIntensity: 'low' },
  { hour: 1, label: '01:00', noiseLevel: 35, trafficIntensity: 'low' },
  { hour: 2, label: '02:00', noiseLevel: 33, trafficIntensity: 'low' },
  { hour: 3, label: '03:00', noiseLevel: 32, trafficIntensity: 'low' },
  { hour: 4, label: '04:00', noiseLevel: 35, trafficIntensity: 'low' },
  { hour: 5, label: '05:00', noiseLevel: 42, trafficIntensity: 'low' },
  { hour: 6, label: '06:00', noiseLevel: 58, trafficIntensity: 'medium' },
  { hour: 7, label: '07:00', noiseLevel: 74, trafficIntensity: 'high' },
  { hour: 8, label: '08:00', noiseLevel: 79, trafficIntensity: 'high' },
  { hour: 9, label: '09:00', noiseLevel: 76, trafficIntensity: 'high' },
  { hour: 10, label: '10:00', noiseLevel: 70, trafficIntensity: 'medium' },
  { hour: 11, label: '11:00', noiseLevel: 68, trafficIntensity: 'medium' },
  { hour: 12, label: '12:00', noiseLevel: 72, trafficIntensity: 'medium' },
  { hour: 13, label: '13:00', noiseLevel: 70, trafficIntensity: 'medium' },
  { hour: 14, label: '14:00', noiseLevel: 68, trafficIntensity: 'medium' },
  { hour: 15, label: '15:00', noiseLevel: 71, trafficIntensity: 'medium' },
  { hour: 16, label: '16:00', noiseLevel: 75, trafficIntensity: 'high' },
  { hour: 17, label: '17:00', noiseLevel: 81, trafficIntensity: 'high' },
  { hour: 18, label: '18:00', noiseLevel: 79, trafficIntensity: 'high' },
  { hour: 19, label: '19:00', noiseLevel: 73, trafficIntensity: 'medium' },
  { hour: 20, label: '20:00', noiseLevel: 64, trafficIntensity: 'medium' },
  { hour: 21, label: '21:00', noiseLevel: 56, trafficIntensity: 'low' },
  { hour: 22, label: '22:00', noiseLevel: 48, trafficIntensity: 'low' },
  { hour: 23, label: '23:00', noiseLevel: 42, trafficIntensity: 'low' },
];

// График шумового времени для Астаны (уникальные данные - более низкий уровень)
export const timeSlotsAstana: TimeSlot[] = [
  { hour: 0, label: '00:00', noiseLevel: 32, trafficIntensity: 'low' },
  { hour: 1, label: '01:00', noiseLevel: 30, trafficIntensity: 'low' },
  { hour: 2, label: '02:00', noiseLevel: 28, trafficIntensity: 'low' },
  { hour: 3, label: '03:00', noiseLevel: 27, trafficIntensity: 'low' },
  { hour: 4, label: '04:00', noiseLevel: 30, trafficIntensity: 'low' },
  { hour: 5, label: '05:00', noiseLevel: 38, trafficIntensity: 'low' },
  { hour: 6, label: '06:00', noiseLevel: 52, trafficIntensity: 'medium' },
  { hour: 7, label: '07:00', noiseLevel: 68, trafficIntensity: 'high' },
  { hour: 8, label: '08:00', noiseLevel: 73, trafficIntensity: 'high' },
  { hour: 9, label: '09:00', noiseLevel: 70, trafficIntensity: 'high' },
  { hour: 10, label: '10:00', noiseLevel: 63, trafficIntensity: 'medium' },
  { hour: 11, label: '11:00', noiseLevel: 61, trafficIntensity: 'medium' },
  { hour: 12, label: '12:00', noiseLevel: 65, trafficIntensity: 'medium' },
  { hour: 13, label: '13:00', noiseLevel: 63, trafficIntensity: 'medium' },
  { hour: 14, label: '14:00', noiseLevel: 61, trafficIntensity: 'medium' },
  { hour: 15, label: '15:00', noiseLevel: 64, trafficIntensity: 'medium' },
  { hour: 16, label: '16:00', noiseLevel: 68, trafficIntensity: 'high' },
  { hour: 17, label: '17:00', noiseLevel: 74, trafficIntensity: 'high' },
  { hour: 18, label: '18:00', noiseLevel: 72, trafficIntensity: 'high' },
  { hour: 19, label: '19:00', noiseLevel: 66, trafficIntensity: 'medium' },
  { hour: 20, label: '20:00', noiseLevel: 57, trafficIntensity: 'medium' },
  { hour: 21, label: '21:00', noiseLevel: 49, trafficIntensity: 'low' },
  { hour: 22, label: '22:00', noiseLevel: 42, trafficIntensity: 'low' },
  { hour: 23, label: '23:00', noiseLevel: 36, trafficIntensity: 'low' },
];

// График шумового времени для Шымкента (уникальные данные)
export const timeSlotsShymkent: TimeSlot[] = [
  { hour: 0, label: '00:00', noiseLevel: 35, trafficIntensity: 'low' },
  { hour: 1, label: '01:00', noiseLevel: 32, trafficIntensity: 'low' },
  { hour: 2, label: '02:00', noiseLevel: 30, trafficIntensity: 'low' },
  { hour: 3, label: '03:00', noiseLevel: 29, trafficIntensity: 'low' },
  { hour: 4, label: '04:00', noiseLevel: 32, trafficIntensity: 'low' },
  { hour: 5, label: '05:00', noiseLevel: 40, trafficIntensity: 'low' },
  { hour: 6, label: '06:00', noiseLevel: 55, trafficIntensity: 'medium' },
  { hour: 7, label: '07:00', noiseLevel: 71, trafficIntensity: 'high' },
  { hour: 8, label: '08:00', noiseLevel: 76, trafficIntensity: 'high' },
  { hour: 9, label: '09:00', noiseLevel: 73, trafficIntensity: 'high' },
  { hour: 10, label: '10:00', noiseLevel: 67, trafficIntensity: 'medium' },
  { hour: 11, label: '11:00', noiseLevel: 65, trafficIntensity: 'medium' },
  { hour: 12, label: '12:00', noiseLevel: 69, trafficIntensity: 'medium' },
  { hour: 13, label: '13:00', noiseLevel: 67, trafficIntensity: 'medium' },
  { hour: 14, label: '14:00', noiseLevel: 65, trafficIntensity: 'medium' },
  { hour: 15, label: '15:00', noiseLevel: 68, trafficIntensity: 'medium' },
  { hour: 16, label: '16:00', noiseLevel: 72, trafficIntensity: 'high' },
  { hour: 17, label: '17:00', noiseLevel: 78, trafficIntensity: 'high' },
  { hour: 18, label: '18:00', noiseLevel: 76, trafficIntensity: 'high' },
  { hour: 19, label: '19:00', noiseLevel: 70, trafficIntensity: 'medium' },
  { hour: 20, label: '20:00', noiseLevel: 61, trafficIntensity: 'medium' },
  { hour: 21, label: '21:00', noiseLevel: 53, trafficIntensity: 'low' },
  { hour: 22, label: '22:00', noiseLevel: 46, trafficIntensity: 'low' },
  { hour: 23, label: '23:00', noiseLevel: 40, trafficIntensity: 'low' },
];

// Все графики по городам
export const allTimeSlots: Record<string, TimeSlot[]> = {
  almaty: timeSlotsAlmaty,
  astana: timeSlotsAstana,
  shymkent: timeSlotsShymkent,
};

// Текущий график (для совместимости)
export const timeSlots = timeSlotsAlmaty;

// Информация о влиянии шума на здоровье
export const healthEffects: HealthEffect[] = [
  {
    id: '1',
    title: 'Стресс и тревожность',
    description: 'Постоянный шум активирует выброс стрессовых гормонов, что приводит к хронической тревожности и раздражительности.',
    icon: 'brain',
    dbRange: '55-70 dB',
    color: '#F59E0B',
  },
  {
    id: '2',
    title: 'Нарушение сна',
    description: 'Шум выше 40 dB может нарушать фазы сна, вызывать частые пробуждения и утреннюю усталость.',
    icon: 'moon',
    dbRange: '40-55 dB',
    color: '#8B5CF6',
  },
  {
    id: '3',
    title: 'Сердечно-сосудистые проблемы',
    description: 'Длительное воздействие шума 65+ dB повышает риск гипертонии и сердечно-сосудистых заболеваний.',
    icon: 'heart',
    dbRange: '65+ dB',
    color: '#EF4444',
  },
  {
    id: '4',
    title: 'Снижение концентрации',
    description: 'Шум отвлекает внимание, снижает продуктивность работы и способность к обучению.',
    icon: 'focus',
    dbRange: '50-65 dB',
    color: '#3B82F6',
  },
  {
    id: '5',
    title: 'Утомляемость',
    description: 'Постоянная борьба организма с шумом приводит к хронической усталости и снижению иммунитета.',
    icon: 'battery',
    dbRange: '60+ dB',
    color: '#10B981',
  },
];

// Цвета для уровней шума
export const noiseLevelColors = {
  low: '#22C55E',
  medium: '#EAB308',
  high: '#EF4444',
};

// Метки для уровней шума
export const noiseLevelLabels = {
  low: 'Низкий (до 50 dB)',
  medium: 'Средний (50-65 dB)',
  high: 'Высокий (65+ dB)',
};

// Источники для раздела о здоровье
export const healthSources = [
  {
    name: 'ВОЗ - Руководство по общественному шуму',
    url: 'https://www.who.int/publications/i/item/9789249003561',
  },
  {
    name: 'Европейское агентство окружающей среды',
    url: 'https://www.eea.europa.eu/',
  },
  {
    name: 'Sleep Foundation - Шум и сон',
    url: 'https://www.sleepfoundation.org/noise-and-sleep',
  },
  {
    name: 'European Heart Journal - Шум и сердце',
    url: 'https://academic.oup.com/eurheartj',
  },
];

// FAQ данные
export const faqData = [
  {
    question: 'Что такое SilentPath?',
    answer: 'SilentPath — это веб-платформа для визуализации уровня транспортного шума в городах Казахстана. Платформа помогает находить тихие маршруты, оставлять отзывы о местах и планировать прогулки в комфортное время.',
  },
  {
    question: 'Как работает карта шума?',
    answer: 'Карта отображает шумовые зоны разными цветами: зелёный — низкий уровень шума (до 50 dB), жёлтый — средний (50-65 dB), красный — высокий (65+ dB). Данные основаны на моделировании и отзывах пользователей.',
  },
  {
    question: 'Как построить тихий маршрут?',
    answer: 'Перейдите в раздел «Тихие маршруты», установите точку A (откуда) и точку B (куда) на карте, затем нажмите «Сравнить маршруты». Система покажет обычный и тихий маршрут с указанием уровня шума.',
  },
  {
    question: 'Могу ли я добавить заметку без регистрации?',
    answer: 'Нет, для добавления заметок и отзывов необходимо зарегистрироваться и войти в аккаунт. Это помогает поддерживать качество контента и защищать данные пользователей.',
  },
  {
    question: 'Какие города поддерживаются?',
    answer: 'На данный момент платформа охватывает Алматы, Астану и Шымкент. В будущем планируется расширение на другие города Казахстана.',
  },
  {
    question: 'Как шум влияет на здоровье?',
    answer: 'Постоянный шум может вызывать стресс, нарушать сон, повышать артериальное давление и снижать концентрацию. Подробная информация доступна в разделе «О здоровье».',
  },
];

// Рекомендации для городских служб
export const cityRecommendations = [
  {
    id: '1',
    title: 'Озеленение шумовых магистралей',
    description: 'Посадка деревьев и кустарников вдоль оживлённых дорог помогает поглощать до 10-15 dB шума.',
    icon: 'tree',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Установка шумозащитных экранов',
    description: 'Экраны высотой 3-4 метра снижают уровень шума на 15-20 dB для прилегающих жилых зон.',
    icon: 'shield',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Перенос парковок',
    description: 'Перенос парковок с центральных улиц на боковые снижает шум на 5-10 dB.',
    icon: 'car',
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Создание тихих зон',
    description: 'Обустройство скверов и парков в жилых районах даёт жителям место для отдыха от шума.',
    icon: 'park',
    priority: 'medium',
  },
  {
    id: '5',
    title: 'Ограничение скорости',
    description: 'Снижение скорости до 50 км/ч на городских улицах уменьшает шум на 3-5 dB.',
    icon: 'speed',
    priority: 'medium',
  },
];


