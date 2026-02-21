import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      variant="default"
      size="icon"
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
      onClick={scrollToTop}
      aria-label="Наверх"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
}
