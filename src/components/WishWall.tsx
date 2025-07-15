import { useState } from 'react';
import { Heart, Plus, MessageCircle } from 'lucide-react';

const initialWishes = [
  {
    id: 1,
    message: "Hope your birthday is as wonderful as you are! 🌟",
    author: "Your Bestie",
    color: "bg-blush-pink"
  },
  {
    id: 2,
    message: "Wishing you love, laughter, and all the happiness in the world! 💕",
    author: "Forever Friend",
    color: "bg-lavender"
  },
  {
    id: 3,
    message: "May this new year bring you amazing adventures and beautiful memories! 🌈",
    author: "Your Supporter",
    color: "bg-soft-red"
  },
  {
    id: 4,
    message: "You deserve all the joy and magic life has to offer! ✨",
    author: "Someone Special",
    color: "bg-cream"
  },
  {
    id: 5,
    message: "Happy birthday to someone who makes the world brighter! 🌻",
    author: "Your Admirer",
    color: "bg-rose-gold"
  }
];

export default function WishWall() {
  const [wishes, setWishes] = useState(initialWishes);
  const [newWish, setNewWish] = useState('');
  const [author, setAuthor] = useState('');
  const [showForm, setShowForm] = useState(false);

  const colors = ["bg-blush-pink", "bg-lavender", "bg-soft-red", "bg-cream", "bg-rose-gold", "bg-magical-purple"];

  const addWish = () => {
    if (newWish.trim() && author.trim()) {
      const wish = {
        id: Date.now(),
        message: newWish,
        author: author,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setWishes([...wishes, wish]);
      setNewWish('');
      setAuthor('');
      setShowForm(false);
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair text-primary mb-6">
            Birthday Wish Wall
          </h2>
          <p className="text-lg text-muted-foreground font-poppins max-w-2xl mx-auto">
            A collection of heartfelt wishes from everyone who loves you. 
            Each message is a reminder of how special you are!
          </p>
        </div>

        {/* Add wish button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowForm(true)}
            className="magical-button group"
          >
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-poppins">Add Your Wish</span>
          </button>
        </div>

        {/* Wish form */}
        {showForm && (
          <div className="max-w-md mx-auto mb-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-soft">
            <h3 className="text-xl font-playfair text-primary mb-4">Share Your Birthday Wish</h3>
            <div className="space-y-4">
              <textarea
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                placeholder="Write your heartfelt birthday message..."
                className="w-full p-3 bg-white/70 border border-primary/30 rounded-lg font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                rows={3}
              />
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                className="w-full p-3 bg-white/70 border border-primary/30 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <div className="flex space-x-3">
                <button
                  onClick={addWish}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-poppins hover:bg-primary/90 transition-colors"
                >
                  Add Wish
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-lg font-poppins hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Wishes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish, index) => (
            <div
              key={wish.id}
              className={`sticky-note ${wish.color} text-foreground relative group cursor-pointer`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: `${4 + (index % 3)}s`
              }}
            >
              <div className="absolute top-2 right-2">
                <MessageCircle className="w-4 h-4 text-foreground/50" />
              </div>
              
              <p className="font-poppins text-sm mb-4 leading-relaxed">
                {wish.message}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/70 font-poppins">
                  — {wish.author}
                </span>
                <Heart className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
              </div>
              
              {/* Tape effect */}
              <div className="absolute -top-2 left-4 w-8 h-4 bg-white/60 rounded-sm transform -rotate-12 shadow-sm"></div>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="text-center mt-16">
          <div className="inline-block p-4 bg-primary/10 rounded-full">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <p className="mt-4 text-muted-foreground font-poppins italic">
            "Surrounded by love and good wishes"
          </p>
        </div>
      </div>
    </section>
  );
}