import { useState } from 'react';
import { MapPin, Menu, X, Volume2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthDialog from './AuthDialog';
import { useMap } from '@/contexts/MapContext';
import { cities } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'map', label: 'Карта шума', icon: MapPin },
  { id: 'routes', label: 'Тихие маршруты', icon: Volume2 },
  { id: 'chart', label: 'График шума', icon: Volume2 },
  { id: 'health', label: 'О здоровье', icon: Volume2 },
  { id: 'recommendations', label: 'Рекомендации', icon: Volume2 },
  { id: 'about', label: 'О нас / FAQ', icon: Volume2 },
];

export default function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { selectedCity, setSelectedCity } = useMap();

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-[1100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - кликабельная для возврата на главную */}
          <button 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={() => onSectionChange('hero')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SilentPath
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Кнопка главной */}
            <Button
              variant={activeSection === 'hero' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onSectionChange('hero')}
            >
              <Home className="w-4 h-4 mr-1" />
              Главная
            </Button>

            {/* City Selector */}
            <Select 
              value={selectedCity.id} 
              onValueChange={(cityId) => {
                const city = cities.find(c => c.id === cityId);
                if (city) setSelectedCity(city);
              }}
            >
              <SelectTrigger className="w-[130px]">
                <MapPin className="w-4 h-4 mr-2" />
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

            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onSectionChange(item.id)}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Auth */}
            <AuthDialog />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="space-y-4">
              {/* Кнопка главной мобильная */}
              <Button
                variant={activeSection === 'hero' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => {
                  onSectionChange('hero');
                  setMobileMenuOpen(false);
                }}
              >
                <Home className="w-4 h-4 mr-2" />
                Главная
              </Button>

              {/* City Selector Mobile */}
              <Select 
                value={selectedCity.id} 
                onValueChange={(cityId) => {
                  const city = cities.find(c => c.id === cityId);
                  if (city) setSelectedCity(city);
                }}
              >
                <SelectTrigger>
                  <MapPin className="w-4 h-4 mr-2" />
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

              {/* Nav Links Mobile */}
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => {
                      onSectionChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                ))}
              </div>

              {/* Auth Mobile */}
              <div className="pt-4 border-t">
                <AuthDialog />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
