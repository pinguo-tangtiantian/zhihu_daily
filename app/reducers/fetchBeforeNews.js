
const initState = {
    fetching: false,
    success: false,
    error: false
}

export const fetchBeforeNews = (state=initState, action)=>{
    switch(action.type){
        case "BEFORE_FETCHING": {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false
            })
        }

        case "BEFORE_SUCCESS": {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,
                data: action.data
            })
        }

        case "BEFORE_ERROR": {
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
