import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play relaxing music when component mounts
  useEffect(() => {
    // Create audio element with relaxing music URL
    if (audioRef.current) {
      // You can replace this with actual relaxing music URL
      audioRef.current.src = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3; // Set low volume for background music
      
      // Auto-play after short delay
      const timer = setTimeout(() => {
        if (audioRef.current && isPlaying) {
          audioRef.current.play().catch(() => {
            // Handle autoplay restrictions
            setIsPlaying(false);
          });
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && !isMuted) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-6 right-6 z-30">
      <Button
        onClick={toggleMusic}
        variant="ghost"
        size="sm"
        className="bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90 p-3 rounded-full shadow-soft"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-primary" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        )}
      </Button>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        preload="auto"
      />
    </div>
  );
}