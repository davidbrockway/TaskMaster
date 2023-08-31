const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword, // Store the hashed password in the database
      },
    });

    res.json({ message: "User registered successfully", user });
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      res.status(400).json({ message: "Email is already in use" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Error registering user" });
    }
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Compare hashed passwords
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Compare hashed passwords
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
});

app.get("/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user data" });
  }
});

// New endpoint to update user profile
app.put("/user/:userId/profile", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { email } = req.body; // We only need to update the email

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
      },
    });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating profile" });
  }
});

app.post("/tasks", async (req, res) => {
  const { title, content, dueDate, dueTime, userId } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        content,
        dueDate: new Date(`${dueDate} ${dueTime}`), // Combine dueDate and dueTime
        isDone: false,
        userId,
      },
    });

    res.json({ message: "Task created successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating task" });
  }
});

app.get("/tasks/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId, // Fetch tasks for the specified user
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

app.put("/tasks/:taskId", async (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const { isDone } = req.body; // Get the isDone value from the request body

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        isDone,
      },
    });

    const successMessage = isDone
      ? "Task marked as complete"
      : "Task unmarked as complete";

    res.json({ message: successMessage, task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task status" });
  }
});

// Delete task
app.delete("/tasks/:taskId", async (req, res) => {
  const taskId = parseInt(req.params.taskId);

  try {
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting task" });
  }
});

// New endpoint to delete user account
app.delete("/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    // Delete user and related tasks
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting account" });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
