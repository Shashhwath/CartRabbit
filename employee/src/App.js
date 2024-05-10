import Login from "./Login";
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from "./Componenet/Dashboard";
import Home from "./Componenet/Home";
import Employee from "./Componenet/Employee";
import Cateogry from "./Componenet/Cateogry";
import Addcateogry from "./Componenet/Addcateogry";
import Addemployee from "./Componenet/Addemployee";
import Editemployee from "./Componenet/Editemployee";
import Employeelogin from "./Employeelogin";
import EmployeeDetail from "./Componenet/EmployeeDetail";
import Begin from "./Begin";
import PrivateRoute from "./PrivateRoute";
import EmployeeEditDetails from "./Componenet/EmployeeEditDetails";
import Profile from "./Componenet/Profile";
import './index.css'

function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Begin/>}></Route>
      <Route path="/employeelogin" element={<Employeelogin/>}></Route>
      <Route path="/employee_details/:id" element={<PrivateRoute><EmployeeDetail/></PrivateRoute>}></Route>
     <Route path='/adminlogin' element={<Login/>}></Route>
     <Route path='/editempdetails/:id' element={<EmployeeEditDetails/>}></Route>
     
      <Route path='/dashboard' element={
      <PrivateRoute>
      <Dashboard/>
      </PrivateRoute>
      }>
        <Route path="" element={<Home/>}></Route>
        <Route path="/dashboard/employee" element={<Employee/>}></Route>
        <Route path="/dashboard/cateogry" element={<Cateogry/>}></Route>
        <Route path="/dashboard/profile" element={<Profile/>}></Route>
        <Route path="/dashboard/cateogry/addcateogry" element={<Addcateogry/>}></Route>
        <Route path="/dashboard/employee/addemployee" element={<Addemployee/>}></Route>
        <Route path="/dashboard/edit_emp/:id" element={<Editemployee/>}></Route>
      </Route>
      <Route path='/login' element={<Begin/>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
