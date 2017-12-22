


const beforeFetching = () => {
    return {
        type: "BEFORE_FETCHING"
    }
}

const beforeSuccess = (json) => {
    return {
        type: "BEFORE_SUCCESS",
        data: json
    }
}

const beforeError = (json) => {
    return {
        type: "BEFORE_ERROR",
        data: json
    }
}

/**
 * 获取以往新闻
 * @param {string} time 时间格式：20170613
 */
export const fetchBeforeNews = (time) => {
    return (dispatch, getState)=>{
        dispatch(beforeFetching());
        fetch("https://news-at.zhihu.com/api/7/news/before/"+time,{
            method: "GET",
            credentials: 'include'
        })
        .then(res=>res.json())
        .then(resJson=>{
            dispatch(beforeSuccess(resJson));
        })
        .catch(resJson=>{
            dispatch(beforeError(resJson))
        })
    }
}