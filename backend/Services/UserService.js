const usermodel=require("../Models/UserModel")

const exsistingUser=async(email)=>{
    const user=await usermodel.getSignupUsers(email);
    if(user.length>0){
        throw new Error("user already exist")
    }
}

const createSignupUser=async (name,email,password,role)=>{
    if(!name||!email||!password||!role){
        throw new Error("all fields required")
    }
    await exsistingUser(email);
    
    const result=await usermodel.createUsers(name,email,password,role);
    return result
}

 const LoginUser=async(email,password)=>{
    if(!email||!password){
        throw new Error("all fields required")
    }
    const user=await usermodel.getSignupUsers(email,password);
    if(user.length===0){
        throw new Error("user not found")
    }
    if(user[0].password!==password){
        throw new Error("invalid password")
    }       
    return user[0]
}   

const getStudents=async()=>{
    const students=await usermodel.getStudents();
    return students
}   

const addStudent=async(name,email,mobile_no,address,dob)=>{
    if(!name||!email||!mobile_no||!address||!dob){
        throw new Error("all fields required")
    }
    const result=await usermodel.addStudent(name,email,mobile_no,address,dob);
    return result
}

const deleteStudent=async(id)=>{
    if(!id){
        throw new Error("id is required")
    }
    const result=await usermodel.deleteStudent(id);
    return result
}

const updateStudent=async(id,name,email,mobile_no,address,dob)=>{
    if(!id||!name||!email||!mobile_no||!address||!dob){
        throw new Error("all fields required")
    }
    const result=await usermodel.updateStudent(id,name,email,mobile_no,address,dob);
    return result
}

 module.exports={createSignupUser,exsistingUser,LoginUser,getStudents,addStudent,deleteStudent,updateStudent}


