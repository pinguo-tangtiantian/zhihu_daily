


const extraFetching = () => {
    return {
        type: "EXTRA_NEWS_INFO_FETCHING"
    }
}

const extraSuccess = (json) => {
    return {
        type: "EXTRA_NEWS_INFO_SUCCESS",
        data: json
    }
}

const extraError = (json) => {
    return {
        type: "EXTRA_NEWS_INFO_ERROR",
        data: json
    }
}

/**
 * 获取新闻附加信息
 * @param {string} id 新闻id
 */
export const fetchExtraNewsInfo = (id) => {
    return (dispatch, getState)=>{
        dispatch(extraFetching());
        fetch("https://news-at.zhihu.com/api/7/story-extra/"+id,{
            method: "GET",
            credentials: 'include'
        })
        .then(res=>res.json())
        .then(resJson=>{
            dispatch(extraSuccess(resJson));
        })
        .catch(resJson=>{
            dispatch(extraError(resJson))
        })
    }
}