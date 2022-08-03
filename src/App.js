import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAdd, setShowAdd] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };
    //test commit
    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/tasks`);
    const data = await res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const onAdd = () => {
    setShowAdd(!showAdd);
  };

  const addTask = async (task) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  const deleteTask = async (id) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleDone = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, done: !taskToToggle.done };
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();
    setTasks(tasks.map((task) => (task.id === id ? data : task)));
  };

  const editTask = async (task) => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/tasks/${task.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    const data = await res.json();
    setTasks(tasks.map((curr) => (curr.id === data.id ? data : curr)));
  };

  return (
    <Router>
      <div className="container">
        <Header onAdd={onAdd} showAdd={showAdd} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAdd && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleDone}
                    onEdit={editTask}
                  />
                ) : (
                  "No Tasks to show"
                )}
              </>
            }
          />
        </Routes>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
