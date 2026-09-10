// Plants Node.js Express Backend Server
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// File persistence
const DATA_FILE = path.join(__dirname, 'store.json');

const defaultPlants = [
  { id: 1, name: "Snake Plant", category: "indoor", price: 399, oldPrice: 499, discount: 20, rating: 4.8, reviews: 128, image: "images/Snake Plant.jpg", description: "A hardy indoor plant that is easy to maintain and perfect for modern homes.", type: "Indoor Plant", light: "Low to Bright", water: "Low", suitable: "Home & Office" },
  { id: 2, name: "Monstera Deliciosa", category: "indoor", price: 699, oldPrice: 899, discount: 22, rating: 4.9, reviews: 214, image: "images/Monstera Deliciosa.jpg", description: "A tropical plant with beautiful split leaves that creates a fresh indoor atmosphere.", type: "Tropical", light: "Indirect", water: "Medium", suitable: "Living Room" },
  { id: 3, name: "Aloe Vera", category: "succulent", price: 299, oldPrice: 399, discount: 25, rating: 4.8, reviews: 191, image: "images/Aloe Vera.jpg", description: "A useful succulent plant that requires minimal care and plenty of natural light.", type: "Succulent", light: "Bright", water: "Low", suitable: "Home" },
  { id: 4, name: "Areca Palm", category: "indoor", price: 899, oldPrice: 1199, discount: 25, rating: 4.6, reviews: 94, image: "images/Areca Palm.jpg", description: "A graceful palm that adds a tropical green touch to large indoor spaces.", type: "Palm", light: "Bright", water: "Medium", suitable: "Living Room" },
  { id: 5, name: "Money Plant (Golden Pothos)", category: "indoor", price: 349, oldPrice: 449, discount: 22, rating: 4.8, reviews: 312, image: "images/Money Plant (Golden Pothos).jpg", description: "A popular easy-care plant with attractive trailing vines.", type: "Climber", light: "Indirect", water: "Medium", suitable: "Home & Office" },
  { id: 6, name: "Red Rose Plant", category: "flowering", price: 549, oldPrice: 699, discount: 21, rating: 4.7, reviews: 183, image: "images/Red Rose Plant.jpg", description: "A classic flowering plant that brings colour and fragrance to your garden.", type: "Flowering", light: "Bright", water: "Medium", suitable: "Garden" },
  { id: 7, name: "Jade Plant", category: "succulent", price: 449, oldPrice: 599, discount: 25, rating: 4.8, reviews: 145, image: "images/Jade Plant.jpg", description: "A compact succulent with thick green leaves and an attractive appearance.", type: "Succulent", light: "Bright", water: "Low", suitable: "Desk & Home" },
  { id: 8, name: "Rubber Plant (Ficus Elastica)", category: "indoor", price: 799, oldPrice: 999, discount: 20, rating: 4.7, reviews: 121, image: "images/Rubber Plant (Ficus Elastica).jpg", description: "A bold indoor plant with large glossy leaves and a modern appearance.", type: "Indoor", light: "Indirect", water: "Medium", suitable: "Living Room" },
  { id: 9, name: "French Lavender", category: "flowering", price: 599, oldPrice: 799, discount: 25, rating: 4.9, reviews: 202, image: "images/french lavender.jpg", description: "A fragrant flowering plant that brings a relaxing natural feel to your space.", type: "Flowering", light: "Bright", water: "Low", suitable: "Balcony" },
  { id: 10, name: "Desert Cactus", category: "succulent", price: 249, oldPrice: 349, discount: 29, rating: 4.6, reviews: 109, image: "images/desert cactus.jpg", description: "A small low-maintenance plant suitable for desks and sunny windows.", type: "Cactus", light: "Bright", water: "Very Low", suitable: "Desk" },
  { id: 11, name: "Variegated Croton", category: "outdoor", price: 699, oldPrice: 899, discount: 22, rating: 4.7, reviews: 86, image: "images/Variegated Croton.jpg", description: "A colourful foliage plant with vibrant leaves that brighten gardens and balconies.", type: "Foliage", light: "Bright", water: "Medium", suitable: "Garden" },
  { id: 12, name: "ZZ Plant (Zamioculcas)", category: "indoor", price: 749, oldPrice: 999, discount: 25, rating: 4.8, reviews: 157, image: "images/ZZ Plant (Zamioculcas).jpg", description: "A highly adaptable indoor plant with attractive glossy foliage.", type: "Indoor", light: "Low to Medium", water: "Low", suitable: "Office" },
  { id: 13, name: "Boston Fern", category: "outdoor", price: 599, oldPrice: 749, discount: 20, rating: 4.5, reviews: 72, image: "images/Boston Fern.jpg", description: "A lush fern that adds a fresh and natural texture to shaded spaces.", type: "Fern", light: "Indirect", water: "High", suitable: "Balcony" },
  { id: 14, name: "Spider Plant", category: "indoor", price: 399, oldPrice: 499, discount: 20, rating: 4.9, reviews: 249, image: "images/Spider Plant.jpg", description: "A popular indoor plant with long arching leaves and easy maintenance.", type: "Indoor", light: "Indirect", water: "Medium", suitable: "Home & Office" },
  { id: 15, name: "Golden Marigold", category: "flowering", price: 299, oldPrice: 399, discount: 25, rating: 4.7, reviews: 131, image: "images/Golden Marigold.jpg", description: "A cheerful flowering plant with bright blooms that looks beautiful in gardens.", type: "Flowering", light: "Bright", water: "Medium", suitable: "Garden" },
  { id: 16, name: "Bamboo Palm", category: "outdoor", price: 999, oldPrice: 1299, discount: 23, rating: 4.6, reviews: 64, image: "images/Bamboo Palm.jpg", description: "A graceful palm that creates a refreshing tropical atmosphere.", type: "Palm", light: "Indirect", water: "Medium", suitable: "Home & Garden" },
  { id: 17, name: "Premium Purple Orchid", category: "flowering", price: 1299, oldPrice: 1699, discount: 24, rating: 4.9, reviews: 98, image: "images/Premium Purple Orchid.jpg", description: "A premium orchid with elegant flowers, perfect for interiors and gifting.", type: "Orchid", light: "Bright Indirect", water: "Medium", suitable: "Home & Gifts" },
  { id: 18, name: "Anthurium Red", category: "flowering", price: 1499, oldPrice: 1899, discount: 21, rating: 4.8, reviews: 87, image: "images/Anthurium Red.jpg", description: "A premium flowering plant with striking red blooms and glossy leaves.", type: "Flowering", light: "Indirect", water: "Medium", suitable: "Living Room" },
  { id: 19, name: "Premium Rose Bush", category: "flowering", price: 1199, oldPrice: 1599, discount: 25, rating: 4.7, reviews: 75, image: "images/Premium Rose Bush.jpg", description: "A premium rose bush offering colourful blooms and an elegant garden appearance.", type: "Rose", light: "Bright", water: "Medium", suitable: "Garden" },
  { id: 20, name: "White Moth Orchid", category: "flowering", price: 1799, oldPrice: 2299, discount: 22, rating: 4.9, reviews: 116, image: "images/White Moth Orchid.jpg", description: "A beautiful premium white orchid ideal for elegant homes and special occasions.", type: "Orchid", light: "Indirect", water: "Medium", suitable: "Home & Gifts" },
  { id: 21, name: "Bougainvillea Pink", category: "flowering", price: 1099, oldPrice: 1399, discount: 21, rating: 4.6, reviews: 83, image: "images/Bougainvillea Pink.jpg", description: "A colourful flowering plant that creates a vibrant garden display.", type: "Flowering", light: "Bright", water: "Medium", suitable: "Garden" },
  { id: 22, name: "Lucky Bamboo Spiral", category: "indoor", price: 599, oldPrice: 799, discount: 25, rating: 4.8, reviews: 224, image: "images/Lucky Bamboo Spiral.jpg", description: "A stylish indoor plant suitable for desks, offices and modern interiors.", type: "Indoor", light: "Indirect", water: "Medium", suitable: "Office" },
  { id: 23, name: "Calathea Medallion", category: "indoor", price: 899, oldPrice: 1199, discount: 25, rating: 4.7, reviews: 118, image: "images/Calathea Medallion.jpg", description: "A decorative tropical indoor plant with beautiful patterned foliage.", type: "Tropical", light: "Indirect", water: "Medium", suitable: "Home" },
  { id: 24, name: "Red Aglaonema", category: "indoor", price: 799, oldPrice: 999, discount: 20, rating: 4.8, reviews: 139, image: "images/Red Aglaonema.jpg", description: "A beautiful low-maintenance foliage plant perfect for indoor spaces.", type: "Foliage", light: "Low to Medium", water: "Medium", suitable: "Office & Home" }
];

