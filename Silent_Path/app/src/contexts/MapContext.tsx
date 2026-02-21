import React, { createContext, useContext, useState, useCallback } from 'react';
import type { NoiseZone, Review, Note, Route, City } from '@/types';
import { 
  allNoiseZones, 
  mockReviews, 
  mockNotes, 
  cities,
  allTimeSlots 
} from '@/data/mockData';

interface MapContextType {
  // Город
  selectedCity: City;
  setSelectedCity: (city: City) => void;
  
  // Зоны шума
  noiseZones: NoiseZone[];
  selectedZone: NoiseZone | null;
  setSelectedZone: (zone: NoiseZone | null) => void;
  visibleLevels: { low: boolean; medium: boolean; high: boolean };
  toggleLevel: (level: 'low' | 'medium' | 'high') => void;
  
  // Отзывы
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'timestamp' | 'likes'>) => void;
  
  // Заметки
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'timestamp'>) => void;
  deleteNote: (noteId: string) => void;
  
  // Маршруты
  activeRoute: Route | null;
  setActiveRoute: (route: Route | null) => void;
  compareRoutes: { regular: Route | null; quiet: Route | null };
  setCompareRoutes: (routes: { regular: Route | null; quiet: Route | null }) => void;
  
  // Точки маршрута
  routePoints: { A: [number, number] | null; B: [number, number] | null };
  setRoutePoints: (points: { A: [number, number] | null; B: [number, number] | null }) => void;
  clearRoutePoint: (point: 'A' | 'B') => void;
  
  // График шума по городам
  getTimeSlotsForCity: (cityId: string) => typeof allTimeSlots['almaty'];
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCityState] = useState<City>(cities[0]);
  const [noiseZones, setNoiseZones] = useState<NoiseZone[]>(allNoiseZones['almaty']);
  const [selectedZone, setSelectedZone] = useState<NoiseZone | null>(null);
  const [visibleLevels, setVisibleLevels] = useState({
    low: true,
    medium: true,
    high: true,
  });
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [compareRoutes, setCompareRoutes] = useState<{ regular: Route | null; quiet: Route | null }>({
    regular: null,
    quiet: null,
  });
  const [routePoints, setRoutePoints] = useState<{ A: [number, number] | null; B: [number, number] | null }>({
    A: null,
    B: null,
  });

  // Обновляем зоны шума при смене города
  const setSelectedCity = useCallback((city: City) => {
    setSelectedCityState(city);
    setNoiseZones(allNoiseZones[city.id] || allNoiseZones['almaty']);
    // Сбрасываем маршруты при смене города
    setRoutePoints({ A: null, B: null });
    setCompareRoutes({ regular: null, quiet: null });
    setActiveRoute(null);
  }, []);

  const toggleLevel = useCallback((level: 'low' | 'medium' | 'high') => {
    setVisibleLevels(prev => ({ ...prev, [level]: !prev[level] }));
  }, []);

  const addReview = useCallback((review: Omit<Review, 'id' | 'timestamp' | 'likes'>) => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      timestamp: new Date().toISOString(),
      likes: 0,
    };
    setReviews(prev => [newReview, ...prev]);
  }, []);

  const addNote = useCallback((note: Omit<Note, 'id' | 'timestamp'>) => {
    const newNote: Note = {
      ...note,
      id: `note-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
  }, []);

  const deleteNote = useCallback((noteId: string) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
  }, []);

  const clearRoutePoint = useCallback((point: 'A' | 'B') => {
    setRoutePoints(prev => ({ ...prev, [point]: null }));
    setCompareRoutes({ regular: null, quiet: null });
    setActiveRoute(null);
  }, []);

  const getTimeSlotsForCity = useCallback((cityId: string) => {
    return allTimeSlots[cityId] || allTimeSlots['almaty'];
  }, []);

  return (
    <MapContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        noiseZones,
        selectedZone,
        setSelectedZone,
        visibleLevels,
        toggleLevel,
        reviews,
        addReview,
        notes,
        addNote,
        deleteNote,
        activeRoute,
        setActiveRoute,
        compareRoutes,
        setCompareRoutes,
        routePoints,
        setRoutePoints,
        clearRoutePoint,
        getTimeSlotsForCity,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
}
