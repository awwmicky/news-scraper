$(() => {
/*  */
console.log('Saved Page')
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
            class="comment-btn"
            data-id="${article._id}"
        >View Comments
        </button>
        <button 
            class="delete-btn" 
            data-article="${article.article_id}"
        >Delete Article
        </button>
    </div>
</article>
`
        )
    })
};

renderComments = (message) => {
    console.log(message)

    let allMessages = [];

    message.forEach( info => {
        allMessages.push(
`
<div>
    <p>${info.username}: ( ${info.date.split('T')[0]} )</p>
    <blockquote>${info.comment}</blockquote>
    <hr>
</div>
`
        )
    });

    // console.log(allMessages)
    return allMessages.join('')
};

renderArticleComment = (data) => {
    $newsArticles.empty();

    $newsArticles.append(
`
<article class="article-info" data-article="${data.article_id}">
    <div class="main-content">
        <h4 class="headline">${data.headline}</h4>
        <br>
        <p class="summary">${data.summary}</p>
    </div>
    <br>
    <div class="sub-content">
        <span class="meta-date">${data.meta_date}</span>
        <button class="url-link">
            <a
                href="${data.url_link}"
                target="_blank"
            >View Article
            </a>
        </button>
    </div>
</article>
<div class="user-comments">
    <form class="comments-form" data-id="${data._id}">
        <fieldset>
            <legend>Comments</legend>
            <input 
                type="text" 
                name="username"
                class="username-input"
                placeholder="Enter Name"
                autocomplete="off"
                autofocus
            />
            <br>
            <textarea 
                name="comment"
                class="comment-input"
                placeholder="Enter Comment"
                cols="22"
                rows="10"
                style="resize: none"
            ></textarea>
            <br>
            <input type="submit" class="comment-post" value="POST">
        </fieldset>
    </form>
    <section class="all-comments">${
        renderComments(data.comments)
    }</section>
</div>
`
    )
};

removeContainer = (data) => {
    let container = $(`article[data-article='${data}']`);

    container.remove()
};



$(document).on('submit', '.comments-form', function (e) {
    e.preventDefault()

    let a_id = $(this).attr('data-id');
    let username = $('.username-input').val();
    let comment = $('.comment-input').val();
    $('.username-input').val('')
    $('.comment-input').val('')

    console.log(a_id, '-',username, ':', comment)

    $.ajax({
        type: 'POST',
        url: `api/user/comment`,
        data: {
            a_id,
            username,
            comment
        }
    })
    .then( result => {
        console.log(result)
        renderArticleComment(result)
    })
    .catch( err => {
        console.log(err)
    })
})

$(document).on('click', '.comment-btn', function (e) {
    let id = $(this).attr('data-id');
    console.log(id)

    $.ajax({
        type: 'GET',
        url: `api/article/comments/${id}`
    })
    .then( result => {
        console.log(result)
        renderArticleComment(result)
    })
    .catch( err => {
        console.log(err)
    })
})

$(document).on('click', '.delete-btn', function (e) {
    let article_id = $(this).attr('data-article');

    $.ajax({
        type: 'DELETE',
        url: `api/article/delete/${article_id}`
    })
    .then( result => {
        console.log(result)
        removeContainer(article_id)
    })
    .catch( err => {
        console.log(err)
    })
})

viewAllSaved = () => {
    $.ajax({
        type: 'GET',
        url: 'api/article/saved-all'
    })
    .then( result => {
        console.log(result)
        renderData(result)
    })
    .catch( err => {
        console.log(err)
    })
};
viewAllSaved()
/*  */
})