import { createStore } from "redux";

const initialState = {
  loggedIn: false,
  user: {},
  items: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ITEMS": {
      console.log(action);
      return {
        ...state,
        items: action.payload
      };
    }
    case "LOGIN": {
      console.log(action);
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

const store = createStore(reducer);
export default store;
