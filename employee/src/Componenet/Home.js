import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './style.css'
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
    <div className="dashboard-container">
      <div className="container mt-5">
        <h2 className="text-center">Dashboard</h2>

        <div className="row justify-content-center mt-4">
          <div className="col-md-4 p-3">
            <div className="card border-0 shadow-lg card-custom">
              <div className="card-header text-center card-header-custom">
                <h4>Employee</h4>
              </div>
              <div className="card-body card-body-custom text-center">
                <div className="d-flex justify-content-between">
                  <h5>Total:</h5>
                  <h5>{totemp}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-md-4 p-3">
            <div className="card border-0 shadow-lg card-custom">
              <div className="card-header text-center card-header-custom">
                <h4>Admin</h4>
              </div>
              <div className="card-body card-body-custom text-center">
                <div className="d-flex justify-content-between">
                  <h5>Total:</h5>
                  <h5>{totadmin}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-md-4 p-3">
            <div className="card border-0 shadow-lg card-custom">
              <div className="card-header text-center card-header-custom">
                <h4>Salary</h4>
              </div>
              <div className="card-body card-body-custom text-center">
                <div className="d-flex justify-content-between">
                  <h5>Total:</h5>
                  <h5>{totsalary}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
