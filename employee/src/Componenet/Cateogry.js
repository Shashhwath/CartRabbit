import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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

    <div className='vh-100 mt-5'>
      <div className='p-3  d-flex justify-content-center'>
       <h2>Department List</h2>
      </div>
      <Link to="/dashboard/cateogry/addcateogry" className="btn btn-success m-3">Add Department</Link>

      <table className='table'>
       <thead><th className='d-flex justify-content-center m-2'>Department Name</th></thead> 
        <tbody>
          {
            cateogry.map(c => <tr key={c.id}> <td className='d-flex justify-content-center'>{c.name}</td></tr>)
          }
        </tbody>
      </table>

    </div>
  )
}

export default Cateogry
