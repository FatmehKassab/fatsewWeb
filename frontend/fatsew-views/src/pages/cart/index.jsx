import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`/api/cart/view/${userId}`)
      .then((response) => setCart(response.data))
      .catch((error) => console.log(error));
  }, [userId]);

  const removeFromCart = async (productId) => {
    const response = await axios.delete("/api/cart/remove", {
      data: { userId, productId },
    });
    setCart(response.data);
  };

  const updateQuantity = async (productId, quantity) => {
    const response = await axios.put("/api/cart/update", {
      userId,
      productId,
      quantity,
    });
    setCart(response.data);
  };

  if (!userId) return <p>Please log in to view your cart.</p>;

  return (
    <div>
      {cart && cart.items?.length > 0 ? (
        cart.items.map((item) => (
          <div key={item.productId._id}>
            <p>
              {item.productId.name} - {item.quantity}
            </p>
            <button onClick={() => removeFromCart(item.productId._id)}>
              Remove
            </button>
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) =>
                updateQuantity(item.productId._id, e.target.value)
              }
            />
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
