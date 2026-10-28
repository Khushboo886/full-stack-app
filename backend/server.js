const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));

const Item = mongoose.model('Item', { text: String });

app.get('/api/items', async (req, res) => res.json(await Item.find()));
app.post('/api/items', async (req, res) => res.json(await Item.create({ text: req.body.text })));

app.listen(5000, () => console.log('API running on 5000'));