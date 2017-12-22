


const latestFetching = () => {
    return {
        type: "LATEST_FETCHING"
    }
}

const latestSuccess = (json) => {
    return {
        type: "LATEST_SUCCESS",
        data: json
    }
}

const latestError = (json) => {
    return {
        type: "LATEST_ERROR",
        data: json
    }
}

/**
 * 获取最新新闻
 */
export const fetchLatestNews = () => {  
    return (dispatch, getState)=>{
        dispatch(latestFetching());
        
        fetch("https://news-at.zhihu.com/api/4/news/latest",{
            method: "GET",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(resJson=>{
            dispatch(latestSuccess(resJson));
        })
        .catch(resJson=>{
            dispatch(latestError(resJson))
        })
    }
}