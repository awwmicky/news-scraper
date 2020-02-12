module.exports = {
    MONGO_URI: (
        process.env.MONGODB_URI || 
        'mongodb://localhost/news_db'
    ),
    
    options: { 
        useNewUrlParser    : true, 
        useUnifiedTopology : true,
        useFindAndModify   : false
    }
};