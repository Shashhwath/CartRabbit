import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './style.css'
const Editemployee = () => {

    const {id} = useParams()

    const [values,setValues] = useState(
        {
          name:"",
          email:"",
          salary:"",
          address:"",
          cateogry:"",
          phone:"",
          image:""
        }
      )
      const [cateogry, setCateogry] = useState([])
      const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3005/auth/getcat').then(result => {
      if (result.data.Status) {
        setCateogry(result.data.Result)
      }
      else {
        alert(result.data.Error)
      }
    }).catch((err) => console.log(err))
    axios.get('http://localhost:3005/auth/getemp/'+id).then(result => {
      if (result.data.Status) {
        console.log(values)
        setValues(
          {...values,
          name:result.data.Result[0].name,
          email:result.data.Result[0].email,
          salary:result.data.Result[0].salary,
          address:result.data.Result[0].address,
          phone:result.data.Result[0].phone,
          department:result.data.Result[0].department,
          cateogry:result.data.Result[0].cateogry
          }
        )
      }
      else {
        alert(result.data.Error)
      }
    }
    ).catch( err =>console.log(err))

  }, [])

  const Handle = (e) =>
    {
       e.preventDefault()
       const fd =new FormData()
       fd.append('name',values.name);
       fd.append('email',values.email);
       fd.append('salary',values.salary);
       fd.append('address',values.address);
       fd.append('phone',values.phone);
       fd.append('department',values.department);
       fd.append('cateogry',values.cateogry);
       fd.append('image',values.image);
      axios.put('http://localhost:3005/emp/setemp/'+id,fd).then(result => 
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
      ).catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center  '>
     <div className='p-3 rounded border w-100 d-flex justify-content-center align-items-center vh-100 mt-3'>
    <div className='border rounded p-3 w-25 '>
      <form className='row g-1' onSubmit={Handle} >
        <h2 className='text-dark d-flex justify-content-center'>Edit Employee</h2>
        <div className='col-12'>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' autoComplete='off' value={values.name} onChange={(e) => setValues({...values,name:e.target.value})} placeholder='Enter the Name' className='form-control rounded-0'></input>
        </div>
        <div className='col-12'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' autoComplete='off'value={values.email} onChange={(e)=>setValues({...values,email:e.target.value})} placeholder='Enter the Email' className='form-control rounded-0'></input>
        </div>
        <div className='col-12'>
          <label htmlFor='salary'>Salary</label>
          <input type='text' id='salary' autoComplete='off'value={values.salary} onChange={(e)=>setValues({...values,salary:e.target.value})} placeholder='Enter the Salary' className='form-control rounded-0'></input>
        </div>
        <div className='col-12'>
          <label htmlFor='address'>Address</label>
          <input type='text' id='address' autoComplete='off'value={values.address} onChange={(e) => setValues({...values,address:e.target.value})}  placeholder='Enter the Address' className='form-control rounded-0'></input>
        </div>
        <div className='col-12'>
          <label htmlFor='phone'>Phone No</label>
          <input type='text' id='phone' autoComplete='off' value={values.phone} onChange={(e) => setValues({...values,phone:e.target.value})}  placeholder='Enter the Phone Number' className='form-control rounded-0 '></input>
        </div>
        <div className='col-12'>
          <label htmlFor='department'>Department</label>
          <input type='text' id='department' autoComplete='off' value={values.department} onChange={(e) => setValues({...values,department:e.target.value})}  placeholder='Enter the Department' className='form-control rounded-0 '></input>
        </div>
        <div className='col-12'>
          <label htmlFor='cateogry'>Category</label>
          <select className='form-select mb-3' id='cateogry' value={values.cateogry} onChange={(e) => setValues({...values,cateogry:e.target.value})}>
             {cateogry.map( c => {return <option key={c.id} value={c.id}>{c.name}</option> })}
          </select>
        </div>
        <div className='col-12'>
          <label htmlFor='image'>Image</label>
          <input type='file' id='image' name='image' autoComplete='off' onChange={(e) => setValues({...values,image:e.target.files[0]})} placeholder='Upload the Image' className='form-control rounded-0 mb-3'></input>
        </div>
        <button className='btn btn-success w-100 rounded-0 mb-2' type='submit'>Edit Employee </button>
      </form>
    </div>
    </div>
  </div>
  )
}

export default Editemployee
