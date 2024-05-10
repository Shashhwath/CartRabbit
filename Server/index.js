import express from "express";
import cors from 'cors'
import { adminRouter } from "./Router/Admin.js";
import { EmployeeRouter } from "./Router/Employee.js";
import Jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
const a=express()
a.use(cors(
    {
        origin : ["http://localhost:3000"],
        methods : ['GET','POST','PUT','DELETE'],
        credentials : true
    }
))
a.use(express.json())
a.use('/auth',adminRouter)
a.use('/emp',EmployeeRouter)
a.use(express.static(`Public`))
a.use(cookieParser())

    
     const check = (req,res,next) =>  
    {
       const token = req.cookies.token
        if(token)
        {
           Jwt.verify(token,"jwt_secret_key",(err,decoded) =>
        {
            if(err) return res.json({Status:false,Error:"Wrong Token"})
            req.id=decoded.id
            req.role=decoded.role
            next()
        })
        }
        else
        {
            return res.json({Status:false,Error:"Not Authenticated"})
        }
    }


a.use('/check',check,(req,res) =>
{
   return res.json({Status:true,role:req.role,id:req.id})
})



a.listen((3005), () => {
    console.log("Server is running 3005")
})