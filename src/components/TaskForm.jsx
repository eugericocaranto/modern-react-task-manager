import React, { useState } from 'react'
import { addTask } from '../redux/features/task/taskSlice'
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'

const TaskForm = () => {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text.trim() === '') return

    dispatch(addTask({
      id: nanoid(),
      text: text.trim(),
      completed: false,
    }))

    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2 mb-4'>
      <input type="text" placeholder='Add new task' onChange={(e) => setText(e.target.value)}
        className='flex-1 p-2 border rounded-md' value={text} />
      <button type='submit' className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700'>Add Task</button>
    </form>
  )
}

export default TaskForm