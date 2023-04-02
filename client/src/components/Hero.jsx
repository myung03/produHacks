import React from 'react'
import { heroimg } from '../../assets/index';
import style from '../style';

const Hero = () => {
  return (
    <div className="flex align-center justify-center flex-col object-contain">
      <h1 className={`${style.heading2} text-center text-gradient`}>
        Make Exercise Less Boring!
      </h1>
      <p className="text-[#827979] text-center mt-[1rem]">Connect with friends like never before,
all while performing tasks for healthy living! </p>
<div className={`flex justify-end align-center`}>
  <div className="left-1 top-10 relative dot-gradient rounded-full w-[20px] h-[20px]"/>
  <div className="right-12 top-40 relative dot-gradient rounded-full w-[20px] h-[20px]"/>
  <div className="left-3 top-32 relative dot-gradient rounded-full w-[20px] h-[20px]"/>
      <img src={heroimg} className="w-[60%] h-[250px] mt-[2rem] mr-[2rem]"/>
      </div>
    </div>
  )
}

export default Hero