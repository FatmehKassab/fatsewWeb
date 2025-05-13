import { useState, useEffect } from "react";
import React from "react";
import { IMAGES } from "../../utils/images";
import NavBar from "../../components/NavBar";
import CTA2 from "../../components/CTA2";
import Footer from "../../components/Footer";

const Customize = () => {
  const [activeTab, setActiveTab] = useState("body");

  const [options, setOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [customization, setCustomization] = useState({
    body: { type: "", image: "", price: 0 },
    hair: { type: "", image: "", price: 0 },
    top: { type: "", image: "", price: 0 },
    bottom: { type: "", image: "", price: 0 },
    shoes: { type: "", image: "", price: 0 },
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [dollPreview, setDollPreview] = useState({
    body: "",
    hair: "",
    top: "",
    bottom: "",
    shoes: "",
  });

  // Static doll data
  const dollData = {
    customize: {
      body: [
        { type: "white", image: "images/bodies/white_body.png", price: 20 },
        { type: "black", image: "images/bodies/black_body.png", price: 20 },
      ],
      hair: [
        { type: "boy", image: "images/hair/boy_hair_brown.png", price: 20 },
        { type: "girl", image: "images/hair/girl_hair_brown.png", price: 25 },
      ],
      top: [
        { type: "boy", image: "images/tops/boy_top.png", price: 20 },
        { type: "girl", image: "images/tops/girl_top.png", price: 25 },
      ],
      bottom: [
        { type: "boy", image: "images/bottoms/boy_pants.png", price: 20 },
        { type: "girl", image: "images/bottoms/girl_pants.png", price: 25 },
      ],
      shoes: [
        { type: "boy", image: "images/shoes/boy_shoes.png", price: 20 },
        { type: "girl", image: "images/shoes/girl_shoes.png", price: 25 },
      ],
    },
    totalPrice: 0, // Set to 0 initially
  };

  // Set static data to options and initial customization
  useEffect(() => {
    const transformedData = {
      options: {
        body: dollData.customize.body.map((item) => ({
          type: item.type,
          image: item.image,
          price: item.price,
        })),
        hair: dollData.customize.hair.map((item) => ({
          type: item.type,
          image: item.image,
          price: item.price,
        })),
        top: dollData.customize.top.map((item) => ({
          type: item.type,
          image: item.image,
          price: item.price,
        })),
        bottom: dollData.customize.bottom.map((item) => ({
          type: item.type,
          image: item.image,
          price: item.price,
        })),
        shoes: dollData.customize.shoes.map((item) => ({
          type: item.type,
          image: item.image,
          price: item.price,
        })),
      },
      initialCustomization: {
        body: { type: "", image: "", price: 0 },
        hair: { type: "", image: "", price: 0 },
        top: { type: "", image: "", price: 0 },
        bottom: { type: "", image: "", price: 0 },
        shoes: { type: "", image: "", price: 0 },
      },
      totalPrice: 0,
    };

    setOptions(transformedData.options);
    setCustomization(transformedData.initialCustomization);
    setTotalPrice(transformedData.totalPrice);

    setIsLoading(false);
  }, []);

  // Calculate total price whenever customization changes
  useEffect(() => {
    const newTotal = Object.values(customization).reduce(
      (sum, item) => sum + item.price,
      0
    );
    setTotalPrice(newTotal);
  }, [customization]);

  const handleCustomizationChange = (category, option) => {
    setCustomization((prev) => ({
      ...prev,
      [category]: option,
    }));
    updateDollPreview({ [category]: option.image });
  };

  const updateDollPreview = (updates) => {
    setDollPreview((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!options) {
    return <div>Error loading doll data</div>;
  }

  return (
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
            Customize
          </h1>
        </div>
      </section>
      <div className="doll-customizer p-4 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Customization Panel */}
          <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-lg">
            {/* Category Tabs */}
            <div className="flex mb-4">
              {["body", "hair", "top", "bottom", "shoes"].map((category) => (
                <div
                  key={category}
                  className={`px-4 py-2 font-medium ${
                    activeTab === category
                      ? "bg-secondary text-white"
                      : "bg-white border-secondary border-2 text-secondary"
                  }`}
                  onClick={() => setActiveTab(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
              ))}
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-3 gap-3">
              {options[activeTab].map((option) => (
                <div
                  key={option.type}
                  className={`p-2 border rounded cursor-pointer ${
                    customization[activeTab].type === option.type
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => handleCustomizationChange(activeTab, option)}
                >
                  <img
                    src={option.image}
                    alt={option.type}
                    className="w-full h-16 object-contain mb-1"
                  />
                  <div className="text-sm text-center">
                    {option.type} (${option.price})
                  </div>
                </div>
              ))}
            </div>

            {/* Price and Navigation */}
            <div className="mt-6 flex justify-between items-center">
              <div className="text-lg font-semibold">
                Price: ${totalPrice.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Doll Preview */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="relative w-64 h-96 mb-4">
              {dollPreview.body && (
                <img
                  src={dollPreview.body}
                  alt="Body"
                  className="absolute w-full h-full object-contain"
                />
              )}
              {dollPreview.hair && (
                <img
                  src={dollPreview.hair}
                  alt="Hair"
                  className="absolute w-24 h-24 object-contain left-20"
                />
              )}
              {dollPreview.top && (
                <img
                  src={dollPreview.top}
                  alt="Top"
                  className="absolute w-32 h-36 object-contain left-16 top-20"
                />
              )}
              {dollPreview.bottom && (
                <img
                  src={dollPreview.bottom}
                  alt="Bottom"
                  className="absolute w-40 h-40 object-contain left-14 top-44"
                />
              )}
              {dollPreview.shoes && (
                <img
                  src={dollPreview.shoes}
                  alt="Shoes"
                  className="absolute w-20 h-20 object-contain left-[90px] top-[310px]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <CTA2 />
      <Footer />
    </>
  );
};

export default Customize;
