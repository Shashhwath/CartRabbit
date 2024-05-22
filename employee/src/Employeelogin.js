import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Employeelogin = () => {
  const [value, setValue] = useState(
    {
      id:'',
      email: '',
      password: ''
    }
  )
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const [error,setError] = useState(null)
  const Handle = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3005/emp/emplogin',value).then(result => {
      if(result.data.loginStatus)
      {
        localStorage.setItem("valid",true)
        navigate('/employee_details/'+result.data.id)
      }
      else
      {
         setError(result.data.Error)
      }
    }
                                 
  ).catch(err => console.log(err))
  }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='border rounded p-3 w-25  bg-light text-dark  loginForm'>
        <form  onSubmit={Handle}>
        <div className='text-danger text-center'>
            {error && error}
          </div>
          <h2 className='text-center'>Employee Login</h2>
          <div className='mb-3 mt-3'>
            <label htmlFor='id'>Employee Id</label>
            <input type='text' id='id' autoComplete='off' onChange={(e) => setValue({ ...value, id: e.target.value })} placeholder='Enter the Employee Id' className='form-control rounded-0'></input>
          </div>
          <div className='mb-3'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' autoComplete='off' onChange={(e) => setValue({ ...value, email: e.target.value })} placeholder='Enter the email' className='form-control rounded-0'></input>
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' onChange={(e) => setValue({ ...value, password: e.target.value })} placeholder='Enter the Password' className='form-control rounded-0'></input>
          </div>
          <button className='btn btn-success w-100 rounded-0 mb-2' type='submit'>Login</button>
          <div>
            <p className='mb-2'>Ensure given email and password are correct</p>
            <input type='checkbox' id='check' className='me-3'  required></input>
            <label htmlFor='check'>Agree above conditions</label>
          </div>
          <Link to={'/changepassword'} className='btn btn-primary d-flex justify-content-center rounded-0 mt-3'>Change Password</Link>
        </form>
      </div>
    </div>
  )
}

export default Employeelogin
