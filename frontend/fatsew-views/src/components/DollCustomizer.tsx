import { useState, useEffect } from "react";
import axios from "axios";

const DollCustomizer = () => {
  const [dolls, setDolls] = useState([]);
  const [selectedDoll, setSelectedDoll] = useState(null);
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

  // Sample options data - in a real app, this might come from an API
  const options = {
    body: [
      {
        type: "black",
        image: "http://localhost:3000/images/bodies/black_body.png",
        price: 5,
      },
      {
        type: "white",
        image: "http://localhost:3000/images/bodies/white_body.png",
        price: 5,
      },
    ],
    hair: [
      {
        type: "blonde",
        image: "http://localhost:3000/images/hair/boy_hair_blonde.png",
        price: 5,
      },
      {
        type: "brown",
        image: "http://localhost:3000/images/hair/girl_hair_brown.png",
        price: 5,
      },
    ],
    top: [
      {
        type: "t-shirt",
        image: "http://localhost:3000/images/tops/girl_top.png",
        price: 5,
      },
    ],
    bottom: [
      {
        type: "jeans",
        image: "http://localhost:3000/images/bottoms/girl_pants.png",
        price: 10,
      },
    ],
    shoes: [
      {
        type: "sneakers",
        image: "http://localhost:3000/images/shoes/boy_shoes.png",
        price: 20,
      },
    ],
  };

  // Fetch all dolls
  useEffect(() => {
    const fetchDolls = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/dolls");
        setDolls(response.data);
      } catch (error) {
        console.error("Error fetching dolls:", error);
      }
    };
    fetchDolls();
  }, []);

  // Load a doll for editing
  const loadDollForEdit = (doll) => {
    setSelectedDoll(doll);

    // Convert image paths to full backend URLs
    const backendUrl = "http://localhost:3000";
    const customize = doll.customize;

    setCustomization({
      body: {
        ...customize.body[0],
        image: customize.body[0]?.image
          ? `${backendUrl}${customize.body[0].image}`
          : "",
      },
      hair: {
        ...customize.hair[0],
        image: customize.hair[0]?.image
          ? `${backendUrl}${customize.hair[0].image}`
          : "",
      },
      top: {
        ...customize.top,
        image: customize.top?.image
          ? `${backendUrl}${customize.top.image}`
          : "",
      },
      bottom: {
        ...customize.bottom,
        image: customize.bottom?.image
          ? `${backendUrl}${customize.bottom.image}`
          : "",
      },
      shoes: {
        ...customize.shoes,
        image: customize.shoes?.image
          ? `${backendUrl}${customize.shoes.image}`
          : "",
      },
    });

    // setTotalPrice(doll.totalPrice);
    updateDollPreview({
      body: customize.body[0]?.image
        ? `${backendUrl}${customize.body[0].image}`
        : "",
      hair: customize.hair[0]?.image
        ? `${backendUrl}${customize.hair[0].image}`
        : "",
      top: customize.top?.image ? `${backendUrl}${customize.top.image}` : "",
      bottom: customize.bottom?.image
        ? `${backendUrl}${customize.bottom.image}`
        : "",
      shoes: customize.shoes?.image
        ? `${backendUrl}${customize.shoes.image}`
        : "",
    });
  };

  // Handle customization change
  const handleCustomizationChange = (category, option) => {
    setCustomization((prev) => ({
      ...prev,
      [category]: option,
    }));
    // setTotalPrice((prev) => prev - prev[category].price + option.price);
    updateDollPreview({ [category]: option.image });
  };

  // Update doll preview images
  const updateDollPreview = (updates) => {
    setDollPreview((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Save doll
  const saveDoll = async () => {
    const dollData = {
      totalPrice,
      customize: {
        body: [customization.body],
        hair: [customization.hair],
        top: customization.top,
        bottom: customization.bottom,
        shoes: customization.shoes,
      },
    };

    try {
      if (selectedDoll) {
        await axios.patch(
          `http://localhost:3000/api/dolls/${selectedDoll._id}`,
          dollData
        );
      } else {
        await axios.post("http://localhost:3000/api/dolls", dollData);
      }
      // Refresh the list
      const response = await axios.get("http://localhost:3000/api/dolls");
      setDolls(response.data);
      resetForm();
    } catch (error) {
      console.error("Error saving doll:", error);
    }
  };

  // Reset form
  const resetForm = () => {
    setSelectedDoll(null);
    setCustomization({
      body: { type: "", image: "", price: 0 },
      hair: { type: "", image: "", price: 0 },
      top: { type: "", image: "", price: 0 },
      bottom: { type: "", image: "", price: 0 },
      shoes: { type: "", image: "", price: 0 },
    });
    setTotalPrice(0);
    setDollPreview({
      body: "",
      hair: "",
      top: "",
      bottom: "",
      shoes: "",
    });
  };

  // Delete doll
  const deleteDoll = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/dolls/${id}`);
      const response = await axios.get("http://localhost:3000/api/dolls");
      setDolls(response.data);
    } catch (error) {
      console.error("Error deleting doll:", error);
    }
  };

  return (
    <div className="doll-customizer">
      <h1>Custom Doll Creator</h1>

      <div className="customization-container">
        <div className="customization-form">
          <h2>{selectedDoll ? "Edit Doll" : "Create New Doll"}</h2>

          {Object.keys(options).map((category) => (
            <div className="category" key={category}>
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <select
                value={customization[category].type}
                onChange={(e) => {
                  const selectedOption = options[category].find(
                    (opt) => opt.type === e.target.value
                  );
                  if (selectedOption) {
                    handleCustomizationChange(category, selectedOption);
                  }
                }}
              >
                <option value="">Select {category}</option>
                {options[category].map((option) => (
                  <option key={option.type} value={option.type}>
                    {option.type} (${option.price})
                  </option>
                ))}
              </select>
              {customization[category].image && (
                <div className="option-preview">
                  <img
                    src={customization[category].image}
                    alt={customization[category].type}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </div>
              )}
            </div>
          ))}

          {/* <div className="total-price">
            <h3>Total Price: ${totalPrice}</h3>
          </div> */}

          <button onClick={saveDoll}>Save Doll</button>
          {selectedDoll && <button onClick={resetForm}>Cancel</button>}
        </div>

        <div className="doll-preview">
          <h2>Doll Preview</h2>
          <div className="preview-container flex  justify-center">
            {dollPreview.body && (
              <img
                src={dollPreview.body}
                alt="Body"
                className="preview-layer"
              />
            )}
            {dollPreview.hair && (
              <img
                src={dollPreview.hair}
                alt="Hair"
                className=" w-36 absolute mt-4 "
              />
            )}
            {dollPreview.top && (
              <img
                src={dollPreview.top}
                alt="Top"
                className="w-36 h-24 absolute top-28 mt-2"
              />
            )}
            {dollPreview.bottom && (
              <img
                src={dollPreview.bottom}
                alt="Bottom"
                className="w-28 h-36 absolute top-48 ml-5"
              />
            )}
            {dollPreview.shoes && (
              <img
                src={dollPreview.shoes}
                alt="Shoes"
                className="w-20 absolute top-[325px] ml-2 mt-1"
              />
            )}
          </div>
        </div>
      </div>

      <div className="doll-list">
        <h2>Saved Dolls</h2>
        <ul>
          {dolls.map((doll) => (
            <li key={doll._id}>
              <div>
                <strong>ID:</strong> {doll._id} |<strong>Price:</strong> $
                {doll.totalPrice}
              </div>
              <div className="doll-thumbnail">
                {doll.customize.body[0]?.image && (
                  <img src={doll.customize.body[0].image} alt="Body" />
                )}
              </div>
              <div>
                <button onClick={() => loadDollForEdit(doll)}>Edit</button>
                <button onClick={() => deleteDoll(doll._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DollCustomizer;
