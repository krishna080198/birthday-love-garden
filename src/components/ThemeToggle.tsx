import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="fixed top-6 left-6 z-50 flex items-center gap-3 bg-background/80 backdrop-blur-sm rounded-full p-3 border border-border shadow-soft">
      <Sun className={`w-4 h-4 transition-all duration-300 ${isDarkMode ? 'opacity-50 text-muted-foreground' : 'opacity-100 text-primary'}`} />
      <Switch 
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
      />
      <Moon className={`w-4 h-4 transition-all duration-300 ${isDarkMode ? 'opacity-100 text-primary' : 'opacity-50 text-muted-foreground'}`} />
    </div>
  );
}