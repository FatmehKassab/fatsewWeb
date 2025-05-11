import Banner from "./components/Banner";
import CTA from "./components/CTA";
import CTA2 from "./components/CTA2";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Swiper from "./components/Swiper";
import WhyUsSection from "./components/WhyUs";
import { IMAGES } from "./utils/images";

function App() {
  return (
    <>
      <section className="relative w-full h-[700px]">
        <img
          src={IMAGES.banner}
          className="absolute w-full h-full object-cover"
          alt="Banner"
        />
        <div className="absolute inset-0 bg-gradient-white z-1" />
        <div className="absolute inset-0 flex flex-col items-center justify-between z-2  px-4 ">
          <div className="w-full flex justify-center">
            <NavBar />
          </div>
          <Banner />
        </div>
      </section>
      <WhyUsSection />

      <section className="w-full flex justify-center">
        <FAQ />
      </section>

      <CTA2 />
      <Swiper />
      <CTA />
      <Footer />
    </>
  );
}

export default App;
