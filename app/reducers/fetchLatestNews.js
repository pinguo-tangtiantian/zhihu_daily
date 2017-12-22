
const initState = {
    fetching: true,
    success: false,
    error: false
}

export const fetchLatestNews = (state=initState, action)=>{
    switch(action.type){
        case "LATEST_FETCHING": {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false
            })
        }

        case "LATEST_SUCCESS": {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,
                data: action.data
            })
        }

        case "LATEST_ERROR": {
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
