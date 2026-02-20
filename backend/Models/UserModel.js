const db = require("../Config/db");

exports.getSignupUsers = async (email) => {
     const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows;
}
     
exports.createUsers=async(name,email,password,role)=>{
    const [result]=await db.query("insert into users (name,email,password,role) values (?,?,?,?)",[name,email,password,role]);
    return result;

}

exports.getStudents=async()=>{
    const [rows]=await db.query(` SELECT 
            id,
            name,
            email,
            mobile_no,
            address,
            DATE_FORMAT(dob, '%Y-%m-%d') AS dob
        FROM student_details`);
    return rows;
}

exports.addStudent=async(name,email,mobile_no,address,dob)=>{
    const [result]=await db.query("insert into student_details (name,email,mobile_no,address,dob) values (?,?,?,?,?)",[name,email,mobile_no,address,dob]);
    return result;
}

exports.deleteStudent=async(id)=>{  
    const [result]=await db.query("delete from student_details where id=?",[id]);
    return result;
}

exports.updateStudent=async(id,name,email,mobile_no,address,dob)=>{
    const [result]=await db.query("update student_details set name=?,email=?,mobile_no=?,address=?,dob=? where id=?",[name,email,mobile_no,address,dob,id]);
    return result;
}

