import express from 'express'
import con from '../utils/Db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from "path";
const router = express.Router()


//to verify in admin login page 

router.post('/admin', (req, res) => {


  const sql = "SELECT * FROM employeedata where email = ? and password = ?";

  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Querry Error" })
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email , id:result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      )
      res.cookie('token', token)
      return res.json({ loginStatus: true })
    }
    else {
      return res.json({ loginStatus: false, Error: "wrong email or password" })
    }
  })

})

// to retrive category details from category db

router.get('/getcat', (req, res) => {
  const sql = "SELECT * from cateogry";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Querry Error" })
    return res.json({ Status: true , Result:result})
  }

  )
})

//to get employee details from emp db

router.get('/getemp', (req, res) => {
  const sql = "SELECT * from emp";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Querry Error" })
    return res.json({ Status: true , Result:result})
  }

  )
})

// to get particular employee details from emp db

router.get('/getemp/:id',(req,res)=>
{
  const id = req.params.id
  const sql= "SELECT * FROM emp WHERE id = (?)";
  con.query(sql,[id],(err,result)=>
  {
    if (err) return res.json({ Status: false, Error: "Querry Error" })
      return res.json({ Status: true , Result:result})
  })
})
 
router.delete('/deletemp:id',(req,res) =>
{
  const id = req.params.id
  const sql = "DELETE from emp where id = ? ";
  con.query(sql,[id],(err,result) =>
  {
    if(err) return res.json({Status:false,Error:err})
    return res.json({Status:true,Result:result})
  } )
})
router.put('/setemp/:id',(req,res) =>
{
  const id = req.params.id;

  const sql =`UPDATE emp set name = ? , email = ? ,salary = ?, address = ? , phone = ? ,department = ?,cateogry = ? Where id = ? `;
  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
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
router.post('/emp',upload.single('image'), (req, res) => {
  const sql = `INSERT INTO emp(name,email,password,salary,address,phone,department,cateogry,image) VALUES(?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
       if(err) return res.json({Status:false,Error:"Hash Error"})
      const values = [
          req.body.name,
          req.body.email,
          hash,
          req.body.salary,
          req.body.address, 
          req.body.phone,
          req.body.department,
          req.body.cateogry, 
          req.file.filename
      ]
      console.log(values)
      con.query(sql, [values], (err, result) => {
          if (err) return res.json({ Status: false, Error: err });
          return res.json({ Status: true });
      });
  });
});

 


router.post('/cat', (req, res) => {
  const sql = "INSERT INTO cateogry (`name`) VALUES(?)";
  con.query(sql, [req.body.cateogry], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Querry Error" })
    return res.json({ Status: true })
  })
})

router.get('/totemp',(req,res) =>
{
  const sql ="select count(id) as emp from emp";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Querry Error" })
    return res.json({ Status: true , Result:result})
  })
})

router.get('/totadmin',(req,res) =>
{
  const sql= "select count(id) as employeedata from employeedata";
  con.query(sql,(err,result) =>
  {
    if(err) return res.json({Status:false,Error:"Querry Error"})
    return res.json({Status:true,Result:result})
  })
})

router.get('/totsalary',(req,res) =>
  {
    const sql= "select sum(salary) as salary from emp";
    con.query(sql,(err,result) =>
    {
      if(err) return res.json({Status:false,Error:"Querry Error"})
      return res.json({Status:true,Result:result})
    })
  })

 router.get('/getadmins',(req,res) =>
{
  const sql = "select * from employeedata";
  con.query(sql,(err,result) =>
  {
    if(err) return res.json({Status:false,Error:err})
    return res.json({Status:true,Result:result})
  })
})

router.get('/logout',(req,res) =>
  {
    res.clearCookie('token')
    return res.json({Status:true})
  })


export { router as adminRouter } 