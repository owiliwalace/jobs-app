import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <>
    <div className=" h-[500px] w-full bg-white flex">
      <div className="h-[500px] w-1/2">
        WE
      </div>
    <Image
    className=' w-1/2'
      src="/hero-homepage.jpg"
      width={400}
      height={400}
      alt="image one"
    />
   
     
    </div>
    </>
  )
}

export default Hero 