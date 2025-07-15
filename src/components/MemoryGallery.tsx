import { Heart, Camera } from 'lucide-react';

const memoryPhotos = [
  {
    id: 1,
    caption: "Making memories together 💕",
    placeholder: "photo-1649972904349-6e44c42644a7"
  },
  {
    id: 2,
    caption: "Your beautiful smile ✨",
    placeholder: "photo-1581091226825-a6a2a5aee158"
  },
  {
    id: 3,
    caption: "Adventures and laughter 🌟",
    placeholder: "photo-1470813740244-df37b8c1edcb"
  },
  {
    id: 4,
    caption: "Cherishing every moment 🌸",
    placeholder: "photo-1465146344425-f00d5f5c8f07"
  },
  {
    id: 5,
    caption: "Friendship goals forever 💖",
    placeholder: "photo-1500673922987-e212871fec22"
  },
  {
    id: 6,
    caption: "Pure joy and happiness 🌈",
    placeholder: "photo-1582562124811-c09040d0a901"
  }
];

export default function MemoryGallery() {
  return (
    <section className="py-20 px-6 bg-white/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair text-primary mb-6">
            Memory Lane
          </h2>
          <p className="text-lg text-muted-foreground font-poppins max-w-2xl mx-auto">
            A collection of beautiful moments we've shared. Each photo tells a story 
            of friendship, laughter, and the special bond we have.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memoryPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="polaroid-photo group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded bg-gray-200 aspect-square mb-4">
                <img
                  src={`https://images.unsplash.com/${photo.placeholder}?w=400&h=400&fit=crop`}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating hearts on hover */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <Heart
                      key={i}
                      className="absolute w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`,
                        animationDelay: `${i * 0.2}s`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-center font-poppins text-foreground font-medium">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Camera decoration */}
        <div className="text-center mt-16">
          <div className="inline-block p-4 bg-primary/10 rounded-full">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <p className="mt-4 text-muted-foreground font-poppins italic">
            "Every picture tells our story"
          </p>
        </div>
      </div>
    </section>
  );
}