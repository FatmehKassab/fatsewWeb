

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectdb = require('./mongodb');
const authRouter = require("./routes/auth/auth-routes");


const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");



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


app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);



const customizationSchema = new mongoose.Schema({
  category: String,
  options: [
    {
      type: String,
      image: String,
      price: Number,
    },
  ],
});

const Customization = mongoose.model("Customization", customizationSchema);

// Get customization options from DB
app.get("/customize", async (req, res) => {
  try {
    const customizationOptions = await Customization.find();
    res.json(customizationOptions);
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});
app.use("/images", express.static("images"));
app.get('/', (req, res) => res.send('Server is ready'));

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
