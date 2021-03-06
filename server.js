const express = require('express');
const app = express()
const mongoose = require('mongoose');
const fpModel = require('./Modules/foodPaketiHighscores')
const cors = require('cors');
const { json } = require('body-parser');
const path = require('path');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, ()=>{
    console.log('Mongoose connected successfuly!')
})


//middlewares
app.use(express.json({
    type: ['application/json', 'text/plain']
}));
app.use(cors());

const DIST_DIR = path.join(__dirname, '/client');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));
app.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
  });

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
const PORT = process.env.PORT
app.listen(PORT || 3001, ()=>{
    console.log(`App running on port ${PORT}`)
})