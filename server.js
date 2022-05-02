const express = require('express');
const app = express()
const mongoose = require('mongoose');
const fpModel = require('./Modules/foodPaketiHighscores')
const cors = require('cors');
const { json } = require('body-parser');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, ()=>{
    console.log('Mongoose connected successfuly!')
})


//middlewares
app.use(express.json({
    type: ['application/json', 'text/plain']
}));
app.use(cors());


//routes
app.get('/fdHighscores', async (req, res)=>{
    try{
        const result = await fpModel.find({});
        res.json(result)
    }catch(error){
        res.json(error)
    }
})

app.post('/postFoodPaketiScore', async (req, res)=>{
    try{
        const body= req.body;
        const newHighscore = new fpModel(body);
        await newHighscore.save()
        res.json(newHighscore)
        console.log(newHighscore)
    }catch(error){
        res.json(error)
    }
})


//Port and Listen
const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`)
})