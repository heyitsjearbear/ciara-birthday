import React, { useState, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';

interface PasswordScreenProps {
  onCorrectPassword: () => void;
}

const PasswordScreen = ({ onCorrectPassword }: PasswordScreenProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (password === '1215') {
      onCorrectPassword();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-romantic-purple to-soft-pink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg p-8 max-w-md w-full mx-4"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-love-pink">
          Enter Password
        </h2>
        <div className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink transition-all
                ${error ? 'border-red-500 shake' : 'border-gray-200'}`}
              placeholder="Enter password"
              autoFocus
            />
          </div>
          <motion.button
            onClick={handleSubmit}
            className="w-full btn-primary"
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
          {error && (
            <motion.p
              className="text-red-500 text-center text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Incorrect password. Please try again.
            </motion.p>
          )}
        </div>
      </motion.div>
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </motion.div>
  );
};

export default PasswordScreen; 