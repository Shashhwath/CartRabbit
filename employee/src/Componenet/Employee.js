import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
const Employee = () => {
 
  const[employee,setEmployee] = useState([])
  useEffect(() =>{
     axios.get('http://localhost:3005/auth/getemp').then( result => 
      {
        if(result.data.Status)
        {
          setEmployee(result.data.Result)
        }
        else
        {
          alert(result.data.Error)
        }
    }
     ).catch( err => console.log(err))
  },[])

   const Delete = (id) =>
    {
       axios.delete('http://localhost:3005/auth/deletemp'+id).then(result => 
        {
            if(result.data.Status)
            {
              window.location.reload()
            }
            else{
              alert(result.data.Error)
            }
        }
       ).catch(err => console.log(err))
    }


  return (
    <div className="container-custom">
      <div className='header-custom p-3 mt-5 d-flex justify-content-center'>
        <h2>Employee List</h2>
      </div>
      <Link to="/dashboard/employee/addemployee" className='btn btn-success m-3'>Add Employee</Link>

      <table className='table table-custom'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Salary</th>
            <th>Address</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            employee.map(e =>
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td><img src={`http://localhost:3005/Images/` + e.image} alt='' className='employee' /></td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.salary}</td>
                <td>{e.address}</td>
                <td>{e.department}</td>
                <td>
                  <div>
                    <Link to={'/dashboard/edit_emp/' + e.id}>
                      <button className='btn btn-custom btn-custom-update'>Update</button>
                    </Link>
                    <button className='btn btn-custom btn-custom-delete' onClick={() => Delete(e.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Employee
