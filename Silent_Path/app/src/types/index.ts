// Типы данных для SilentPath

export type NoiseLevel = 'low' | 'medium' | 'high';

export interface NoiseZone {
  id: string;
  name: string;
  coordinates: [number, number][];
  level: NoiseLevel;
  avgDb: number;
  description: string;
  shape?: 'polygon' | 'circle' | 'rectangle';
  radius?: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  location: [number, number];
  noiseLevel: NoiseLevel;
  rating: number;
  comment: string;
  timestamp: string;
  likes: number;
}

export interface Note {
  id: string;
  userId: string;
  location: [number, number];
  text: string;
  type: 'noise' | 'quiet';
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface RoutePoint {
  lat: number;
  lng: number;
  address?: string;
}

export interface Route {
  id: string;
  name: string;
  points: [number, number][];
  distance: number;
  duration: number;
  avgNoiseLevel: number;
  noiseScore: number;
}

export interface TimeSlot {
  hour: number;
  label: string;
  noiseLevel: number;
  trafficIntensity: 'low' | 'medium' | 'high';
}

export interface City {
  id: string;
  name: string;
  center: [number, number];
  zoom: number;
}

export interface HealthEffect {
  id: string;
  title: string;
  description: string;
  icon: string;
  dbRange: string;
  color: string;
}
