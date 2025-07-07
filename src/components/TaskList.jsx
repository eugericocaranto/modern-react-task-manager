import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, toggleComplete } from '../redux/features/task/taskSlice'

const TaskList = () => {
  const {tasks, filter} = useSelector((state) => state.tasks)

  const dispatch = useDispatch()
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  const handleEdit = (id, text) => {
    setEditId(id)
    setEditText(text)
  }

  const handleEditSave = (task) => {
    if (editText.trim() === '') return

    dispatch({
      type: 'tasks/updateTask',
      payload: { id: task.id, text: editText.trim(), completed: task.completed }
    })

    setEditId(null)
    setEditText('')
  }

  return (
    <div>
      <ul className='space-y-2'>
        {tasks.length === 0 && (<p>No tasks found.</p>)}
        {
          tasks.map((task) => (
            <li key={task.id} className='flex items-center justify-between p-3 border rounded'>
              <div className='flex items-center gap-2'>
                <input type="checkbox" checked={task.completed} onChange={() => dispatch(toggleComplete(task.id)) }
                className='border rounded px-2'/>
                {
                  editId === task.id ? 
                  (<input className='border rounded px-2' type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />) :
                  (<span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>)
                }
              </div>

              <div className='flex gap-2'>
                {
                  editId === task.id ? 
                  (<button onClick={() => handleEditSave(task)}
                    className='text-grey-600 hover:underline cursor-pointer'>Save</button>) :
                  (<button onClick={() => handleEdit(task.id, task.text)}
                    className='text-blue-600 hover:underline cursor-pointer'>Edit</button>)
                }

                <button onClick={() => dispatch(deleteTask(task.id))}
                  className='text-red-500 hover:underline cursor-pointer'>Delete</button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default TaskList