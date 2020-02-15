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

router.get('/saved', (req,res) => {
    console.log('— Saved Page —')

    res.render(
        'saved.hbs',
        {
            title: 'Saved Page',
            style: 'saved.css',
            script: 'saved.js',
        }
    )
})



module.exports = router;