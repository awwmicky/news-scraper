const mongoose = require('mongoose');
const connection = mongoose.connection;
const { MONGO_URI, options } = require('./app/config/keys.js');
const { Article, User } = require('./app/models/');

connection
.once('open', _ => console.log('MongoDB Connected — √', '\n'+ MONGO_URI) )
.on('error', err => console.log('Connection Error — ×', '\n'+ err) )

mongoose.connect(MONGO_URI, options).then( _ => {
/*  */
// viewAllArticles()
// scrapeArticles()
// deleteArticle()

createUser()
/*  */
}).catch( err => console.log(err) )
closeConnection = () => connection.close();



/* -------------------- */



const axios = require('axios');
const cheerio = require('cheerio');

// (function () {
    // scrapeArticles()
// })()

function scrapeArticles () {
    const url = 'https://www.developer-tech.com/news/';

    axios
    .get(url)
    .then( html => {
        // console.log(html.data)
        let $ = cheerio.load(html.data);
        
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
            let url_link = `'https://www.developer-tech.com${link}`;

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

            let data =
                {
                article_id,
                headline,
                summary,
                url_link,
                meta_date
            }

            // checkById(data)
            viewAllArticles(data)
        })
    })
    .catch( err => {
        console.log(err)
    })
}

checkById = (data) => {
    Article
    .findOne({
        article_id: data.article_id
    })
    .then( result => {
        console.log(result)

        if (result === null) {
            createArticleScrape(data)
        } else {
            console.log('skip...')
            // closeConnection()
        }
    })
    .catch( err => {
        console.log(err)
        closeConnection()
    })
};

createArticleScrape = (data) => {
    Article
    .create(data)
    .then( result => {
        console.log(result)
    })
    .catch( err => {
        console.log(err)
        closeConnection()
    })
};



/* ----------------- */



viewAllArticles = () => {
    Article
    .find()
    .then( result => {
        console.log(result)
        // closeConnection()
    })
    .catch( err => {
        console.log(err)
        closeConnection()
    })
};

deleteArticle = () => {
    Article
    .deleteMany({
        article_id: { $regex : 'news' }
    })
    .then( result => {
        console.log(result)
        closeConnection()
    })
    .catch( err => {
        console.log(err)
        closeConnection()
    })
};



/* ---------------- */



createUser = () => {
    const username = 'Annder';
    const comment = 'eat the taco in holy';

    User
    .create({
        username,
        comment
    })
    .then( result => {
        console.log(result)
        addComment(result)
    })
    .catch( err => {
        console.log(err)
        closeConnection()
    })
};

addComment = (data) => {
    const uid = '5e4392bed363a62ba00b02d9';

    Article
    .findByIdAndUpdate(
        {'_id' : uid },
        { 
            $push: {
                'comments' : data._id 
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
        closeConnection()
    })
    .catch( err => {
        console.log(err)
        closeConnection()
    })
};