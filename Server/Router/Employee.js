import express from 'express'
import con from '../utils/Db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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

router.put('/setemp/:id',(req,res) =>
    {
      const id = req.params.id;
    
      const sql =`UPDATE emp set name = ? , email = ? , address = ? , phone = ? ,department = ?,cateogry = ? Where id = ? `;
      const values = [
        req.body.name,
        req.body.email,
        req.body.address, 
        req.body.phone,
        req.body.department,
        req.body.cateogry
    ]
      con.query(sql,[...values, id],(err,result) =>
      {
        if (err) return res.json({ Status: false, Error: err })
          return res.json({ Status: true , Result:result})
      })
    })

export {router as EmployeeRouter}