import { Heart, Download, Camera, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function ExitPage() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const content = `
🎂 Happy Birthday Beautiful Soul! 🎂

This little surprise was made just for you, because you're one of the most special people in my life. 

You bring so much joy, laughter, and light into this world. Your kindness touches everyone around you, and your smile has the power to brighten even the darkest days.

As you celebrate another year of your amazing life, remember:
• You are loved more than you know
• You are stronger than you believe  
• You are more talented than you realize
• You deserve all the happiness in the world

May this new year bring you:
✨ Adventures that make your heart sing
💕 Love that makes you feel cherished  
🌟 Moments that take your breath away
🌈 Dreams that become reality

Thank you for being exactly who you are. The world is a better place with you in it.

Happy Birthday once again! 🎉

With all my love,
Your Special Someone 💌

---
Generated with love from your personalized birthday website
${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Birthday-Letter.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  const takeScreenshot = () => {
    // In a real app, you might use html2canvas or similar
    alert('Screenshot feature would capture this beautiful page for you to keep forever! 📸');
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blush-pink/30 to-lavender/30 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto text-center">
        {/* Floating hearts decoration */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-primary/20 floating-hearts"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 15 + 8}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-4 sparkle-animation" />
          </div>

          <h1 className="text-4xl md:text-6xl font-playfair text-primary mb-8 leading-tight">
            Until We Meet Again
          </h1>

          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-dreamy mb-12">
            <p className="text-lg md:text-xl text-foreground font-poppins leading-relaxed mb-6">
              This little surprise was made just for you, because you're one of the most 
              <span className="text-primary font-semibold"> special people </span> 
              in my life.
            </p>
            
            <p className="text-lg text-foreground font-poppins leading-relaxed mb-6">
              You bring so much <span className="text-accent font-semibold">joy, laughter, and light</span> into this world. 
              Your kindness touches everyone around you, and your smile has the power to brighten even the darkest days.
            </p>
            
            <p className="text-lg text-foreground font-poppins leading-relaxed mb-8">
              As you celebrate another year of your amazing life, remember that you are 
              <span className="text-primary font-semibold"> loved, valued, and cherished</span> beyond measure.
            </p>

            <div className="flex items-center justify-center space-x-4 mb-8">
              <Heart className="w-6 h-6 text-primary heartbeat" />
              <span className="text-2xl font-playfair text-primary">Happy Birthday Once Again</span>
              <Heart className="w-6 h-6 text-primary heartbeat" />
            </div>

            <p className="text-base text-muted-foreground font-poppins italic">
              "The best birthdays are the ones shared with people who make life beautiful"
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground font-poppins mb-8">
              Take a piece of this magic with you
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button
                onClick={handleDownload}
                className="magical-button group flex-1"
              >
                <Download className={`w-5 h-5 mr-2 ${downloaded ? 'text-green-400' : ''}`} />
                <span className="font-poppins">
                  {downloaded ? 'Downloaded!' : 'Download Letter'}
                </span>
              </button>
              
              <button
                onClick={takeScreenshot}
                className="bg-secondary text-secondary-foreground px-6 py-4 rounded-full font-poppins hover:bg-secondary/80 transition-colors group flex-1 flex items-center justify-center"
              >
                <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                <span>Save Memory</span>
              </button>
            </div>

            {downloaded && (
              <div className="mt-8 p-4 bg-green-100 text-green-800 rounded-lg font-poppins">
                ✨ Your personal birthday letter has been saved! Keep it as a reminder of how loved you are.
              </div>
            )}
          </div>

          {/* Signature */}
          <div className="mt-16 pt-8 border-t border-primary/20">
            <p className="text-foreground font-poppins">
              Made with 💌 by someone who cares about you
            </p>
            <p className="text-sm text-muted-foreground font-poppins mt-2">
              {new Date().getFullYear()} • A Birthday Celebration
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}