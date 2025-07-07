import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleComplete } from '../redux/features/task/taskSlice'

const TaskList = () => {
  const {tasks, filter} = useSelector((state) => state.tasks)

  const dispatch = useDispatch()
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  console.log(tasks, filter)
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
                  (<input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />) :
                  (<span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>)
                }
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default TaskList