import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaHeart, FaImage } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PhotoCarousel = () => {
  const sliderRef = useRef<Slider>(null);
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});
  const [imageDimensions, setImageDimensions] = useState<{[key: number]: { width: number; height: number }}>({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    adaptiveHeight: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    pauseOnHover: true,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    customPaging: (i: number) => (
      <div
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === currentSlide 
            ? 'bg-pink-500 w-4' 
            : 'bg-gray-300 hover:bg-pink-300'
        }`}
        aria-label={`Go to photo ${i + 1}`}
        role="button"
        tabIndex={0}
      />
    ),
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({...prev, [index]: true}));
  };

  const handleImageLoad = (index: number, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    setImageDimensions(prev => ({
      ...prev,
      [index]: { width: img.naturalWidth, height: img.naturalHeight }
    }));
  };

  const photos = [
    '/photos/photo1.jpg',
    '/photos/photo2.jpg',
    '/photos/photo3.jpg',
    '/photos/photo4.jpg',
    '/photos/photo5.jpg',
    '/photos/photo6.jpg',
    '/photos/photo7.jpg',
  ];

  const placeholderColors = [
    'bg-gradient-to-br from-pink-300 via-purple-200 to-pink-100',
    'bg-gradient-to-br from-purple-300 via-pink-200 to-purple-100',
    'bg-gradient-to-br from-pink-300 via-red-200 to-pink-100',
    'bg-gradient-to-br from-red-300 via-pink-200 to-red-100',
    'bg-gradient-to-br from-purple-300 via-red-200 to-purple-100',
    'bg-gradient-to-br from-pink-400 via-purple-200 to-pink-100',
    'bg-gradient-to-br from-purple-400 via-pink-200 to-purple-100',
    'bg-gradient-to-br from-red-400 via-pink-200 to-red-100',
    'bg-gradient-to-br from-pink-300 via-red-200 to-pink-200',
    'bg-gradient-to-br from-purple-300 via-pink-200 to-red-100',
  ];

  const buttonClasses = "absolute top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white hover:scale-110 rounded-full p-2 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300 backdrop-blur-sm";

  return (
    <div className="relative w-full mx-auto group">
      <div className="px-6">
        <Slider ref={sliderRef} {...settings}>
          {photos.map((photo, index) => (
            <div key={index} className="px-1">
              <motion.div 
                className={`relative rounded-lg overflow-hidden shadow-xl ${placeholderColors[index % placeholderColors.length]} flex items-center justify-center`}
                style={{ 
                  height: 'calc(100vh - 250px)', // Account for header and padding
                  transition: 'all 0.3s ease-in-out'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  {imageErrors[index] ? (
                    <motion.div 
                      className="absolute inset-0 flex flex-col items-center justify-center text-white"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <FaImage size={isMobile ? 48 : 56} className="text-white/30" />
                        <FaHeart 
                          size={isMobile ? 24 : 28} 
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500 animate-pulse" 
                        />
                      </div>
                      <p className="mt-4 text-sm md:text-base text-center px-4 font-medium text-pink-900/70">
                        This photo couldn't be loaded
                      </p>
                    </motion.div>
                  ) : (
                    <motion.img
                      src={photo}
                      alt={`Memory ${index + 1}`}
                      className="max-h-full max-w-full object-contain"
                      onError={() => handleImageError(index)}
                      onLoad={(e) => handleImageLoad(index, e)}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.1, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>

      {photos.length > 1 && (
        <>
          <motion.button
            onClick={handlePrev}
            className={`${buttonClasses} left-2 opacity-0 group-hover:opacity-100`}
            aria-label="Previous photo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronLeft className="text-pink-500 text-lg md:text-xl" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            className={`${buttonClasses} right-2 opacity-0 group-hover:opacity-100`}
            aria-label="Next photo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronRight className="text-pink-500 text-lg md:text-xl" />
          </motion.button>
        </>
      )}
    </div>
  );
};

export default PhotoCarousel;