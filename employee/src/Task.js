import React from 'react'

const Task = ({ todo, del, index }) => {
  return (
    <div className="todo">
      <p>{todo}</p>
      <input type="checkbox"></input>
      <button onClick={() => del(index)}>Delete</button>
    </div>
  )
}

export default Task
