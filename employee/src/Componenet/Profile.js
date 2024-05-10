import axios from 'axios'
import React, { useEffect, useState } from 'react'
const Profile = () => {
    const [admins,setAdmins] = useState([])
    useEffect(
        () => {
            axios.get('http://localhost:3005/auth/getadmins').then(result =>
                {
                    if(result.data.Result)
                    {
                      setAdmins(result.data.Result)
                    }
                    else{
                      alert(result.data.Error)
                    }
                }
               ).catch(err => console.log(err))
        }
    ,[])
  return (
    <div className='vh-100 mt-5'>
      <div >
      <h2 className='d-flex justify-content-center mt-3 '>Admin Details</h2>
     
        <table className='table mt-5 border'>
          <thead>
            <tr>
             <th><h3 className='d-flex justify-content-center m-2'>Email</h3></th> 
            </tr>
          </thead>
          <tbody>
            {
              admins.map( a =>
                <tr key={a.id} cl>
                  <td className='d-flex justify-content-center m-2'> <h4>{a.email}</h4></td>
                </tr>
              ) 
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Profile
