import React from 'react';
import { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';


export default function App() {
  const [tasks, setTasks] = useState([])
  const [value, setValue] = useState('')
  const [id, setId] = useState(0)
  const [count, setCount] = useState(0)


  // FUNCTION TO ADD TASK TO DATABASE
  function addTask() {
    console.log(value)
    axios.post('http://localhost:8000/task', { task: value })
      .then(() => {
        setValue('')
        setCount(count => ++count)
      }).catch((err) => {
        console.log(err)
      })
  }
  console.log(tasks)

  // FUNCTION TO GET ID OF TASK TO BE UPDATED
  function getById(id) {
    axios.get(`http://localhost:8000/task/${id}`)
      .then((res) => {
        setValue(res.data.task)
        setId(id)
        console.log(id)
      }).catch((err)=>console.log(err))
  }

  // FUNCTION TO UPDATE TASK
  function updateTask() {
    axios.put(`http://localhost:8000/task/${id}`, { task: value })
      .then(() => {
        setValue('')
        setId(0)
        setCount(count => ++count)
      }
      ).catch(err=>console.log(err))

  }

// FUNCTION TO DELETE TASK
  const taskDel = (id) => {
    axios.delete(`http://localhost:8000/task/${id}`)
      .then(() => {
        alert('Task deleted')
        setCount(count => --count)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // EVERY TIME TASK IS ADDED,UPDATED OR DELETED COUNT IS INCREMENTED ALLOWING US TO FETCH THE COMPONENTS FROM DATABASE
  useEffect(() => {
    axios.get('http://localhost:8000/task')
      .then(({ data }) => {
        setTasks(data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [count])


  return (
    <div className="container">
      <div id="todo">

        <div className='form'>
          <div className="form-input">
            <label htmlFor="tasks"></label>
            <input type="text" id='tasks'
              onChange={e => setValue(e.target.value)}
              value={value}
            />
          </div>
          <div className="btn-container">
            <button className='btn btn-sub' type='submit' onClick={addTask}>Add</button>
            <button className='btn btn-update'
              onClick={updateTask}>Update</button>
          </div>
        </div>


        <h1 className='header'>My List</h1>

        <ul className='list'>
          {
            tasks.length !== 0 ?
              tasks.map(task => (
                <li key={task._id}>
                  <label>
                    <input type="checkbox"
                    />{task.task}</label>
                  <div className="btn-container">
                    <button className='btn btn-update'
                      onClick={() => { getById(task._id) }}>Edit</button>
                    <button className='btn btn-del'
                      onClick={() => taskDel(task._id)}
                    >Delete</button>
                  </div>
                </li>
              )) :
              <h1>NOTHING TO DISPLAY</h1>
          }
        </ul>
      </div>

    </div>
  )

}