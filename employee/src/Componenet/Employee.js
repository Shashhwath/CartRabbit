import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
    <div className='vh-100 mt-5' >
    <div className='p-3  d-flex justify-content-center'>
       <h2>Employee List</h2>
    </div>
    <Link to="/dashboard/employee/addemployee" className='btn btn-success m-3'>Add Employee</Link>

    <table className='table border'>
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
              employee.map( e => 
                <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td><img src={`http://localhost:3005/Images/`+e.image} alt='' className='employee'/></td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.salary}</td>
                <td>{e.address}</td>
                <td>{e.department}</td>
                <td>
                <div >
                <Link to={'/dashboard/edit_emp/'+e.id}> <button className='btn btn-info  m-3 '>Update</button></Link>
                 <button className='btn btn-danger text-light ' onClick={()=>Delete(e.id)}>Delete</button>
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
