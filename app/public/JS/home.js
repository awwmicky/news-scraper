$(() => {
/*  */
console.log('Home Page')
const $randArticleBtn = $('.random-article-btn');
const $newsArticles = $('.news-articles');



renderData = (data) => {
    $newsArticles.empty();

    data.map( article => {
        $newsArticles.append(
`
<article class="article-info" data-article="${article.article_id}">
    <div class="main-content">
        <h4 class="headline">${article.headline}</h4>
        <br>
        <p class="summary">${article.summary}</p>
    </div>
    <br>
    <div class="sub-content">
        <span class="meta-date">${article.meta_date}</span>
        <button class="url-link">
            <a
                href="${article.url_link}"
                target="_blank"
            >View Article
            </a>
        </button>
        <button 
            class="save-btn" 
            data-article="${article.article_id}"
        >Save Article
        </button>
    </div>
</article>
`
        )
    })
};



$randArticleBtn.on('click', e => {
    console.log('loading scrape …')
    $newsArticles.empty()
    $newsArticles.append(
        `<h2>WAIT ONE MOMENT</h2>`
    )

    $.ajax({
        type: 'GET',
        url: 'api/article/random'
    })
    .then( result => {
        console.log(result)
        renderData(result)
    })
    .catch( err => {
        console.log(err)
    })
})

$(document).on('click', '.save-btn', function (e) {
    let article_id = $(this).attr('data-article');
    let container = $(`article[data-article='${article_id}']`);
    console.log(article_id)
    // console.log(container)

    let headline = container.find('h4.headline').text();
    let summary = container.find('p.summary').text();
    let url_link = container.find('button.url-link a').attr('href');
    let meta_date = container.find('span.meta-date').text();
   
    // console.log(/
        // article_id, '\n',
        // headline, '\n',
        // summary, '\n',
        // url_link, '\n',
        // meta_date, '\n'
    // )

    $.ajax({
        type: 'POST',
        url: 'api/article/save',
        data: {
            article_id,
            headline,
            summary,
            url_link,
            meta_date
        }
    })
    .then( result => {
        console.log('✓ ✓')
        console.log(result)
        // renderButton(result)
    })
    .catch( err => {
        console.log(err)
    })
})

displayArticleScrape = () => {
    $.ajax({
        type: 'GET',
        url: 'api/article/view-all'
    })
    .then( result => {
        console.log(result)
        renderData(result)
    })
    .catch( err => {
        console.log(err)
    })
};

displayArticleScrape()
/*  */
})