import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
const Cateogry = () => {

  const [cateogry, setCateogry] = useState([])

  // To fetch category from db

  useEffect(() => {
    axios.get('http://localhost:3005/auth/getcat').then(result => {
      if (result.data.Status) {
        setCateogry(result.data.Result)
      }
      else {
        alert(result.data.Error)
      }
    }

    ).catch((err) => console.log(err))
  }, [])

  return (
    
   //Display different kinds of category

   <div className="container-custom">
   <div className='header-custom p-3 mt-5 d-flex justify-content-center'>
     <h2>Department List</h2>
   </div>
   <div className="d-flex justify-content-center">
     <Link to="/dashboard/cateogry/addcateogry" className="btn btn-success btn-custom">Add Department</Link>
     <Link to="/dashboard/cateogry/delete" className="btn btn-danger btn-custom">Delete Department</Link>
   </div>

   <table className='table table-custom'>
     <thead>
       <tr>
         <th className='d-flex justify-content-center m-2'>Department Name</th>
       </tr>
     </thead>
     <tbody>
       {
         cateogry.map(c => (
           <tr key={c.id}>
             <td className='d-flex justify-content-center'>{c.name}</td>
           </tr>
         ))
       }
     </tbody>
   </table>
 </div>
  )
}

export default Cateogry
