import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoApp.css';
import toast from 'react-hot-toast';


function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch all to-dos from the backend when the page is loaded or reloaded
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3500/todos");
        setTodos(response.data); // update todos state after loading the page
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);


  // Create a new todo
  const handleAddTodo = async () => {
    try {
      const response = await axios.post("http://localhost:3500/todos" ,{ title: newTodo });
      setTodos([...todos, response.data]); // Update the todo state with the new todo
      setNewTodo(''); // Clear input field
      toast.success('Todo added successfully!'); // Display success toast message
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  
  // Delete a todo
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3500/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id)); //update todo state by filtering the deleted todo
      toast.success('Todo deleted successfully!'); // Display success toast message
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };


  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span>{todo.title}</span>
            <div className="buttons">
              <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
