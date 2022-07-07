import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [done, setDone] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Please fill in the task name')
            return
        }

        onAdd({ text, day, done })

        setText('')
        setDay('')
        setDone(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='New Task' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='dd/mm/yy & hh:mm' value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Done</label>
                <input type='checkbox' checked={done} value={done} onChange={(e) => setDone(e.currentTarget.checked)} />
            </div>
            <input className='btn btn-block' type='submit' value='Save Task' />
        </form>
    )
}

export default AddTask