import React from 'react'
import { heroimg } from '../../assets/index';
import style from '../style';

const Hero = () => {
  return (
    <div className="flex align-center justify-center flex-col object-contain">
      <h1 className={`${style.heading2} text-center text-gradient`}>
        Make Exercise Less Boring!
      </h1>
      <p className="text-[#827979] text-center">Connect with friends like never before,
all while performing tasks for healthy living! </p>
<div className={`${style.flexCenter} `}>
  <div className="dot-gradient rounded-full w-[20px] h-[20px]"/>
  <div className="dot-gradient rounded-full w-[20px] h-[20px]"/>
  <div className="dot-gradient rounded-full w-[20px] h-[20px]"/>
      <img src={heroimg} className="w-[60%] h-[250px] mt-[2rem]"/>
      </div>
    </div>
  )
}

export default Hero