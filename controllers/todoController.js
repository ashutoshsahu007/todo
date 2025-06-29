import TodoModel from "../models/Todo.js";

// Get all incomplete todos
export const getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find({ completed: false });
    console.log("Todos fetched:", todos);
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// Create a new todo
export const createTodo = async (req, res) => {
  console.log("Received todo:", req.body);
  try {
    const todo = new TodoModel(req.body);
    const savedTodo = await todo.save();
    console.log("Todo created:", savedTodo);
    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  console.log(
    `Updating todo with ID: ${id}, title: ${title}, completed: ${completed}`
  );
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { title, completed, updatedAt: new Date() },
      { new: true }
    );
    if (!updatedTodo) {
      console.error(`Todo with ID ${id} not found`);
      return res.status(404).json({ error: "Todo not found" });
    }
    console.log("Todo updated:", updatedTodo);
    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Failed to update todo" });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  console.log(`Deleting todo with ID: ${id}`);
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      console.error(`Todo with ID ${id} not found`);
      return res.status(404).json({ error: "Todo not found" });
    }
    console.log("Todo deleted:", deletedTodo);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
