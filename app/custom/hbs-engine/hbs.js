const exphbs  = require('express-handlebars');
const path = require('path');



module.exports = exphbs.create({
    defaultLayout: 'default.hbs',
    layoutsDir: path.join(
        __dirname, '/../../views/tmpl-default/'
    ),
    // partialsDir: path.join(
    //     __dirname, '/../../views/tmpl-parts/'
    // ),
    extname: '.hbs'
});