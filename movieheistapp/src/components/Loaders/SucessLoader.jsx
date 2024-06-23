import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleOutlined } from '@ant-design/icons';

const SuccessLoader = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
    >
      <motion.div
        className="text-green-500"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1 }}
      >
        <CheckCircleOutlined style={{ fontSize: '5rem' }} />
      </motion.div>
    </motion.div>
  );
};

export default SuccessLoader;