let store = {
  plants: [...defaultPlants],
  orders: [],
  messages: []
};

if (fs.existsSync(DATA_FILE)) {
  try {
    const loaded = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    if (loaded && typeof loaded === 'object') {
      store.plants = Array.isArray(loaded.plants) && loaded.plants.length > 0 ? loaded.plants : [...defaultPlants];
      store.orders = Array.isArray(loaded.orders) ? loaded.orders : [];
      store.messages = Array.isArray(loaded.messages) ? loaded.messages : [];
    }
  } catch (e) {
    console.error('Error loading store.json', e);
  }
} else {
  saveStore();
}

function saveStore() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf8');
  } catch (e) {
    console.error('Error writing store.json', e);
  }
}

// -------------------------------------------------------------
// Auth Route (Handles /api/admin/login and /api/auth/login)
// -------------------------------------------------------------
function handleLogin(req, res) {
  const { username, password } = req.body || {};
  if (username === 'admin' && password === 'admin123') {
    const token = crypto.createHash('sha256').update(`admin:${Date.now()}`).digest('hex');
    return res.json({ success: true, token, username: 'admin', message: 'Admin authenticated successfully' });
  }
  return res.status(401).json({ success: false, error: 'Invalid username or password' });
}

app.post('/api/admin/login', handleLogin);
app.post('/api/auth/login', handleLogin);

