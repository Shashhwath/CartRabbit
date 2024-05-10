import mysql from 'mysql'


const con = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password: "",
        database:"employee1"
    }
)

con.connect( function(err)
{
    if(err)
     console.log("Not Connected")
    else
    console.log("Connected Successfully")
}
)

export default con;