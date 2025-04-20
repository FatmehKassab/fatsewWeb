// src/components/UserList.js
import { useContext, useEffect } from "react";
import { DataContext } from "../../contexts/dataContext";
import { productAPI } from "../../apis/api";

const Products = () => {
  const { data, loading, error, getAll } = useContext(DataContext);

  useEffect(() => {
    getAll(productAPI);
  }, []);

  if (loading) return <div className="text-center py-4">Loading users...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-600">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
