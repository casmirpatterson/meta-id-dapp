import { foundReducer } from 'found'
import { combineReducers } from 'redux-immutablejs'

// import * as Sample from 'domains/sample'

export default combineReducers({
  found: foundReducer,
  // [Sample.name]: Sample.reducer,
})
