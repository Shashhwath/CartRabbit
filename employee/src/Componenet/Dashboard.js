import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';
import '../index.css';

const Dashboard = () => {
    axios.defaults.withCredentials = true
    const navigate = useNavigate()
    const Logout = () => {

        axios.get('http://localhost:3005/auth/logout').then(result => {
            if (result.data.Status) {
                localStorage.removeItem("valid")
                navigate('/')
            }
            else {
                alert(result.data.Error)
            }
        }
        ).catch(err => console.log(err))
    }
    return (
        <div classname="vh-100 mt-5 bg-light ">
            <div className='position-fixed w-100 col p-0 m-0 bg-light dashboard'>
                <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                    <h2 className="navbar-brand" >CartRabbit</h2>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav p-2">
                        <Link to="/dashboard" className=" nav-link text-white px-0 align-middle me-3">
                            <i className="bi-speedometer2"></i> Dashboard
                        </Link>
                        <Link to="/dashboard/employee" className="nav-link px-0 align-middle text-white me-3">
                            <i className="bi-people "></i> Manage Employees
                        </Link>
                        <Link to="/dashboard/cateogry" className="nav-link px-0 align-middle text-white me-3">
                            <i className="bi-columns "></i> Department
                        </Link>
                        <Link to="/dashboard/profile" className="nav-link px-0 align-middle text-white me-3">
                            <i className="bi-person "></i> Profile
                        </Link>
                        <Link onClick={Logout} className="nav-link px-0 align-middle text-white me-3">
                            <i className="bi-power "></i> Logout
                        </Link>
                        </div>
                    </div>
                </nav>
            </div>
            <div className=" bg-light dashboard  " >
                <div className="p-2  d-flex justify-content-center shadow ">
                    <h4 className='mt-6'>Employee Management System</h4>
                </div>
                <Outlet />
            </div>
        </div>




    )
}

export default Dashboard
