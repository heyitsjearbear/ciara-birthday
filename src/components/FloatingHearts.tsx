import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  delay: number;
  size: number;
}

interface FloatingHeartsProps {
  isMobile?: boolean;
}

const FloatingHearts = ({ isMobile = false }: FloatingHeartsProps) => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const createHeart = () => {
      const heart: Heart = {
        id: Date.now(),
        x: Math.random() * 100,
        delay: Math.random() * 2,
        size: Math.random() * (isMobile ? 15 : 20) + (isMobile ? 8 : 10), // Smaller hearts on mobile
      };
      setHearts(prev => [...prev, heart]);

      // Remove heart after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== heart.id));
      }, 5000);
    };

    // Fewer hearts and slower interval on mobile for better performance
    const interval = setInterval(
      createHeart, 
      isMobile ? 3000 : 2000
    );
    
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0 text-love-pink"
          initial={{ y: '100vh', x: `${heart.x}vw`, opacity: 0 }}
          animate={{ y: '-20vh', opacity: [0, 1, 0] }}
          transition={{
            duration: 5,
            delay: heart.delay,
            ease: 'easeOut',
          }}
          style={{ fontSize: `${heart.size}px` }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts; 