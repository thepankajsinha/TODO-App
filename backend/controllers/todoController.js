import Todo from "../models/todoModel.js";

//Create todo
export const createTodo = async (req, res) => {
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
};


//Get all todos
export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//Delete todo
export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ message: 'To-Do not found' });
        res.json({ message: 'To-Do deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};