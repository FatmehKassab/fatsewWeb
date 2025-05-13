
import React from "react";
import AtoZIndex from "../../components/atozindex";
import { aToZData } from "../../utils/data";
import { IMAGES } from "../../utils/images";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import CTA2 from "../../components/CTA2";
const AtoZ = () => {
  return(
      <>
          <section className="relative w-full h-[400px]">
            <img
              src={IMAGES.banner}
              className="absolute w-full h-full object-cover"
              alt="Banner"
            />
            <div className="absolute inset-0 bg-gradient-white z-1" />
            <div className="absolute inset-0 flex flex-col items-center justify-between z-2 px-4">
              <div className="w-full flex justify-center">
                <NavBar />
              </div>
              <h1 className="absolute top-[60%] text-5xl text-white font-black uppercase">
                A to Z
              </h1>
            </div>
          </section>
    <div className="mx-auto"> <AtoZIndex data={aToZData} /></div>
          
        
    <CTA2/>
          <Footer />
        </>
  )
 
;
};

export default AtoZ