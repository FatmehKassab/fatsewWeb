import { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser && storedUser !== "undefined") {
          const user = JSON.parse(storedUser);
          if (user?._id) {
            setUserId(user._id);
            setIsAuthenticated(true);
            return;
          }
        }
        setIsAuthenticated(false);
        setUserId(null);
      } catch (err) {
        console.error("Error checking auth:", err);
        setIsAuthenticated(false);
        setUserId(null);
      }
    };

    checkAuth();
    // Optional: Add event listener for storage changes
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        const productsData = Array.isArray(response.data) ? response.data : [];
        setProducts(productsData);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = async (productId) => {
    if (!isAuthenticated || !userId) {
      alert("You must be logged in to add items to your cart.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/cart/add",
        {
          userId,
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setQuantities((prev) => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1,
      }));

      console.log("Cart updated:", response.data);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      if (error.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
        setIsAuthenticated(false);
        setUserId(null);
      }
    }
  };

  return (
    <div className="bg-green-600">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              {product.currency}
              {product.price}
            </p>
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
            <p>Added: {quantities[product._id] || 0}</p>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
