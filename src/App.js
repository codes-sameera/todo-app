import { useState, useEffect } from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {

  const [showAdd, setShowAdd] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks()
      setTasks(tasks)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const onAdd = () => {
    setShowAdd(!showAdd)
  }

  const addTask = async (task) => {
    const res = await fetch(
      'http://localhost:5000/tasks/',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      }
    )
    const data = await res.json()
    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    await fetch(
      `http://localhost:5000/tasks/${id}`,
      {
        method: 'DELETE'
      }
    )
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleDone = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, done: !taskToToggle.done }
    const res = await fetch(
      `http://localhost:5000/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      }
    )
    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? data : task))
  }

  const editTask = async (task) => {
    const res = await fetch(
      `http://localhost:5000/tasks/${task.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      }
    )
    const data = await res.json()
    setTasks(tasks.map((curr) => curr.id === data.id ? data : curr))
  }

  return (
    <div className="container">
      <Header onAdd={onAdd} showAdd={showAdd} />
      {showAdd && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleDone} onEdit={editTask} />) : ('No Tasks to show')}
    </div>
  );
}

export default App;
