const mongoose = require('mongoose');
const { Schema } = mongoose;



const ArticleSchema = new Schema({
    article_id: {
        type: String,
        required: true
    },

    /*  */
    
    headline: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    url_link: {
        type: String,
        required: true
    },

    meta_date: {
        type: String
    },

    /*  */

    comments: [{
        // text: String,
        // user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        // }
    }]
});




// console.log(ArticleSchema)
const Article = mongoose.model('Article', ArticleSchema);
console.log(Article)
module.exports = Article;