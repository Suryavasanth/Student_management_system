const userSerivce = require("../Services/UserService");



exports.addUsers=async (req,res)=>{
    try{
        const{name,email,password,role}=req.body;

        const result=await userSerivce.createSignupUser(name,email,password,role);
        res.status(201).send({message:"user created succesfully"})
    }
    catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
}

exports.loginUser=async(req,res)=>{
    try {
        const { email, password } = req.body;   
        const user = await userSerivce.LoginUser(email, password);
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }       
}

exports.getStudents=async(req,res)=>{
    try{
        const students=await userSerivce.getStudents();
        res.status(200).json({students})            
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({message:error.message})
    }
}

exports.addStudent=async(req,res)=>{
    try{
        const{name,email,mobile_no,address,dob}=req.body;
        const result=await userSerivce.addStudent(name,email,mobile_no,address,dob);
        res.status(201).json({message:"student added successfully"})
    }   
    catch(error){
        console.log(error.message);
        res.status(400).json({message:error.message})
    }       
}

exports.deleteStudent=async(req,res)=>{
    try{
        const {id}=req.params;
        const result=await userSerivce.deleteStudent(id);
        res.status(200).json({message:"student deleted successfully"})
    }   
    catch(error){
        console.log(error.message);
        res.status(400).json({message:error.message})
    }
}

exports.updateStudent=async(req,res)=>{
    try{
        const {id}=req.params;
        const{name,email,mobile_no,address,dob}=req.body;
        const result=await userSerivce.updateStudent(id,name,email,mobile_no,address,dob);
        res.status(200).json({message:"student updated successfully"})
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({message:error.message})
    }   
}
