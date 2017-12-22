


const detailFetching = () => {
    return {
        type: "NEWS_DETAIL_FETCHING"
    }
}

const detailSuccess = (json) => {
    return {
        type: "NEWS_DETAIL_SUCCESS",
        data: json
    }
}

const detailError = (json) => {
    return {
        type: "NEWS_DETAIL_ERROR",
        data: json
    }
}

/**
 * 获取最新新闻
 */
export const fetchNewsDetail = (id) => {
    return (dispatch, getState)=>{
        dispatch(detailFetching());
        fetch("https://news-at.zhihu.com/api/7/story/"+id,{
            method: "GET",
            credentials: 'include'
        })
        .then(res=>res.json())
        .then(resJson=>{
            dispatch(detailSuccess(resJson));
        })
        .catch(resJson=>{
            dispatch(detailError(resJson))
        })
    }
}