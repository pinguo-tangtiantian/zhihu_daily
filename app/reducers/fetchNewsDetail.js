
const initState = {
    fetching: false,
    success: false,
    error: false
}

export const fetchNewsDetail = (state=initState, action)=>{
    switch(action.type){
        case "NEWS_DETAIL_FETCHING": {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false
            })
        }

        case "NEWS_DETAIL_SUCCESS": {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,
                data: action.data
            })
        }

        case "NEWS_DETAIL_ERROR": {
            return Object.assign({}, state, {
                fetching: false,
                success: false,
                error: true,
                date: action.data
            })
        }

        default: {
            return state
        }
        
    }
}
