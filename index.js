const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , billboard = require('billboard-top-100').getChart

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/api/birthday/:year/:month/:day', (req, res)=>{
    let {year, month, day} = req.params;
    console.log(year, month, day)
    if (day < 10 && day.length < 2){
        day = '0' + day
    }
    if (day < 1){
        day = '01'
    }
    if (day > 31){
        day = 31
    }
    if (month > 12){
        month = 12;
    }
    if (month < 1){
        month = '01';
    }
    if (month < 10 && month.length < 2){
        month = '0' + month
    }
    if (year.length < 4 || year < 1931){
        year = 2017
    }

    billboard('hot-100', `${year}-${month}-${day}`, function(songs, err){
        if (err) console.log('error',err);
        console.log(songs.length);
        res.status(200).send(songs.slice(0, 40));
        
    });
})

app.listen(5000, _=>console.log(`Listening on port: ${5000}`))