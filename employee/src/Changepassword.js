import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Changepassword = () => {
        
        const [value,setValue] = useState(
            {
                id:"",
                old:"",
                new:""
            }
        )
        const navigate = useNavigate()
        const Change = (e) => 
        {
          e.preventDefault()
          axios.put('http://localhost:3005/emp/change',value).then(result =>
            {
                if(result.data.Status)
                {
                  navigate('/employeelogin')
                }
                else
                {
                  alert(result.data.Error)
                }
            }
          ).catch(err => console.log(err))
        }
  return (
    <div className='bg-light vh-100'>
      <div className="p-2 d-flex justify-content-center shadow  bg-dark text-light">
          <h2 >Employee Management System</h2>
        </div>
        <h3 className='d-flex justify-content-center mt-5'>Change Password</h3>
        <div className='d-flex justify-content-center align-items-center mt-5'>
        <div className='border rounded p-3 w-25 loginForm text-dark '>
      <form onSubmit={Change}>
        <h2 className='text-dark text-center'>Password</h2>
        <div className='mb-3'>
         <label htmlFor='id'>Employee Id</label>
          <input type='text' id='id' autoComplete='off' onChange={(e)=>setValue({...value,id:e.target.value})} placeholder='Enter the Employee Id' className='form-control rounded-0'></input>
        </div>
        <div className='mb-3'>
          <label htmlFor='old'>Old Password</label>
          <input type='text' id='pld' autoComplete='off' onChange={(e)=>setValue({...value,old:e.target.value})} placeholder='Enter the Old Password' className='form-control rounded-0'></input>
        </div>
        <div className='mb-3'>
          <label htmlFor='new'>New Password</label>
          <input type='text' id='new' autoComplete='off' onChange={(e)=>setValue({...value,new:e.target.value})} placeholder='Enter the New Password' className='form-control rounded-0'></input>
        </div>
        <button className='btn btn-success w-100 rounded-0 mb-2' type='submit'>Change Password</button>
      </form>
    </div>
    </div>
    </div>
  )
}

export default Changepassword
