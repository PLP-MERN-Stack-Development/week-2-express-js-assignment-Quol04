// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to the Product API');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
app.get('/api/products', async (req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products' });
  }
});
// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
// POST /api/products - Create a new product
app.post('/api/products', async (req, res) => {
  const newProduct = {
    id: uuidv4(),
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
// PUT /api/products/:id - Update a product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    const updatedProduct = {
      id,
      ...req.body
    };
    products[productIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.status(204).json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});


// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 