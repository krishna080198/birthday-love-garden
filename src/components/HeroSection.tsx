import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function HeroSection() {
  const [fireworks, setFireworks] = useState<Array<{id: number, x: number, y: number}>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newFirework = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 50
      };
      setFireworks(prev => [...prev, newFirework]);
      
      setTimeout(() => {
        setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
      }, 2000);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const friendName = "Sandesh"; // You can customize this

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/20 floating-hearts"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Fireworks */}
      {fireworks.map(fw => (
        <div
          key={fw.id}
          className="absolute w-8 h-8 pointer-events-none"
          style={{ left: `${fw.x}%`, top: `${fw.y}%` }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full sparkle-animation"></div>
            <div className="absolute inset-0 bg-lavender rounded-full sparkle-animation" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute inset-0 bg-soft-red rounded-full sparkle-animation" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      ))}

      {/* Main Content */}
      <div className="text-center z-10 px-6 max-w-4xl mx-auto">
        <div className="fade-in-up">
          <h1 className="text-6xl md:text-8xl font-playfair text-primary mb-6 leading-tight">
            Happy Birthday
          </h1>
          <h2 className="text-4xl md:text-5xl font-playfair text-accent mb-8">
            {friendName} 💌
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-poppins mb-12 max-w-2xl mx-auto">
            Today is all about celebrating the wonderful person you are. 
            Get ready for a magical journey filled with love, memories, and surprises!
          </p>
        </div>
        

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}