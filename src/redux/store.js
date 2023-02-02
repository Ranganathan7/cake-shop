import { legacy_createStore as createStore} from "redux";

import reducer from "./reducer";

const store = createStore(reducer, {isLoggedIn: localStorage.token?true:false, cakes: []})

export default store