const express = require('express');
const cors = require('cors');
const connectdb = require('./mongodb');
const userRoute = require('./routes/userRoute'); 
const productRoute = require('./routes/productRoute'); 
const dollRoute = require('./routes/dollRoute'); 
const authRoutes = require('./routes/authRoutes.js'); 
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5174', // Your Vite frontend port
    credentials: true
  }));

// Connect to DB
connectdb();

app.use(express.json());

// Cookie parser
app.use(cookieParser());




app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/users', userRoute); 
app.use('/api/products', productRoute);
app.use('/api/dolls', dollRoute);

app.use('/api/auth', authRoutes);


app.get('/', (req, res) => res.send('Server is ready'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


