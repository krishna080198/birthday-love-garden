import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function ConfettiButton() {
  const [confettiPieces, setConfettiPieces] = useState<Array<{id: number, color: string, x: number, y: number}>>([]);

  const triggerConfetti = () => {
    const colors = ['#ff69b4', '#da70d6', '#ff6b6b', '#ffd93d', '#6bcf7f'];
    const newPieces = [];
    
    for (let i = 0; i < 50; i++) {
      newPieces.push({
        id: Date.now() + i,
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }
    
    setConfettiPieces(newPieces);
    
    // Clear confetti after animation
    setTimeout(() => {
      setConfettiPieces([]);
    }, 3000);
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-playfair text-primary mb-12">
          Magical Surprise
        </h2>

        {/* Confetti Button */}
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground font-poppins">
            Ready for a magical surprise?
          </p>
          
          <button
            onClick={triggerConfetti}
            className="magical-button group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              <span className="font-poppins">Click me for a surprise!</span>
            </span>
            
            {/* Button shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000" />
          </button>
          
          {confettiPieces.length > 0 && (
            <div className="mt-8 p-6 bg-cream/50 rounded-lg">
              <h3 className="text-2xl font-playfair text-primary mb-2">
                🌟 You're the star today, shine on! 🌟
              </h3>
              <p className="text-foreground font-poppins">
                May your birthday be filled with endless joy, magical moments, and dreams come true!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confetti Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {confettiPieces.map(piece => (
          <div
            key={piece.id}
            className="absolute w-2 h-2 confetti-piece"
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              backgroundColor: piece.color,
              animationDelay: `${Math.random() * 0.5}s`
            }}
          />
        ))}
      </div>
    </section>
  );
}