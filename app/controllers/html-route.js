const router = require('express').Router();


router.get('/', (req,res) => {
    console.log('— Home Page —')

    res.render(
        'home.hbs',
        {
            title: 'Home Page',
            style: 'home.css',
            script: 'home.js',
        }
    )
})



module.exports = router;