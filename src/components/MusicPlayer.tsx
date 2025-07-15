import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Search, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist] = useState<Song[]>([
    {
      id: '1',
      title: 'Happy Birthday Song',
      artist: 'Birthday Music',
      url: '/happy-birthday.mp3' // You can add actual audio files or use YouTube embed
    },
    {
      id: '2', 
      title: 'Celebration',
      artist: 'Kool & The Gang',
      url: '/celebration.mp3'
    }
  ]);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play when component mounts
  useEffect(() => {
    if (playlist.length > 0 && !currentSong) {
      setCurrentSong(playlist[0]);
      setTimeout(() => {
        setIsPlaying(true);
      }, 1000); // Delay to ensure user interaction
    }
  }, [playlist, currentSong]);

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && !isMuted) {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted, currentSong]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Simulate YouTube search - in real implementation, you'd use YouTube API
      const searchResults = [
        {
          id: Date.now().toString(),
          title: searchQuery,
          artist: 'YouTube',
          url: `https://www.youtube.com/embed/search?q=${encodeURIComponent(searchQuery)}&autoplay=1`
        }
      ];
      setCurrentSong(searchResults[0]);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const nextSong = () => {
    if (currentSong && playlist.length > 1) {
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % playlist.length;
      setCurrentSong(playlist[nextIndex]);
    }
  };

  const prevSong = () => {
    if (currentSong && playlist.length > 1) {
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
      setCurrentSong(playlist[prevIndex]);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-30">
      {/* Main Music Control */}
      <div className="flex items-center gap-2">
        {showSearch && (
          <Card className="p-3 bg-background/90 backdrop-blur-sm border-border">
            <div className="flex items-center gap-2 min-w-[300px]">
              <Input
                placeholder="Search YouTube songs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button 
                size="sm" 
                onClick={handleSearch}
                className="bg-primary hover:bg-primary/90"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}
        
        <Card className="bg-background/90 backdrop-blur-sm border-border">
          <div className="flex items-center gap-1 p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSong}
              className="hover:bg-primary/20"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              className="hover:bg-primary/20"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-primary" />
              ) : (
                <Play className="w-5 h-5 text-primary" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSong}
              className="hover:bg-primary/20"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="hover:bg-primary/20"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Volume2 className="w-5 h-5 text-primary" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(!showSearch)}
              className="hover:bg-primary/20"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Current Song Display */}
      {currentSong && (
        <div className="mt-2 text-center">
          <Card className="p-2 bg-background/90 backdrop-blur-sm border-border">
            <p className="text-xs text-foreground font-medium truncate max-w-[200px]">
              {currentSong.title}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentSong.artist}
            </p>
          </Card>
        </div>
      )}

      {/* Audio Element */}
      {currentSong && currentSong.url.includes('.mp3') && (
        <audio
          ref={audioRef}
          src={currentSong.url}
          loop
          onEnded={nextSong}
        />
      )}

      {/* YouTube Embed (hidden) */}
      {currentSong && currentSong.url.includes('youtube') && (
        <iframe
          src={currentSong.url}
          style={{ display: 'none' }}
          allow="autoplay"
        />
      )}
    </div>
  );
}