const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");


// middleware
app.use(express.json());
app.use(cors());

// schema designee
const touristSpotSchema = mongoose.Schema({
    name:{
        type: String,
        require:[true,"valid the place name."],
        trim: true,
        unique:[true,"name must be unique"],
        minLength:[4, "name must be at least 4 characters. "],
        maxLength:[100, "name is too large"],
    },
    description:{
        type: String,
        required: true
    }, 
    package:{
        type: Number,
        required: true,
        min:[0,"price can't be negative"]
    },
    destination:{
        type:String,
        required:true
    },
    image:{
        type: String,
        required:true
    },
    unit:{
        type: String,
        required:true,
        enum:{
            values:["km","m"],
            message: "unit value can't br {value}, must be km"
        }
    },
    distance:{
        type: Number,
        required: true,
        min:[0,"distance can't be negative "],

    }, 
    season:{
        type:String,
        required: true,
        enum:{
            values: ['winter', 'fall', 'summer'],
            message: "unit value can't br {value}, must be winter/fall/summer"
        }
    }



},{
    timestamps:true
}
);

// =======SCHEMA => MODEL => QUERY==========

const TouristSpot = mongoose.model("TouristSpot", touristSpotSchema)


app.get("/",(req,res)=>{
    res.send("routing is working! yay!");
 });

//  ==== posting data =====

app.post('/api/v1/tourist-spot',async(req,res,next)=>{
  try{

    const result =  await TouristSpot.create(req.body)
    res.status(200).json({
     status:"success",
     message: "data inserted successfully" ,
     data: result 
     })

  }catch(error){
    res.status(400).json({
        status:"fail",
        message: "data inserted error .",
        error: error.message
    })
  }
})


//  ==== get data =====
app.get('/api/v1/tourist-spot',async(req,res,next)=>{
    try{
        const tour_place = await TouristSpot.find({},'name distance');

        res.status(200).json({
            status:"success",
            data: tour_place
            })
    }catch(error){
        res.status(400).json({
            status:"fail",
            message: "can not load data.",
            error: error.message
        })

    }
})

 module.exports = app ;