import { useState } from 'react';
import { Heart, Sparkles, Wand2 } from 'lucide-react';

const loveMessages = {
  smile: "Your smile is like sunshine breaking through clouds, warming every heart it touches and lighting up the world around you. 🌞",
  us: "The story of us is written in laughter, painted with memories, and bound together with an unbreakable friendship that I treasure deeply. 💝",
  dream: "Your dreams are as beautiful as you are, and I believe in every single one of them. Keep reaching for the stars! ⭐",
  happy: "Happiness looks good on you, and seeing you happy makes my world brighter. You deserve all the joy life has to offer. 😊",
  love: "Love surrounds you today and always - from friends, family, and everyone whose life you've touched with your kindness. ❤️",
  special: "You're special in ways that words can't capture, with a heart so pure and a spirit so bright that you inspire everyone around you. ✨",
  beautiful: "Beautiful inside and out, you radiate grace, kindness, and joy wherever you go. The world is more beautiful because you're in it. 🌸",
  friend: "Friendship with you is one of life's greatest gifts - filled with trust, laughter, support, and countless precious memories. 🤗",
  amazing: "Amazing doesn't even begin to describe you. You're extraordinary, wonderful, and absolutely one-of-a-kind! 🌟",
  birthday: "Birthdays are nature's way of telling us to eat more cake and celebrate incredible people like you! 🎂"
};

export default function LoveLetterGenerator() {
  const [inputWord, setInputWord] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMessage = () => {
    if (!inputWord.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const word = inputWord.toLowerCase().trim();
      const message = loveMessages[word as keyof typeof loveMessages] || 
        `The word "${inputWord}" makes me think of how wonderful you are! You bring meaning to every word, every moment, and every memory we share. 💖`;
      
      setGeneratedMessage(message);
      setIsGenerating(false);
    }, 1500);
  };

  const resetGenerator = () => {
    setInputWord('');
    setGeneratedMessage('');
  };

  return (
    <section className="py-20 px-6 bg-white/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-playfair text-primary mb-8">
          Love Letter Generator
        </h2>
        <p className="text-lg text-muted-foreground font-poppins mb-12 max-w-2xl mx-auto">
          Type a word that makes you think of happiness, and watch as it transforms 
          into a personalized message filled with love and good wishes!
        </p>

        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-soft">
            <div className="mb-6">
              <Wand2 className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-playfair text-primary">What word speaks to your heart?</h3>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
                placeholder="Try words like: smile, love, dream, happy..."
                className="w-full p-4 bg-white/70 border border-primary/30 rounded-lg font-poppins text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                onKeyPress={(e) => e.key === 'Enter' && generateMessage()}
              />
              
              <button
                onClick={generateMessage}
                disabled={!inputWord.trim() || isGenerating}
                className="w-full magical-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span className="font-poppins">Creating magic...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span className="font-poppins">Generate Love Message</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {generatedMessage && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-cream/50 backdrop-blur-sm rounded-2xl p-8 shadow-dreamy fade-in-up">
              <div className="mb-4">
                <Heart className="w-8 h-8 text-primary mx-auto heartbeat" />
              </div>
              
              <h3 className="text-2xl font-playfair text-primary mb-4">
                Your Word: "{inputWord}"
              </h3>
              
              <p className="text-lg text-foreground font-poppins leading-relaxed mb-6">
                {generatedMessage}
              </p>
              
              <button
                onClick={resetGenerator}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors font-poppins"
              >
                Try Another Word
              </button>
            </div>
          </div>
        )}

        {/* Suggestion words */}
        <div className="mt-8">
          <p className="text-sm text-muted-foreground font-poppins mb-4">
            Popular words to try:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(loveMessages).slice(0, 6).map(word => (
              <button
                key={word}
                onClick={() => setInputWord(word)}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-poppins hover:bg-primary/20 transition-colors"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}