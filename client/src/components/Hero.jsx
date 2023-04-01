import React from 'react'
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../constants/motion';
import { motion, AnimatePresence } from 'framer-motion';
import style from '../style';

const Hero = () => {
  return (
    <AnimatePresence>
       <motion.div className="text-center" {...slideAnimation('left')}>
        <h1 className={`text-[92px] ${style.heading2}`}>Testing</h1>
       </motion.div>
    </AnimatePresence>
  )
}

export default Hero