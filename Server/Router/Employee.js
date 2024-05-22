import express from 'express'
import con from '../utils/Db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from "path";
const router = express.Router()

router.post('/emplogin',(req,res) =>
{

    const sql = "select * from emp where id = ?";
    con.query(sql,[req.body.id],(err,result) =>
    {
        if(err) return res.json({Status:false,Error:"Querry Error"})
            if(result.length>0)
            {
                bcrypt.compare(req.body.password,result[0].password,(err,response) =>
                {
                    if(err) return res.json({loginStatus:false,Error:"password Error"})
                        if(response)
                        {
                            const email = result[0].email
                           const token = jwt.sign(
                            {role:"employee",email:email ,id:result[0].id},
                            "jwt_secret_key",
                            { expiresIn:"1d"}
                           )
                         res.cookie('token',token)
                         return res.json({loginStatus:true,id:result[0].id})
                        }
                })
            }
            else
            {
                return res.json({loginStatus:false,Error:"wrong email or password"})
            }
        })
})

router.get('/empdetails:id',(req,res) => 
{
    const id = req.params.id
    const sql ="select * from emp where id = ?";
    con.query(sql,[id],(err,result) =>
    {
        if(err) return res.json({Status:false,Error:"Querry Error"})
        return res.json({Status:true,Result:result})
    })
})

router.get('/logout',(req,res) =>
{
    res.clearCookie('token')
    res.json({Status:true})
})

const storage = multer.diskStorage( {
    destination: (req,file,cb) => {
      cb(null,'Public/Images')
    },
    filename: (req,file,cb) =>
    {
      cb(null,file.fieldname+ "_" + Date.now() + path.extname(file.originalname))
    }
  }
  )

  const upload = multer(
    {
     storage:storage
    }
 )

router.put('/setemp/:id',upload.single('image'),(req,res) =>
    {
      const id = req.params.id;
      if(req.file === undefined)
      {
        const sql =`UPDATE emp set name = ? , email = ? ,salary = ?, address = ? , phone = ? ,department = ?,cateogry = ? Where id = ? `;
      const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address, 
        req.body.phone,
        req.body.department,
        req.body.cateogry,
    ]
      con.query(sql,[...values, id],(err,result) =>
      {
        if (err) return res.json({ Status: false, Error: err })
          return res.json({ Status: true , Result:result})
      })
      }
      else{
      const sql =`UPDATE emp set name = ? , email = ? ,salary = ?, address = ? , phone = ? ,department = ?,cateogry = ?,image= ? Where id = ? `;
      const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address, 
        req.body.phone,
        req.body.department,
        req.body.cateogry,
        req.file.filename
    ]
      con.query(sql,[...values, id],(err,result) =>
      {
        if (err) return res.json({ Status: false, Error: err })
          return res.json({ Status: true , Result:result})
      })
    }
    })

router.put('/change',(req,res)=>
{
    const sql ="select * from emp where id= ?"
    con.query(sql,[req.body.id],(err,result) =>
    {
        if(err) return res.json({Status:false,Error:"Querry Error"})
        
        if(result.length>0)
        {
            bcrypt.compare(req.body.old,result[0].password,(err,response)=>
            {
                if(err) return res.json({Status:false,Error:"Wrong Password"})

                if(response)
                {
                    bcrypt.hash(req.body.new,10,(err,hash) =>
                    {
                        if(err) return res.json({Status:false,Error:"Hash Error"})

                    const sql = "UPDATE emp set password = ? where id = ?"
                    con.query(sql,[hash,req.body.id],(err,result) =>
                    {
                     if(err) return res.json({Status:false,Error:"Update password query error"})
                     return res.json({Status:true,Result:result})
                    })
                        
                    })
                }
            })
        }
        else
        {
            return res.json({Status:false,Error:"No data available"})
        }
    })
})




export {router as EmployeeRouter}