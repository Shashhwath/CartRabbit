import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Begin = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    useEffect(() =>
    {
      axios.get('http://localhost:3005/check').then(result =>
        {
            if(result.data.Status)
            {
                if(result.data.role==="admin")
                {
                   navigate('/dashboard')
                }
                else{
                  navigate('/employee_details/'+result.data.id)
                }
            }
        }
      ).catch(err => console.log(err))
    })
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='border rounded p-3 w-25 h-25 bg-light text-dark bg-opacity-75 loginForm'>
          <h2 className='text-center mb-5'> Login As</h2>
          <div className='d-flex justify-content-around'>
          <button className='btn btn-success ' onClick={() => {navigate('/adminlogin')}}>Admin</button>
          <button className='btn btn-info ' onClick={() => {navigate('/employeelogin')}}>Employee</button>
          </div>
      </div>
    </div>
  )
}

export default Begin
