// const express = require('express');
// const cors = require('cors');
// require("dotenv").config();
// const connectdb = require('./mongodb');
// const userRoute = require('./routes/userRoute'); 
// const productRoute = require('./routes/productRoute'); 

// const dollRoute = require('./routes/dollRoute'); 
// const userRoutes = require("./routes/user");
// const authRoutes = require("./routes/auth");
// const cartRoutes = require('./routes/cart');
// const app = express();
// const path = require('path');

// // Middleware
// app.use(cors());
// app.use(express.json());
// // Connect to DB
// connectdb();



// // Routes

// app.use('/api/dolls', dollRoute);
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use('/api/cart', cartRoutes);
// app.use("/api/products", productRoute);
// app.use('/images', express.static(path.join(__dirname, 'images')));

// app.get('/', (req, res) => res.send('Server is ready'));

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectdb = require('./mongodb');
const authRouter = require("./routes/auth/auth-routes");
// const adminProductsRouter = require("./routes/admin/products-routes");
// const adminOrderRouter = require("./routes/admin/order-routes");
const dollRoute = require('./routes/dollRoute'); 
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");

//create a database connection -> u can also
//create a separate file for this and then import/use that file here
connectdb();
const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
// app.use("/api/admin/products", adminProductsRouter);
// app.use("/api/admin/orders", adminOrderRouter);
app.use('/api/dolls', dollRoute);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/images", express.static("images"));
app.use("/api/common/feature", commonFeatureRouter);
app.get('/', (req, res) => res.send('Server is ready'));

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
