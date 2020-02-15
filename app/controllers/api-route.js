const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');
const { Article, User } = require('../models/');



router.get('/article/saved-all', (req,res) => {
    Article
    .find()
    .then( result => {
        console.log(result)
        res.send(result)
    })
    .catch( err => {
        console.log(err)
    })
})

router.get('/article/comments/:id', (req,res) => {
    let { id } = req.params;
    
    Article
    .findById(id)
    .populate('comments')
    .exec()
    .then( result => {
        console.log(result)
        res.send(result)
    })
    .catch( err => {
        console.log(err)
    })
})

router.post('/user/comment', (req,res) => {
    const { username, comment } = req.body;

    User
    .create({
        username,
        comment
    })
    .then( result => {
        console.log(result)
        addComment(req.body, result)
    })
    .catch( err => {
        console.log(err)
    })

    addComment = (data, user) => {
        const { a_id } = data;
    
        Article
        .findByIdAndUpdate(
            {'_id' : a_id },
            { 
                $push: {
                    'comments' : user._id 
                }
            },
            { 
                new    : true,
                upsert : true 
            }
        )
        .populate('comments')
        .exec()
        .then( result => {
            console.log(result)
            res.send(result)
        })
        .catch( err => {
            console.log(err)
        })
    };
})

router.get('/article/random', (req,res) => {
    const url = 'https://www.developer-tech.com';
    const randPg = Math.floor(Math.random() * 90);
    const query = `/news/?page=${randPg}`;

    axios
    .get(url+query)
    .then( html => {
        // console.log(html.data)
        let $ = cheerio.load(html.data);
        const articleData = [];
        
        $('article').each( function () {
            const article_id = $(this)
                .find('div.social').attr('id');

            const headline = $(this)
                .find('a h2').text();

            const summary = $(this)
                .find('div.summary').text()
                .split('\n')[1].split('. ')[0];
            
            const link = $(this)
                .find('a').attr('href');
            let url_link = url + link;

            const meta_date = $(this)
                .find('div.meta_list > h4').text()
                .split('\n')[2].replace(',','');

            // console.log(
                // article_id, '\n'
                // headline, '\n'
                // summary, '\n'
                // url_link, '\n'
                // meta_date, '\n'
            // )

            articleData.push({
                article_id,
                headline,
                summary,
                url_link,
                meta_date
            })
        })

        console.log(articleData)
        res.send(articleData)
    })
    .catch( err => {
        console.log(err)
    })    
})

router.get('/article/view-all', (req,res) => {
    const url = 'https://www.developer-tech.com';

    axios
    .get(url+'/news/')
    .then( html => {
        // console.log(html.data)
        let $ = cheerio.load(html.data);
        const articleData = [];
        
        $('article').each( function () {
            const article_id = $(this)
                .find('div.social').attr('id');

            const headline = $(this)
                .find('a h2').text();

            const summary = $(this)
                .find('div.summary').text()
                .split('\n')[1].split('. ')[0];
            
            const link = $(this)
                .find('a').attr('href');
            let url_link = url + link;

            const meta_date = $(this)
                .find('div.meta_list > h4').text()
                .split('\n')[2].replace(',','');

            // console.log(
                // article_id, '\n'
                // headline, '\n'
                // summary, '\n'
                // url_link, '\n'
                // meta_date, '\n'
            // )

            articleData.push({
                article_id,
                headline,
                summary,
                url_link,
                meta_date
            })
        })

        console.log(articleData)
        res.send(articleData)
    })
    .catch( err => {
        console.log(err)
    })
})

router.post('/article/save', (req,res) => {
    const data = { ...req.body };

    Article
    .findOne({
        article_id: data.article_id
    })
    .then( result => {
        console.log(result)

        if (result === null) {
            console.log('create →')
            saveArticle(data)
        } else {
            console.log('skip...')
            res.send('already saved')
        }
    })
    .catch( err => {
        console.log(err)
    })

    saveArticle = (data) => {
        Article
        .create(data)
        .then( result => {
            console.log(result)
            res.send(result)
        })
        .catch( err => {
            console.log(err)
        })
    };
})

router.delete('/article/delete/:a_id', (req,res) => {
    const { a_id } = req.params;
    console.log(a_id)

    Article
    .deleteOne({
        article_id: a_id
    })
    .then( result => {
        console.log(result)
        res.send(result)
    })
    .catch( err => {
        console.log(err)
    })
})



module.exports = router;