const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Budget = require('./models/budget');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch(err => console.error("MongoDB connection error:", err));

// Endpoint: GET /budget (retrieve all budget documents)
app.get('/budget', async (req, res) => {
    try {
        const budgets = await Budget.find({});
        res.json({ myBudget: budgets }); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint: POST /budget (add new budget entry)
app.post('/budget', async (req, res) => {
    const { title, budget, color } = req.body;

    try {
        const newBudget = new Budget({ title, budget, color });
        await newBudget.save();
        res.status(201).json(newBudget);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
