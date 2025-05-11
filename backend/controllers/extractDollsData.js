// extractDollData.js
const axios = require('axios');

async function fetchDollData() {
  try {
    const response = await axios.get('http://localhost:3000/api/doll/6805280a981e73f604d25abe');
    const dollData = response.data;
    
    // Transform the data to match your React component's structure
    const transformedData = {
      options: {
        body: dollData.customize.body.map(item => ({
          type: item.type,
          image: `http://localhost:3000${item.image}`,
          price: item.price
        })),
        hair: dollData.customize.hair.map(item => ({
          type: item.type,
          image: `http://localhost:3000${item.image}`,
          price: item.price
        })),
        top: [{
          type: dollData.customize.top.type,
          image: `http://localhost:3000${dollData.customize.top.image}`,
          price: dollData.customize.top.price
        }],
        bottom: [{
          type: dollData.customize.bottom.type,
          image: `http://localhost:3000${dollData.customize.bottom.image}`,
          price: dollData.customize.bottom.price
        }],
        shoes: [{
          type: dollData.customize.shoes.type,
          image: `http://localhost:3000${dollData.customize.shoes.image}`,
          price: dollData.customize.shoes.price
        }]
      },
      initialCustomization: {
        body: {
          type: dollData.customize.body[0].type,
          image: `http://localhost:3000${dollData.customize.body[0].image}`,
          price: dollData.customize.body[0].price
        },
        hair: {
          type: dollData.customize.hair[0].type,
          image: `http://localhost:3000${dollData.customize.hair[0].image}`,
          price: dollData.customize.hair[0].price
        },
        top: {
          type: dollData.customize.top.type,
          image: `http://localhost:3000${dollData.customize.top.image}`,
          price: dollData.customize.top.price
        },
        bottom: {
          type: dollData.customize.bottom.type,
          image: `http://localhost:3000${dollData.customize.bottom.image}`,
          price: dollData.customize.bottom.price
        },
        shoes: {
          type: dollData.customize.shoes.type,
          image: `http://localhost:3000${dollData.customize.shoes.image}`,
          price: dollData.customize.shoes.price
        }
      },
      totalPrice: dollData.totalPrice
    };
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching doll data:', error);
    return null;
  }
}

module.exports = fetchDollData;