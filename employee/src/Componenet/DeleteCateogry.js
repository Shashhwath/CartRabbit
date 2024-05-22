import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DeleteCateogry = () => {
  
  
  const [cateogry,setCateogry] = useState([])
  const [value,setValue] = useState()
  useEffect(
    () =>
    {
       axios.get('http://localhost:3005/auth/getcat').then(result =>
        {
          if(result.data.Status)
            {
              setCateogry(result.data.Result)
            }
          else
          {
            alert(result.data.Error)
          }
        }
       ).catch(err => console.log(err))
    }
  )
  
  const navigate = useNavigate()

  const Delete = (e) =>
  {
    e.preventDefault()
    console.log(value)
    axios.delete('http://localhost:3005/auth/delcat/'+value).then(result => 
      {
        if(result.data.Status)
          {
            navigate('/dashboard/cateogry')
          }
          else
          {
            alert(result.data.Error)
          }
      }
    ).catch(err => console.log(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 '>
    <div className='border rounded p-3 w-25 loginForm position-fixed'>
      <form onSubmit={Delete}>
        <h2 className='text-dark'>Delete Department</h2>
        <div className='mb-3'>
          <label htmlFor='cateogry'>Department</label>
          <select type='text' id='cateogry' autoComplete='off' onChange={(e) => setValue(e.target.value)} placeholder='Choose the Department' className='form-select rounded-0'>
            {cateogry.map( c => {return <option key={c.id}>{c.name}</option>})}
          </select>
        </div>
        <button className='btn btn-success w-100 rounded-0 ' type='submit'>Delete Department</button>
      </form>
    </div>
  </div>
  )
}

export default DeleteCateogry
