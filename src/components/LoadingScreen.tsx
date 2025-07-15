import { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-dreamy flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          <Heart className="w-16 h-16 text-primary mx-auto heartbeat" />
        </div>
        
        <h2 className="text-2xl font-playfair text-foreground mb-4">
          Loading your surprise...
        </h2>
        
        <div className="w-64 bg-white/30 rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-muted-foreground font-poppins">
          {progress}% complete
        </p>
        
        {/* Floating hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className={`absolute w-6 h-6 text-primary/50 floating-hearts`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
        
        {/* Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <Sparkles
              key={i}
              className={`absolute w-4 h-4 text-lavender sparkle-animation`}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 25}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}