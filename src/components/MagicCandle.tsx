import { useState } from 'react';
import { Cake, Sparkles } from 'lucide-react';

export default function MagicCandle() {
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const blowCandle = () => {
    setIsBlownOut(true);
    setTimeout(() => {
      setShowMessage(true);
    }, 1000);
  };

  const resetCandle = () => {
    setIsBlownOut(false);
    setShowMessage(false);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-magical-purple/20 to-rose-gold/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-playfair text-primary mb-8">
          Make a Wish
        </h2>
        <p className="text-lg text-muted-foreground font-poppins mb-12">
          Click the candle to blow it out and make your birthday wish come true!
        </p>

        <div className="relative max-w-md mx-auto">
          {/* Birthday Cake */}
          <div className="bg-cream rounded-t-full rounded-b-lg p-8 shadow-dreamy relative overflow-hidden">
            {/* Cake layers */}
            <div className="space-y-2">
              <div className="h-12 bg-gradient-to-r from-soft-red to-primary rounded-lg mx-4"></div>
              <div className="h-12 bg-gradient-to-r from-lavender to-magical-purple rounded-lg mx-6"></div>
              <div className="h-12 bg-gradient-to-r from-rose-gold to-blush-pink rounded-lg mx-2"></div>
            </div>

            {/* Candle */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-12 bg-cream rounded-full border-2 border-primary"></div>
              
              {/* Flame */}
              {!isBlownOut && (
                <div 
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 cursor-pointer"
                  onClick={blowCandle}
                >
                  <div className="w-3 h-6 bg-gradient-to-t from-soft-red to-cream rounded-full candle-flame"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent rounded-full candle-flame"></div>
                </div>
              )}

              {/* Smoke effect when blown out */}
              {isBlownOut && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-8 bg-gradient-to-t from-gray-400 to-transparent rounded-full opacity-60"></div>
                </div>
              )}
            </div>

            {/* Sparkles around cake */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute w-4 h-4 text-primary/40 sparkle-animation"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.4}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Cake stand */}
          <div className="h-6 bg-gradient-to-r from-rose-gold to-primary rounded-b-lg mx-8 shadow-soft"></div>
        </div>

        {/* Wish message */}
        {showMessage && (
          <div className="mt-12 p-8 bg-white/50 backdrop-blur-sm rounded-2xl shadow-dreamy fade-in-up">
            <div className="mb-4">
              <Sparkles className="w-8 h-8 text-primary mx-auto" />
            </div>
            <h3 className="text-2xl font-playfair text-primary mb-4">
              Your wish has been sent to the stars! ✨
            </h3>
            <p className="text-foreground font-poppins text-lg mb-6">
              May this year be full of magic, joy, and love — just like you! 
              Every moment of your special day should be filled with wonder and happiness.
            </p>
            <button
              onClick={resetCandle}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors font-poppins"
            >
              Light the candle again
            </button>
          </div>
        )}

        {!isBlownOut && (
          <p className="mt-8 text-muted-foreground font-poppins italic">
            "Close your eyes, make a wish, and blow out the candle"
          </p>
        )}
      </div>
    </section>
  );
}