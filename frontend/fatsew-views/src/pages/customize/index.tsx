// import React from "react";

// const Customize = () => {

//   return (
//     <>
//     </>
//   )
// };

// export default Customize;

import { useState, useEffect } from "react";
import axios from "axios";

const Customize = () => {
  const [activeTab, setActiveTab] = useState("body");
  const [dolls, setDolls] = useState([]);
  const [options, setOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  // Fetch all dolls and the specific doll data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch list of dolls
        const dollsResponse = await axios.get("http://localhost:3000/api/doll");
        setDolls(dollsResponse.data);

        // Fetch specific doll data
        const dollResponse = await axios.get(
          "http://localhost:3000/api/doll/6805280a981e73f604d25abe"
        );
        const dollData = dollResponse.data;

        // Transform the data
        const transformedData = {
          options: {
            body: dollData.customize.body.map((item) => ({
              type: item.type,
              image: `http://localhost:3000${item.image}`,
              price: item.price,
            })),
            hair: dollData.customize.hair.map((item) => ({
              type: item.type,
              image: `http://localhost:3000${item.image}`,
              price: item.price,
            })),
            top: [
              {
                type: dollData.customize.top.type,
                image: `http://localhost:3000${dollData.customize.top.image}`,
                price: dollData.customize.top.price,
              },
            ],
            bottom: [
              {
                type: dollData.customize.bottom.type,
                image: `http://localhost:3000${dollData.customize.bottom.image}`,
                price: dollData.customize.bottom.price,
              },
            ],
            shoes: [
              {
                type: dollData.customize.shoes.type,
                image: `http://localhost:3000${dollData.customize.shoes.image}`,
                price: dollData.customize.shoes.price,
              },
            ],
          },
          initialCustomization: {
            body: {
              type: dollData.customize.body[0].type,
              image: `http://localhost:3000${dollData.customize.body[0].image}`,
              price: dollData.customize.body[0].price,
            },
            hair: {
              type: dollData.customize.hair[0].type,
              image: `http://localhost:3000${dollData.customize.hair[0].image}`,
              price: dollData.customize.hair[0].price,
            },
            top: {
              type: dollData.customize.top.type,
              image: `http://localhost:3000${dollData.customize.top.image}`,
              price: dollData.customize.top.price,
            },
            bottom: {
              type: dollData.customize.bottom.type,
              image: `http://localhost:3000${dollData.customize.bottom.image}`,
              price: dollData.customize.bottom.price,
            },
            shoes: {
              type: dollData.customize.shoes.type,
              image: `http://localhost:3000${dollData.customize.shoes.image}`,
              price: dollData.customize.shoes.price,
            },
          },
          totalPrice: dollData.totalPrice,
        };

        setOptions(transformedData.options);
        setCustomization(transformedData.initialCustomization);
        setTotalPrice(dollData.totalPrice);

        // Set initial preview images
        setDollPreview({
          body: transformedData.initialCustomization.body.image,
          hair: transformedData.initialCustomization.hair.image,
          top: transformedData.initialCustomization.top.image,
          bottom: transformedData.initialCustomization.bottom.image,
          shoes: transformedData.initialCustomization.shoes.image,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
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
    <div className="doll-customizer p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Design &gt; Product Overview</h1>

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
  );
};

export default Customize;
