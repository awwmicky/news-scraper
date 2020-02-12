const express = require('express');
const app = express();



const logger = require('morgan');
app.use( logger('dev') )
app.use( express.urlencoded({ extended : true }) )
app.use( express.json() )
app.use( express.static('./app/public/') )



const hbs = require('./app/custom/hbs-engine/hbs.js');
const path = require('path');
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/app/views/'))



const apiRoutes = require('./app/controllers/api-route.js');
const htmlRoutes = require('./app/controllers/html-route.js');
app.use('/api', apiRoutes)
app.use('/', htmlRoutes)



const { 
    MONGO_URI, options 
} = require('./app/config/keys.js');
const mongoose = require('mongoose');
const connection = mongoose.connection;
const PORT = process.env.PORT || 5000;

connection
.once('open', _ => console.log('MongoDB Connected — √', '\n'+ MONGO_URI) )
.on('error', err => console.log('Connection Error — ×', '\n'+ err) )

mongoose.connect(MONGO_URI, options, err => {
    if (err) throw err;

    app.listen(PORT, _ => {
        console.log(
            'Test Server -', 
            `http://localhost:${PORT}`
        )
    })
})