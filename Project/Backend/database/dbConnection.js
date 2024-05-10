import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"HOSPITALMANAGEMENTSYSTEM"
    }).then(()=>{
        console.log("Connected to DataBase")
    }).catch((err)=>{
        console.log("error Found")
        console.log(err)

    })
}