import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  name: string;
}

const Header = ({ name }: HeaderProps) => {
  return (
    <motion.header 
      className="text-center py-3 md:py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1 
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2"
        style={{ 
          color: '#ff69b4',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
      >
        Happy Birthday, {name}! 🎉
      </motion.h1>
      <motion.p 
        className="text-base md:text-lg px-4 font-medium"
        style={{ color: '#213547' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Happy 23rd my sweet girl. I don't know where to start. There is so much I want to say. You deserve the world, but I'll give you the universe ✨
      </motion.p>
    </motion.header>
  );
};

export default Header; 