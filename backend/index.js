const express=require("express")
const dotenv=require("dotenv")


dotenv.config();

require("./Config/db"); 

const app=express();
app.use(express.json());

const UserRoutes = require("./Routes/UserRouter");

app.use("/", UserRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`backend run successful ${process.env.PORT}`)
})

