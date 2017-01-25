import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import { accountReducer, bookmarkReducer, profileReducer } from '../reducers'

var store;

export default {

  configureStore: () => {
    // combine all reducers
    const reducers = combineReducers({

      account: accountReducer,
      bookmark: bookmarkReducer,
      profile: profileReducer,

    })

    store = createStore(
      reducers,
      applyMiddleware(thunk)
    )

    return store
  },

  currentStore: () => {
    return store
  }

}
