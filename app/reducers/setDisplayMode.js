
export const setDisplayMode = (state={nightMode: false}, action) =>{
    switch(action.type){
        case "NIGHT_MODE": {
            return Object.assign({}, state, {
                nightMode: true
            });
        }
        case "DAYTIME_MODE": {
            return Object.assign({}, state, {
                nightMode: false
            });
        }
        default: {
            return state;
        }
    }
}