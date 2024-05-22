import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Addemployee = () => {
   
  //To set the values employee details to pass to backend

  const [values,setValues] = useState(
    {
      name:"",
      email:"",
      password:"",
      salary:"",
      address:"",
      department:"",
      phone:"",
      cateogry:"",
      image:"",
    }
  )
   
  //To fetch the category from db

  const [cateogry, setCateogry] = useState([])
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

  //To store employee details in database

  const navigate = useNavigate()
  const Handle =(e) => {
   e.preventDefault()
   const fd =new FormData()
   fd.append('name',values.name);
   fd.append('email',values.email);
   fd.append('password',values.password);
   fd.append('salary',values.salary);
   fd.append('address',values.address);
   fd.append('department',values.department);
   fd.append('phone',values.phone);
   fd.append('cateogry',values.cateogry);
   fd.append('image',values.image);
   console.log(fd)
   axios.post('http://localhost:3005/auth/emp',fd).then( result =>
    {

        if(result.data.Status)
        {
          navigate('/dashboard/employee')
        }
        else
        {
          alert(result.data.Error)
        }
    }
   ).catch( err => console.log(err))
  }
  return (

    //Form for adding employee details 
    <div className='bg-dark vh-100'>
    <div className='d-flex justify-content-center mt-0 align-items-center vh-100  '>
     <div className='p-3 rounded border w-100  mt-0 d-flex justify-content-center align-items-center bg-light'>
    <div className='border rounded p-3 w-25 '>
      <form className='row g-1' onSubmit={Handle}>
        <h2 className='text-dark text-center'>Add Employee</h2>
        <div className='col-12'>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' autoComplete='off' onChange={(e) => setValues({...values,name:e.target.value})} placeholder='Enter the Name' className='form-control rounded-0'></input>
        </div>
        <div className='col-12'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' autoComplete='off' onChange={(e)=>setValues({...values,email:e.target.value})} placeholder='Enter the Email' className='form-control rounded-0'></input>
        </div>
        <div className='col-12'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' autoComplete='off' onChange={(e) => setValues({...values,password:e.target.value})} placeholder='Enter the Password' className='form-control rounded-0'></input>
        </div>
        <div className='col-12'>
          <label htmlFor='salary'>Salary</label>
          <input type='text' id='salary' autoComplete='off' onChange={(e) => setValues({...values,salary:e.target.value})} placeholder='Enter the Salary' className='form-control rounded-0'></input>
        </div>
        <div className='col-12'>
          <label htmlFor='address'>Address</label>
          <input type='text' id='address' autoComplete='off' onChange={(e) => setValues({...values,address:e.target.value})}  placeholder='Enter the Address' className='form-control rounded-0'></input>
        </div>
        <div className='col-12'>
          <label htmlFor='department'>Department</label>
          <input type='text' id='department'autoComplete='off'  onChange={(e) => setValues({...values,department:e.target.value})}  placeholder='Enter the Department' className='form-control rounded-0'></input>
        </div>
        <div className='col-12'>
          <label htmlFor='phone'>Phone No</label>
          <input type='text' id='phone'autoComplete='off'  onChange={(e) => setValues({...values,phone:e.target.value})}  placeholder='Enter the Phone Number' className='form-control rounded-0 '></input>
        </div>
        <div className='col-12'>
          <label htmlFor='cateogry'>Category</label>
          <select className='form-select' id='cateogry' onChange={(e) => setValues({...values,cateogry:e.target.value})}>
             {cateogry.map( c => {return <option key={c.id} value={c.id}>{c.name}</option> })}
          </select>
        </div>
        <div className='col-12'>
          <label htmlFor='image'>Image</label>
          <input type='file' id='image' name='image' autoComplete='off' onChange={(e) => setValues({...values,image:e.target.files[0]})} placeholder='Upload the Image' className='form-control rounded-0 mb-3'></input>
        </div>
        <button className='btn btn-success w-100 rounded-0 mb-2' type='submit'>Add Employee </button>
      </form>
    </div>
    </div>
  </div>
  </div>
  )
}

export default Addemployee
