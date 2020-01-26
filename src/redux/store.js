import { createStore } from "redux";

const initialState = {
  loggedIn: false,
  user: {},
  items: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ITEMS": {
      return {
        ...state,
        items: action.payload
          .map(item => ({
            id: item.id,
            name: item.name,
            number: item.number,
            productionDate: item.production_date,
            shelfLife: item.shelf_life,
            expirationDate: item.expiration_date,
            owner: item.owner
          }))
          .sort((a, b) => Date(a.shelfLife) - Date(b.shelfLife))
      };
    }
    case "LOGIN": {
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
