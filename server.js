const  mongoose = require("mongoose");
const dotenv = require("dotenv").config();


const app = require("./app");

mongoose.connect("mongodb://localhost:27017/tour-managment")
.then(()=>{
    console.log(`database connection is successfull`);

}).catch((err)=> console.log(err));

const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
});