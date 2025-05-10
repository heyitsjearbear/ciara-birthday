import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import Header from './components/Header';
import PhotoCarousel from './components/PhotoCarousel';
import MusicPlayer from './components/MusicPlayer';
import FloatingHearts from './components/FloatingHearts';
import './App.css';

function App() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    if (windowSize.width < 768) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [windowSize.width]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="fixed inset-0 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #e6e6fa 0%, #ffb6c1 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-auto">
        {showConfetti && (
          <Confetti 
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={windowSize.width < 768 ? 100 : 200}
          />
        )}
        <FloatingHearts isMobile={windowSize.width < 768} />
        
        <main className="max-w-4xl mx-auto px-4 py-4 md:py-6 min-h-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl">
            <Header name="Ciara" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-2 md:mt-4"
            >
              <PhotoCarousel />
            </motion.div>

            <MusicPlayer 
              isPlaying={isMusicPlaying}
              onToggle={() => setIsMusicPlaying(!isMusicPlaying)}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App; 