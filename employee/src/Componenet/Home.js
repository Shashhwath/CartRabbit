import axios from 'axios'
import React, { useEffect, useState } from 'react'
const Home = () => {
 
  const [totemp,setTotemp] = useState(0)
  const [totadmin,setTotadmin] = useState(0)
  const [totsalary,setTotsalary] = useState(0)
 
   useEffect(() =>
  {
    //Get total no of employees
   axios.get('http://localhost:3005/auth/totemp').then(result => {
     if(result.data.Status)
      {
        setTotemp(result.data.Result[0].emp)
      }
      else
      {
        alert(result.data.Error)
      }
   }).catch(err => console.log(err))
   
   //Get total no of admins
   axios.get('http://localhost:3005/auth/totadmin').then(result =>{
    if(result.data.Status)
      {
        setTotadmin(result.data.Result[0].employeedata)
      }
      else
      {
        alert(result.data.Error)
      }
    }
   ).catch(err => console.log(err))
  
   //get total amount of salary
   axios.get('http://localhost:3005/auth/totsalary').then(result =>{
    if(result.data.Status)
      {
        setTotsalary(result.data.Result[0].salary)
      }
      else
      {
        alert(result.data.Error)
      }
    }
   ).catch(err => console.log(err))

  
  },[])
  return (
    <div className='vh-100 mt-5 bg-light'>
      <h2 className='d-flex justify-content-center mt-3'>Dashboard</h2>
      <div className='p-3 d-flex justify-content-center mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr/>
          <div className='d-flex justify-content-around'>
            <h5>Total:</h5>
            <h5>{totemp}</h5>
          </div>
        </div>
      </div>
      <div className='p-3 d-flex justify-content-center mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr/>
          <div className='d-flex justify-content-around'>
            <h5>Total:</h5>
            <h5>{totadmin}</h5>
          </div>
        </div>
      </div>
      <div className='p-3 d-flex justify-content-center mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr/>
          <div className='d-flex justify-content-around'>
            <h5>Total:</h5>
            <h5>{totsalary}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
