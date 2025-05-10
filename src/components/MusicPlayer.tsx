import React, { useEffect, useRef, useState } from 'react';
import { FaMusic, FaVolumeMute } from 'react-icons/fa';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const MusicPlayer = ({ isPlaying, onToggle }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioError, setAudioError] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (audioRef.current && !audioError) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log('Audio playback error:', error);
            setAudioError(true);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioError]);

  const handleAudioError = () => {
    setAudioError(true);
    console.log('Error loading audio file. Make sure to add birthday-song.mp3 to /public/music/');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={onToggle}
        className="btn-primary flex items-center gap-1 md:gap-2 text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        disabled={audioError}
        title={audioError ? 'Audio file not found. Add birthday-song.mp3 to /public/music/' : ''}
      >
        {isPlaying ? <FaMusic className="text-sm md:text-base" /> : <FaVolumeMute className="text-sm md:text-base" />}
        <span>{audioError 
          ? (isMobile ? 'No music' : 'Music unavailable') 
          : isPlaying 
            ? (isMobile ? 'On' : 'Music On') 
            : (isMobile ? 'Off' : 'Music Off')}
        </span>
      </button>
      
      <audio
        ref={audioRef}
        src="/music/birthday-song.mp3"
        loop
        preload="auto"
        onError={handleAudioError}
      />
    </div>
  );
};

export default MusicPlayer; 