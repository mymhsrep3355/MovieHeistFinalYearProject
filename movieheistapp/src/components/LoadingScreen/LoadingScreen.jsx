import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/Movieheist.png';

const loadingVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 0 },
  exit: { opacity: 0 },
};

const logoVariants = {
  initial: { scale: 0.8 },
  animate: { scale: 1, rotate: 360 },
};

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000); // Change the duration to match the desired loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          variants={loadingVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 4 }}
        >
          <motion.img
            src={logo}
            alt="Movie Heist"
            className="h-60 w-auto"
            variants={logoVariants}
            // initial="initial"
            animate="animate"
            transition={{ duration: 3, ease: "anticipate" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
