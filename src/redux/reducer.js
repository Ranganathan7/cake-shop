function reducer(state, action){
    switch(action.type){
        case "LOGIN":
            return {...state, isLoggedIn: true}
        case "LOGOUT":
            return{...state, isLoggedIn: false}
        case "UPDATE_CAKES":
            return {...state, cakes: action.cakes}
        case "UPDATE_ORDER":
            return {...state, order: action.data}
        case "CAKES":
            return {...state, allcakes:action.cakes}
        default: return state
    }
}

export default reducer