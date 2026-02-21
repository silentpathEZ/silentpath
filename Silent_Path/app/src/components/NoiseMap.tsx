import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, Circle, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap as useMapContext } from '@/contexts/MapContext';
import { useUser } from '@/contexts/UserContext';
import type { NoiseLevel } from '@/types';
import { noiseLevelColors } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MapPin, Volume2, VolumeX, Trash2, MessageSquare, X, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Иконки для маркеров
const createCustomIcon = (color: string, type: 'noise' | 'quiet' | 'review' = 'review') => {
  const svg = type === 'review' 
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
    : type === 'noise'
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="width: 32px; height: 32px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">${svg}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Компонент для обновления центра карты
function MapCenterUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

// Компонент для клика по карте
function MapClickHandler({ onMapClick, clickMode }: { onMapClick: (lat: number, lng: number) => void; clickMode: string }) {
  const map = useMap();
  useEffect(() => {
    const handleClick = (e: L.LeafletMouseEvent) => {
      // Клик работает только в активном режиме
      if (clickMode !== 'none') {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    };
    
    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onMapClick, clickMode]);
  return null;
}

interface NoiseMapProps {
  showRoutePoints?: boolean;
}

export default function NoiseMap({ showRoutePoints = false }: NoiseMapProps) {
  const { 
    selectedCity, 
    noiseZones, 
    visibleLevels, 
    selectedZone, 
    setSelectedZone,
    reviews,
    notes,
    addReview,
    addNote,
    deleteNote,
    compareRoutes,
    routePoints,
    setRoutePoints,
    clearRoutePoint,
  } = useMapContext();
  const { user, isAuthenticated } = useUser();
  
  const [newReview, setNewReview] = useState({ rating: 3, comment: '', noiseLevel: 'medium' as NoiseLevel });
  const [newNote, setNewNote] = useState({ text: '', type: 'quiet' as 'noise' | 'quiet' });
  const [clickMode, setClickMode] = useState<'none' | 'routeA' | 'routeB' | 'note'>('none');
  const [tempLocation, setTempLocation] = useState<[number, number] | null>(null);
  const [showAuthError, setShowAuthError] = useState(false);

  const handleMapClick = (lat: number, lng: number) => {
    if (clickMode === 'routeA') {
      setRoutePoints({ ...routePoints, A: [lat, lng] });
      setClickMode('none');
    } else if (clickMode === 'routeB') {
      setRoutePoints({ ...routePoints, B: [lat, lng] });
      setClickMode('none');
    } else if (clickMode === 'note') {
      setTempLocation([lat, lng]);
      setClickMode('none');
    }
  };

  const handleAddNoteClick = () => {
    if (!isAuthenticated) {
      setShowAuthError(true);
      return;
    }
    setClickMode('note');
    setShowAuthError(false);
  };

  const handleAddReview = () => {
    if (selectedZone && isAuthenticated && user) {
      addReview({
        userId: user.id,
        userName: user.name,
        location: selectedZone.coordinates[0],
        noiseLevel: newReview.noiseLevel,
        rating: newReview.rating,
        comment: newReview.comment,
      });
      setNewReview({ rating: 3, comment: '', noiseLevel: 'medium' });
    }
  };

  const handleAddNote = () => {
    if (tempLocation && isAuthenticated && user) {
      addNote({
        userId: user.id,
        location: tempLocation,
        text: newNote.text,
        type: newNote.type,
      });
      setNewNote({ text: '', type: 'quiet' });
      setTempLocation(null);
    }
  };

  // Получаем цвет для индикатора комфорта маршрута
  const getComfortColor = (noiseLevel: number): string => {
    if (noiseLevel < 50) return '#22C55E';
    if (noiseLevel < 60) return '#84CC16';
    if (noiseLevel < 70) return '#EAB308';
    if (noiseLevel < 80) return '#F97316';
    return '#EF4444';
  };

  // Получаем текст для индикатора комфорта
  const getComfortText = (noiseLevel: number): string => {
    if (noiseLevel < 50) return 'Отлично';
    if (noiseLevel < 60) return 'Хорошо';
    if (noiseLevel < 70) return 'Средне';
    if (noiseLevel < 80) return 'Шумно';
    return 'Очень шумно';
  };

  // Рендеринг зоны шума в зависимости от формы
  const renderNoiseZone = (zone: typeof noiseZones[0]) => {
    if (!visibleLevels[zone.level]) return null;

    const commonProps = {
      key: zone.id,
      eventHandlers: {
        click: () => setSelectedZone(zone),
      },
    };

    // Круговая зона
    if (zone.shape === 'circle' && zone.coordinates[0] && zone.radius) {
      return (
        <Circle
          {...commonProps}
          center={zone.coordinates[0]}
          radius={zone.radius}
          pathOptions={{
            fillColor: noiseLevelColors[zone.level],
            fillOpacity: 0.4,
            color: noiseLevelColors[zone.level],
            weight: 2,
          }}
        />
      );
    }

    // Полигональная зона (по умолчанию)
    return (
      <Polygon
        {...commonProps}
        positions={zone.coordinates}
        pathOptions={{
          fillColor: noiseLevelColors[zone.level],
          fillOpacity: 0.4,
          color: noiseLevelColors[zone.level],
          weight: 2,
        }}
      />
    );
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={selectedCity.center}
        zoom={selectedCity.zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenterUpdater center={selectedCity.center} />
        <MapClickHandler onMapClick={handleMapClick} clickMode={clickMode} />

        {/* Шумовые зоны */}
        {noiseZones.map((zone) => renderNoiseZone(zone))}

        {/* Маркеры отзывов */}
        {reviews.map((review) => (
          <Marker
            key={review.id}
            position={review.location}
            icon={createCustomIcon(noiseLevelColors[review.noiseLevel], 'review')}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{review.userName}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: noiseLevelColors[review.noiseLevel] }}
                  >
                    {review.noiseLevel === 'low' ? 'Тихо' : review.noiseLevel === 'medium' ? 'Средне' : 'Шумно'}
                  </span>
                  <span className="text-gray-400">{new Date(review.timestamp).toLocaleDateString('ru-KZ')}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Маркеры заметок */}
        {notes.map((note) => (
          <Marker
            key={note.id}
            position={note.location}
            icon={createCustomIcon(note.type === 'noise' ? '#EF4444' : '#22C55E', note.type)}
          >
            <Popup>
              <div className="p-2 min-w-[150px]">
                <div className="flex items-center gap-2 mb-2">
                  {note.type === 'noise' ? (
                    <Volume2 className="w-4 h-4 text-red-500" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-sm font-medium">
                    {note.type === 'noise' ? 'Шумное место' : 'Тихое место'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{note.text}</p>
                {isAuthenticated && user?.id === note.userId && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => deleteNote(note.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Удалить
                  </Button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Точки маршрута (только если showRoutePoints = true) */}
        {showRoutePoints && routePoints.A && (
          <Circle
            center={routePoints.A}
            radius={100}
            pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.5 }}
          >
            <Popup>Точка A</Popup>
          </Circle>
        )}
        {showRoutePoints && routePoints.B && (
          <Circle
            center={routePoints.B}
            radius={100}
            pathOptions={{ color: '#8B5CF6', fillColor: '#8B5CF6', fillOpacity: 0.5 }}
          >
            <Popup>Точка B</Popup>
          </Circle>
        )}

        {/* Маршруты */}
        {compareRoutes.regular && (
          <Polyline
            positions={compareRoutes.regular.points}
            pathOptions={{ color: '#EF4444', weight: 4, opacity: 0.7, dashArray: '10, 10' }}
          />
        )}
        {compareRoutes.quiet && (
          <Polyline
            positions={compareRoutes.quiet.points}
            pathOptions={{ color: '#22C55E', weight: 4, opacity: 0.8 }}
          />
        )}
      </MapContainer>

      {/* Панель управления маршрутом (только если showRoutePoints = true) */}
      {showRoutePoints && (
        <div className="absolute top-4 left-4 z-30 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <h3 className="font-semibold mb-3">Построить маршрут</h3>
          
          {/* Ошибка авторизации */}
          {showAuthError && (
            <Alert variant="destructive" className="mb-3">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription className="text-xs">
                Зайдите в аккаунт, чтобы добавить заметку
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            {/* Точка A */}
            <div className="flex gap-2">
              <Button
                variant={clickMode === 'routeA' ? 'default' : routePoints.A ? 'secondary' : 'outline'}
                size="sm"
                className="flex-1 justify-start"
                onClick={() => setClickMode('routeA')}
              >
                <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                {routePoints.A ? 'Точка A ✓' : 'Установить точку A'}
              </Button>
              {routePoints.A && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2"
                  onClick={() => clearRoutePoint('A')}
                >
                  <X className="w-4 h-4 text-gray-500" />
                </Button>
              )}
            </div>
            
            {/* Точка B */}
            <div className="flex gap-2">
              <Button
                variant={clickMode === 'routeB' ? 'default' : routePoints.B ? 'secondary' : 'outline'}
                size="sm"
                className="flex-1 justify-start"
                onClick={() => setClickMode('routeB')}
              >
                <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                {routePoints.B ? 'Точка B ✓' : 'Установить точку B'}
              </Button>
              {routePoints.B && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2"
                  onClick={() => clearRoutePoint('B')}
                >
                  <X className="w-4 h-4 text-gray-500" />
                </Button>
              )}
            </div>
            
            {/* Кнопка добавления заметки */}
            <Button
              variant={clickMode === 'note' ? 'default' : 'outline'}
              size="sm"
              className="w-full justify-start"
              onClick={handleAddNoteClick}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Добавить заметку
            </Button>
          </div>
          
          {/* Подсказка о режиме клика */}
          {clickMode !== 'none' && (
            <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
              {clickMode === 'routeA' && 'Кликните на карте, чтобы установить точку A'}
              {clickMode === 'routeB' && 'Кликните на карте, чтобы установить точку B'}
              {clickMode === 'note' && 'Кликните на карте, чтобы добавить заметку'}
            </div>
          )}
        </div>
      )}

      {/* Индикатор комфорта маршрута */}
      {compareRoutes.quiet && (
        <div className="absolute bottom-4 left-4 z-30 bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: getComfortColor(compareRoutes.quiet.avgNoiseLevel) }}
            >
              {compareRoutes.quiet.avgNoiseLevel}
            </div>
            <div>
              <p className="text-xs text-gray-500">Уровень комфорта</p>
              <p className="font-medium" style={{ color: getComfortColor(compareRoutes.quiet.avgNoiseLevel) }}>
                {getComfortText(compareRoutes.quiet.avgNoiseLevel)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Диалог добавления заметки */}
      <Dialog open={!!tempLocation} onOpenChange={() => setTempLocation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить заметку</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={newNote.type} onValueChange={(v: 'noise' | 'quiet') => setNewNote({ ...newNote, type: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Тип заметки" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quiet">Тихое место</SelectItem>
                <SelectItem value="noise">Шумное место</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Описание..."
              value={newNote.text}
              onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
            />
            <Button onClick={handleAddNote} className="w-full">
              Добавить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог зоны с отзывами */}
      <Dialog open={!!selectedZone} onOpenChange={() => setSelectedZone(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedZone?.name}</DialogTitle>
          </DialogHeader>
          {selectedZone && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundColor: noiseLevelColors[selectedZone.level] }}
                >
                  {selectedZone.avgDb}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Средний уровень шума</p>
                  <p className="font-medium">{selectedZone.description}</p>
                  <span
                    className="inline-block mt-1 px-3 py-1 rounded-full text-xs text-white"
                    style={{ backgroundColor: noiseLevelColors[selectedZone.level] }}
                  >
                    {selectedZone.level === 'low' ? 'Низкий уровень' : selectedZone.level === 'medium' ? 'Средний уровень' : 'Высокий уровень'}
                  </span>
                </div>
              </div>

              {/* Форма отзыва */}
              {isAuthenticated ? (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Оставить отзыв</h4>
                  <div className="space-y-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                        >
                          <Star
                            className={`w-6 h-6 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        </button>
                      ))}
                    </div>
                    <Select
                      value={newReview.noiseLevel}
                      onValueChange={(v: NoiseLevel) => setNewReview({ ...newReview, noiseLevel: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Уровень шума" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Тихо</SelectItem>
                        <SelectItem value="medium">Средне</SelectItem>
                        <SelectItem value="high">Шумно</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea
                      placeholder="Ваш отзыв..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    />
                    <Button onClick={handleAddReview} className="w-full">
                      Отправить отзыв
                    </Button>
                  </div>
                </div>
              ) : (
                <Alert className="mt-4">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>
                    <a href="#" className="text-blue-600 hover:underline" onClick={(e) => { e.preventDefault(); /* открыть диалог входа */ }}>
                      Войдите
                    </a>, чтобы оставить отзыв
                  </AlertDescription>
                </Alert>
              )}

              {/* Список отзывов */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Отзывы ({reviews.filter(r => selectedZone.coordinates.some(c => 
                  Math.abs(c[0] - r.location[0]) < 0.01 && Math.abs(c[1] - r.location[1]) < 0.01
                )).length})</h4>
                <div className="space-y-3">
                  {reviews
                    .filter(r => selectedZone.coordinates.some(c => 
                      Math.abs(c[0] - r.location[0]) < 0.01 && Math.abs(c[1] - r.location[1]) < 0.01
                    ))
                    .map((review) => (
                      <div key={review.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{review.userName}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                        <span className="text-xs text-gray-400 mt-1 block">
                          {new Date(review.timestamp).toLocaleDateString('ru-KZ')}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
