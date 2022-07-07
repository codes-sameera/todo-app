import { useState } from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {

  const [showAdd, setShowAdd] = useState(false)

  const [tasks, setTasks] = useState([])

  const onAdd = () => {
    setShowAdd(!showAdd)
  }

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const onToggle = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task))
  }

  const editTask = (task) => {
    setTasks(tasks.map((curr) => curr.id === task.id ? task : curr))
  }

  return (
    <div className="container">
      <Header onAdd={onAdd} showAdd={showAdd} />
      {showAdd && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={onToggle} onEdit={editTask} />) : ('No Tasks to show')}
    </div>
  );
}

export default App;
