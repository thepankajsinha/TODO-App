const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/todo-app')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


// Todo Model
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
});

const Todo = mongoose.model('Todo', todoSchema);


// API endpoints
//Create todo
app.post('/todos', async (req, res) => {
    const { title } = req.body;

    //validation
    if (!title) {
        return res.status(400).json({ message: 'Title is required.' });
    }
    const todo = new Todo({ title });
    try {
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//Get all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//Delete todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ message: 'To-Do not found' });
        res.json({ message: 'To-Do deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
const PORT = 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
