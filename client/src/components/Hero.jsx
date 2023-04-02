import React from 'react'
import { heroimg } from '../../assets/index';
import { motion, AnimatePresence } from 'framer-motion';
import  { slideAnimation } from '../constants';
import style from '../style';

const Hero = () => {
  return (
    <AnimatePresence>
    <div className={`${style.paddingX} flex align-center justify-center flex-col gap-3`}>
      <h1 className={`${style.heading2} leading-snug text-center text-gradient`}>
        Build habits. Build community.
      </h1>
      <p className="text-[#827979] text-center mt-[0.25rem]">Connect with friends like never before,
all while performing tasks for healthy living! </p>
<motion.div {...slideAnimation('left')} className={`flex justify-end align-center`}>
  <motion.div {...slideAnimation('left')} className="left-1 top-10 relative dot-gradient rounded-full w-[20px] h-[20px]"/>
  <motion.div  {...slideAnimation('left')} className="right-12 top-40 relative dot-gradient rounded-full w-[20px] h-[20px]"/>
  <motion.div {...slideAnimation('left')} className="left-3 top-32 relative dot-gradient rounded-full w-[20px] h-[20px]"/>
      <motion.img src={heroimg} className="w-[55%] h-[225px] mt-[2rem] mr-[2rem]"/>
      </motion.div>
      <div className={`${style.flexCenter} gap-5 pb-5`}>
      <button className={`${style.paragraph}  text-white bg-[#9AD1F0] mt-[2rem] w-[237px] h-[72px] cursor-pointer rounded-md mx-auto `}>
        Login
    </button>
      <button className={`${style.paragraph} border-solid border-[#9AD1F0] text-[#9AD1F0] border-[2px] mt-[2rem] w-[237px] h-[72px] cursor-pointer rounded-md mx-auto `}>
        Register
    </button>
    </div>
    </div>
    </AnimatePresence>
  )
}

export default Hero