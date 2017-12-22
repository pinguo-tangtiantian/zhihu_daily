
const initState1 = {
    fetching: false,
    success: false,
    error: false
};
const initState2 = {
    fetching: false,
    success: false,
    error: false
};

export const fetchLongComments = (state=initState1, action)=>{
    switch(action.type){
        case "LONG_COMMENTS_FETCHING": {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false
            })
        }

        case "LONG_COMMENTS_SUCCESS": {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,
                data: action.data
            })
        }

        case "LONG_COMMENTS_ERROR": {
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

export const fetchShortgComments = (state=initState2, action)=>{
    switch(action.type){
        case "SHORT_COMMENTS_FETCHING": {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false
            })
        }

        case "SHORT_COMMENTS_SUCCESS": {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,
                data: action.data
            })
        }

        case "SHORT_COMMENTS_ERROR": {
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