// -------------------------------------------------------------
// Plants Endpoints
// -------------------------------------------------------------
app.get('/api/plants', (req, res) => res.json(store.plants));

app.put('/api/plants', (req, res) => {
  if (Array.isArray(req.body)) {
    store.plants = req.body;
    saveStore();
    return res.json({ success: true, count: store.plants.length });
  }
  res.status(400).json({ error: 'Expected array of plants' });
});

app.post('/api/plants', (req, res) => {
  const newPlant = { id: Date.now(), ...req.body };
  store.plants.unshift(newPlant);
  saveStore();
  res.json({ success: true, plant: newPlant });
});

app.put('/api/plants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = store.plants.findIndex(p => p.id === id);
  if (index !== -1) {
    store.plants[index] = { ...store.plants[index], ...req.body, id };
    saveStore();
    return res.json({ success: true, plant: store.plants[index] });
  }
  res.status(404).json({ error: 'Plant not found' });
});

app.delete('/api/plants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  store.plants = store.plants.filter(p => p.id !== id);
  saveStore();
  res.json({ success: true, message: 'Plant deleted' });
});

// -------------------------------------------------------------
// Orders Endpoints
// -------------------------------------------------------------
app.get('/api/orders', (req, res) => res.json(store.orders));

app.put('/api/orders', (req, res) => {
  if (Array.isArray(req.body)) {
    store.orders = req.body;
    saveStore();
    return res.json({ success: true, count: store.orders.length });
  }
  res.status(400).json({ error: 'Expected array of orders' });
});

app.post('/api/orders', (req, res) => {
  const orderId = req.body.orderId || ('GL-' + Math.floor(100000 + Math.random() * 900000));
  const newOrder = {
    orderId,
    date: req.body.date || new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }),
    status: 'Processing',
    ...req.body
  };
  store.orders.unshift(newOrder);
  saveStore();
  res.json({ success: true, order: newOrder });
});

app.put('/api/orders/:id/status', (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  const ord = store.orders.find(o => String(o.orderId) === String(orderId) || String(o.id) === String(orderId));
  if (ord) {
    ord.status = status || 'Processing';
    saveStore();
    return res.json({ success: true, order: ord });
  }
  res.status(404).json({ error: 'Order not found' });
});

app.delete('/api/orders/:id', (req, res) => {
  const orderId = req.params.id;
  store.orders = store.orders.filter(o => String(o.orderId) !== String(orderId) && String(o.id) !== String(orderId));
  saveStore();
  res.json({ success: true, message: 'Order deleted' });
});

app.delete('/api/orders', (req, res) => {
  store.orders = [];
  saveStore();
  res.json({ success: true, message: 'All orders cleared' });
});

// -------------------------------------------------------------
// Messages Endpoints
// -------------------------------------------------------------
app.get('/api/messages', (req, res) => res.json(store.messages));
app.get('/api/contacts', (req, res) => res.json(store.messages));

app.put('/api/messages', (req, res) => {
  if (Array.isArray(req.body)) {
    store.messages = req.body;
    saveStore();
    return res.json({ success: true, count: store.messages.length });
  }
  res.status(400).json({ error: 'Expected array of messages' });
});

app.post('/api/messages', (req, res) => {
  const newMsg = {
    id: Date.now(),
    date: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }),
    ...req.body
  };
  store.messages.unshift(newMsg);
  saveStore();
  res.json({ success: true, message: newMsg });
});
app.post('/api/contacts', (req, res) => {
  const newMsg = {
    id: Date.now(),
    date: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }),
    ...req.body
  };
  store.messages.unshift(newMsg);
  saveStore();
  res.json({ success: true, message: newMsg });
});

app.delete('/api/messages/:id', (req, res) => {
  const id = parseInt(req.params.id);
  store.messages = store.messages.filter(m => m.id !== id);
  saveStore();
  res.json({ success: true, message: 'Message deleted' });
});

// -------------------------------------------------------------
// Dashboard Stats Endpoint
// -------------------------------------------------------------
app.get('/api/dashboard/stats', (req, res) => {
  const totalRevenue = store.orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? (o.total || 0) : 0), 0);
  res.json({
    total_plants: store.plants.length,
    total_orders: store.orders.length,
    total_revenue: totalRevenue,
    total_messages: store.messages.length
  });
});

// Static frontend serving
app.use(express.static(path.join(__dirname)));

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.status(404).send('index.html not found');
});

app.listen(PORT, () => {
  console.log(`🌱 Plants Store Server running on port ${PORT}`);
  console.log(`🌿 Storefront: http://localhost:${PORT}`);
  console.log(`🔐 Admin: http://localhost:${PORT} (Username: admin | Password: admin123)`);
});
