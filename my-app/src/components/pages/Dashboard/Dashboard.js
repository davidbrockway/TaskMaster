import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../../NavigationBar";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [taskAdded, setTaskAdded] = useState(false);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [markCompleteSuccess, setMarkCompleteSuccess] = useState(false);
  const [deleteTaskSuccess, setDeleteTaskSuccess] = useState(false);



  useEffect(() => {
    async function fetchUserData() {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:4000/user/${userId}`);
        const userData = await response.json();

        if (response.ok) {
          setUser(userData);
          fetchTasks(userId);
        } else {
          console.error("Error fetching user data:", userData.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  const fetchTasks = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/tasks/${userId}`
      );
      const taskData = await response.json();

      if (response.ok) {
        const inProgress = taskData.filter((task) => !task.isDone);
        const completed = taskData.filter((task) => task.isDone);
        setTasksInProgress(inProgress);
        setCompletedTasks(completed);
        setIsLoading(false);
      } else {
        console.error("Error fetching tasks:", taskData.message);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        dueDate,
        dueTime,
        userId: user.id,
      }),
    });

    if (response.ok) {
      console.log("Task created successfully");
      setTaskAdded(true);
      // Reset form values
      setTitle("");
      setContent("");
      setDueDate("");
      setDueTime("");
      setTimeout(() => {
        setTaskAdded(false);
      }, 3000); // Clear the message after 3 seconds
      fetchTasks(user.id); // Fetch tasks again to update the lists
    } else {
      console.error("Error creating task");
    }
  };

  const markTaskAsComplete = async (taskId) => {
    const response = await fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isDone: true,
      }),
    });

    if (response.ok) {
      console.log("Task marked as complete");
      fetchTasks(user.id); // Fetch tasks again to update the lists
      setMarkCompleteSuccess(true); // Set mark complete success
      setTimeout(() => {
        setMarkCompleteSuccess(false);
      }, 3000); // Show success banner for 3 seconds
    } else {
      console.error("Error marking task as complete");
    }
  };

  const deleteTask = async (taskId) => {
    const response = await fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Task deleted");
      fetchTasks(user.id); // Fetch tasks again to update the lists
      setDeleteTaskSuccess(true)
      setTimeout(() => {
      setDeleteTaskSuccess(false);

      }, 3000); // Show success banner for 3 seconds
    } else {
      console.error("Error deleting task");
    }
  };

  const unmarkTaskAsComplete = async (taskId) => {
    const response = await fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isDone: false, // Unmark the task as complete
      }),
    });
  
    if (response.ok) {
      console.log("Task unmarked as complete");
      fetchTasks(user.id); // Fetch tasks again to update the lists
    } else {
      console.error("Error unmarking task as complete");
    }
  };
  
  return (
    <>
      <NavigationBar user={user} />
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <p>
          Welcome to your TaskMaster dashboard,{" "}
          {user ? user.firstName : "Guest"}!
        </p>
      </div>
      <div className="container mx-auto p-8">
        {taskAdded && (
          <div className="bg-green-200 text-green-700 p-2 mb-4">
            Task added successfully!
          </div>
        )}
        <h3 className="text-lg font-semibold mb-2">Add Task</h3>
        <form onSubmit={handleSubmit} className="flex space-x-4">
        <div className="flex-grow">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
                rows="4"
              />
            </div>
          </div>
          <div className="flex-grow">
            <div className="mb-4">
              <label htmlFor="dueDate" className="block text-sm font-medium">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dueTime" className="block text-sm font-medium">
                Due Time
              </label>
              <input
                type="time"
                id="dueTime"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
      <div className="container mx-auto p-8">
        {!isLoading && (
          <div className="flex">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-2">Tasks in Progress</h3>
              <ul className="border rounded p-4">
                {tasksInProgress.map((task) => (
                  <li key={task.id} className="mb-4">
                    <div className="border p-4">
                      <h4 className="font-medium">{task.title}</h4>
                      <p>{task.content}</p>
                      <p>Due Date: {task.dueDate}</p>
                      <p>Due Time: {task.dueTime}</p>
                      {!task.isDone && (
                        <button
                          className="bg-green-500 text-white py-1 px-2 rounded mt-2 mr-2"
                          onClick={() => markTaskAsComplete(task.id)}
                        >
                          Mark as Complete
                        </button>
                      )}
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded mt-2"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete Task
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-grow ml-4">
              <h3 className="text-lg font-semibold mb-2">Completed Tasks</h3>
              <ul className="border rounded p-4">
                {completedTasks.map((task) => (
                  <li key={task.id} className="mb-4">
                    <div className="border p-4">
                      <h4 className="font-medium">{task.title}</h4>
                      <p>{task.content}</p>
                      <p>Due Date: {task.dueDate}</p>
                      <p>Due Time: {task.dueTime}</p>
                      <p className="text-green-600">Completed</p>
        <button
          className="bg-orange-500 text-white py-1 px-2 rounded"
          onClick={() => unmarkTaskAsComplete(task.id)}
        >
          Unmark Completed
        </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default Dashboard;
