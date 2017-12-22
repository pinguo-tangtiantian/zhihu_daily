
const initState = {
    fetching: false,
    success: false,
    error: false
}

export const fetchExtraNewsInfo = (state=initState, action)=>{
    switch(action.type){
        case "EXTRA_NEWS_INFO_FETCHING": {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false
            })
        }

        case "EXTRA_NEWS_INFO_SUCCESS": {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,
                data: action.data
            })
        }

        case "EXTRA_NEWS_INFO_ERROR": {
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
