import { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const diaryPages = [
  {
    title: "A Letter From The Heart",
    content: "On this special day, I just want to say how much you mean to me. Your smile lights up every room you enter, and your kindness touches everyone around you. You have this incredible ability to make ordinary moments feel magical."
  },
  {
    title: "Your Beautiful Spirit", 
    content: "Thank you for existing and brightening every space you enter. Your laughter is contagious, your dreams are inspiring, and your friendship is a treasure I cherish every single day. You make the world a better place just by being in it."
  },
  {
    title: "Wishes For You",
    content: "Here's to more memories, more smiles, and more happiness. May this new year bring you adventures that make your heart sing, love that makes you feel cherished, and moments that take your breath away."
  },
  {
    title: "Always Remember",
    content: "You are stronger than you believe, more talented than you know, and more loved than you could ever imagine. Never forget how special you are and how much joy you bring to everyone lucky enough to know you."
  }
];

export default function DiarySection() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, diaryPages.length - 1));
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-playfair text-primary mb-8">
          Your Personal Diary
        </h2>
        <p className="text-lg text-muted-foreground mb-12 font-poppins">
          Click to open a collection of heartfelt messages written just for you
        </p>

        {!isOpen ? (
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="group relative"
            >
              <div className="diary-page w-80 h-96 mx-auto flex items-center justify-center transform transition-all duration-500 hover:scale-105 hover:shadow-dreamy">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-playfair text-primary mb-2">Open Your Diary</h3>
                  <p className="text-muted-foreground font-poppins">Tap to reveal your messages</p>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div className="relative max-w-2xl mx-auto">
            <div className="diary-page min-h-96 relative overflow-hidden">
              <div className="absolute top-4 left-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              
              <div className="pt-12 pb-16">
                <h3 className="text-2xl font-playfair text-primary mb-6">
                  {diaryPages[currentPage].title}
                </h3>
                <p className="text-foreground leading-relaxed font-poppins text-lg">
                  {diaryPages[currentPage].content}
                </p>
              </div>

              <div className="absolute bottom-4 right-4 text-sm text-muted-foreground font-poppins">
                Page {currentPage + 1} of {diaryPages.length}
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="font-poppins">Previous</span>
              </button>

              <div className="flex space-x-2">
                {diaryPages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentPage ? 'bg-primary' : 'bg-primary/30'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === diaryPages.length - 1}
                className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition-colors"
              >
                <span className="font-poppins">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}