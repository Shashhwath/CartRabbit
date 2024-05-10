import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './index.css'

const Login = () => {

  const [value, setValue] = useState(
    {
      email: '',
      password: ''
    }
  )
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const [error,setError] =useState(null)
  const Handle = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3005/auth/admin', value).then(result => {
      if(result.data.loginStatus)
      {
        localStorage.setItem("valid",true)
        navigate('/dashboard')
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
        <form onSubmit={Handle}>
        <div className='text-warning'>
          {error && error}
          </div>
          <h2 className='text-center'>Admin Login</h2>
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
            <input type='checkbox' id='check' className='me-3' required></input>
            <label htmlFor='check'>Agree terms and conditions</label>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
