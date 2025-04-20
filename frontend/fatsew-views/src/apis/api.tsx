import API from "./axiosConfig";

export const userAPI = {
  fetchAll: () => API.get("/users"),
  fetchById: (id: any) => API.get(`/users/${id}`),
  create: (userData: any) => API.post("/users", userData),
};

export const productAPI = {
  fetchAll: () => API.get("/products"),
  fetchById: (id: any) => API.get(`/products/${id}`),
  create: (productData: any) => API.post("/products", productData),
};
