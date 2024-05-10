import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
const EmployeeDetail = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3005/emp/empdetails' + id).then(result => {
      if (result.data.Status) {
        setEmployee(result.data.Result)
      }
      else {
        alert(result.data.Error)
      }
    }
    ).catch(err => console.log(err))
  })

  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const Logout = () => {
    axios.get('http://localhost:3005/emp/logout').then(result => {
      if (result.data.Status) {
        localStorage.removeItem("valid")
        navigate('/')
      }
      else {
        alert("Error")
      }
    }

    ).catch(err => console.log(err))
  }


  return (
    <div className='bg-light vh-100 '>
      <div className="col p-0 m-0 bg-light  ">
        <div className="p-2 d-flex justify-content-center shadow  bg-dark text-light">
          <h2 >Employee Management System</h2>
        </div>
        {
          employee.map(e =>
            <div key={e.id} className='d-flex justify-content-center align-items-center h-25 w-50 m-auto flex-column mt-5'>
              <img src={`http://localhost:3005/Images/` + e.image} alt='' className='profile' />
              <br />
              <br />
              <br />
              <h2>Name : {e.name}</h2>
              <h2>Email : {e.email}</h2>
              <h2>Phone : {e.phone}</h2>
              <h2>Address : {e.address}</h2>
              <h2>Salary : {e.salary}</h2>
              <h2>Department : {e.department}</h2>
              <br />
              <br />
              <div className='d-flex justify-content-around align-items-center'>
                <Link to={'/editempdetails/' + e.id}>
                  <button className='btn btn-info w-75 m-3'>Edit</button>
                </Link>
                <button className='btn btn-danger h-100 w-50' onClick={Logout}>Logout</button>
              </div>

            </div>
          )
        }
      </div>
    </div>
  )
}

export default EmployeeDetail
