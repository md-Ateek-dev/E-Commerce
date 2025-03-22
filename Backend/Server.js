const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./Config/db');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/UserRoutes')
const leadRoutes = require('./Routes/LeadRoutes')
const path= require("path");
const studentsRoutes = require('./Routes/StudentsRoutes');
const sliderRoutes = require ('./Routes/SliderRoutes');

// load enviroment variable;
dotenv.config();

// connect to the database h

connectDB();
const app=express();
app.use(cors());

app.use(express.json());

//Server static file define from 'uploads' folder;
app.use ('/uploads',express.static('uploads'));

//Define routes for users
app.use('/user',userRoutes);
app.use('/lead', leadRoutes);
app.use('/student', studentsRoutes);
app.use('/slider', sliderRoutes);

// define the port 

app.get('/',(req,res)=>{
    res.send('Server is running')
})


const PORT=process.env.PORT || 3000;
// start the server

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});