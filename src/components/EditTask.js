import { useState } from 'react'

const EditTask = ({ task, onEdit, onUpdateClicked }) => {
    const [text, setText] = useState(task.text)
    const [day, setDay] = useState(task.day)
    const [done, setDone] = useState(task.done)

    const onUpdate = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Please fill in the task name')
            return
        }

        onEdit({ ...task, done: done, text: text, day: day })
        onUpdateClicked()
    }

    return (
        <form className='edit-form' onSubmit={onUpdate}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Done</label>
                <input type='checkbox' checked={done} value={done} onChange={(e) => setDone(e.currentTarget.checked)} />
            </div>
            <input className='btn btn-block' type='submit' value='Update Task' />
        </form>
    )
}

export default EditTask