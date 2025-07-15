import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/components/HeroSection';
import DiarySection from '@/components/DiarySection';
import ConfettiButton from '@/components/ConfettiButton';
import LoveLetterGenerator from '@/components/LoveLetterGenerator';
import MagicCandle from '@/components/MagicCandle';
import WishWall from '@/components/WishWall';
import ExitPage from '@/components/ExitPage';
import ThemeToggle from '@/components/ThemeToggle';
import MusicPlayer from '@/components/MusicPlayer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const sections = [
    'hero',
    'diary', 
    'confetti',
    'love-letter',
    'candle',
    'wishes',
    'exit'
  ];

  useEffect(() => {
    if (!isLoading) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const sectionIndex = Math.floor(scrollPosition / windowHeight);
        setCurrentSection(Math.min(sectionIndex, sections.length - 1));
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isLoading, sections.length]);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-dreamy">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Music Player */}
      <MusicPlayer />
      
      {/* Navigation dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="space-y-3">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => {
                window.scrollTo({
                  top: index * window.innerHeight,
                  behavior: 'smooth'
                });
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-primary scale-125' 
                  : 'bg-primary/30 hover:bg-primary/60'
              }`}
              title={section.charAt(0).toUpperCase() + section.slice(1)}
            />
          ))}
        </div>
      </div>

      {/* Sections */}
      <HeroSection />
      <DiarySection />
      <ConfettiButton />
      <LoveLetterGenerator />
      <MagicCandle />
      <WishWall />
      <ExitPage />
    </div>
  );
};

export default Index;
