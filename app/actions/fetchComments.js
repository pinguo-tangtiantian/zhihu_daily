


const longCommentsFetching = () => {
    return {
        type: "LONG_COMMENTS_FETCHING"
    }
}

const longCommentsSuccess = (json) => {
    return {
        type: "LONG_COMMENTS_SUCCESS",
        data: json
    }
}

const longCommentsError = (json) => {
    return {
        type: "LONG_COMMENTS_ERROR",
        data: json
    }
}

/**
 * 获取某条新闻的长评论
 * @param {string} id 新闻id
 */
export const fetchLongComments = (id) => {
    return (dispatch, getState)=>{
        dispatch(longCommentsFetching());
        fetch("https://news-at.zhihu.com/api/7/story/"+id+"/long-comments",{
            method: "GET",
            credentials: 'include'
        })
        .then(res=>res.json())
        .then(resJson=>{
            dispatch(longCommentsSuccess(resJson));
        })
        .catch(resJson=>{
            dispatch(longCommentsError(resJson))
        })
    }
}





const shortCommentsFetching = () => {
    return {
        type: "SHORT_COMMENTS_FETCHING"
    }
}

const shorCommentsSuccess = (json) => {
    return {
        type: "SHORT_COMMENTS_SUCCESS",
        data: json
    }
}

const shorCommentsError = (json) => {
    return {
        type: "SHORT_COMMENTS_ERROR",
        data: json
    }
}

/**
 * 获取某条新闻的短评论
 * @param {string} id 新闻id
 */
export const fetchShorComments = (id) => {
    return (dispatch, getState)=>{
        dispatch(shortCommentsFetching());
        fetch("https://news-at.zhihu.com/api/story/"+id+"/short-comments",{
            method: "GET",
            credentials: 'include'
        })
        .then(res=>res.json())
        .then(resJson=>{
            dispatch(shorCommentsSuccess(resJson));
        })
        .catch(resJson=>{
            dispatch(shorCommentsError(resJson))
        })
    }
}