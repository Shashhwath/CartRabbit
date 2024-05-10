import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Addcateogry = () => {

  const [cateogry,setCateogry] = useState()
  const navigate = useNavigate()
  
  //To add different types of category to db

  const Handle  = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3005/auth/cat",{cateogry}).then( result =>
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
  ).catch( err => console.log(err))
  }
  return (

    //form for adding category
    
    <div className='d-flex justify-content-center align-items-center vh-100 mt-5 loginPage'>
    <div className='border rounded p-3 w-25 loginForm'>
      <form onSubmit={Handle}>
        <h2 className='text-dark'>Add Department</h2>
        <div className='mb-3'>
          <label htmlFor='cateogry'>Department</label>
          <input type='text' id='cateogry' autoComplete='off' onChange={(e)=>setCateogry(e.target.value)} placeholder='Enter the Department' className='form-control rounded-0'></input>
        </div>
        <button className='btn btn-success w-100 rounded-0 mb-2' type='submit'>Add Department</button>
      </form>
    </div>
  </div>
  )
}

export default Addcateogry
