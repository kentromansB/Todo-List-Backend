const Tasks = require("../models/Task");
require("dotenv").config();

// Express Task Creation Function
async function createTask(req, res) {
  try {
    const { title, description, deadline, completed, username, user_id } =
      req.body;
    const todo = new Tasks({
      title: title,
      description: description,
      deadline: deadline,
      completed: completed,
      username: username,
      user_id: user_id,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Express Task Fetch Function
async function fetchTask(req, res) {
  try {
    const { user_id } = req.query;
    console.log("1", user_id);
    const todo = await Tasks.find({ user_id: user_id });
    res.json(todo);
    console.log("2", todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Express Pending Task Fetch Function
async function fetchPendingTask(req, res) {
  const { user_id } = req.query;
  const todo = await Tasks.find({ user_id: user_id, completed: "false" });
  res.json(todo);
}
// Express Completed Task Fetch Function
async function fetchCompletedTask(req, res) {
  const { user_id } = req.query;
  const todo = await Tasks.find({ user_id: user_id, completed: "true" });
  res.json(todo);
}

async function updateTask(req, res) {
  const { title, description, completed } = req.body;
  const todo = await Tasks.findByIdAndUpdate(
    req.params.id,
    { title, description, completed },
    { new: true }
  );
  res.json(todo);
}

// router.delete('/todo/:id', async (req, res) => {
//     await Todo.findByIdAndDelete(req.params.id);
//     res.status(204).send();
// });

module.exports = {
  createTask,
  fetchTask,
  fetchPendingTask,
  fetchCompletedTask,
};
