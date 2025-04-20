const express = require('express');
const cors = require('cors');
const connectdb = require('./mongodb');
const userRoute = require('./routes/userRoute'); 
const productRoute = require('./routes/productRoute'); 
const dollRoute = require('./routes/dollRoute'); 
const app = express();
const path = require('path');

// Middleware
app.use(express.json());
app.use(cors());

// Connect to DB
connectdb();

app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/users', userRoute); 
app.use('/api/products', productRoute);
app.use('/api/dolls', dollRoute);

app.get('/', (req, res) => res.send('Server is ready'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));