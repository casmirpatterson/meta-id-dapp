import { foundReducer } from 'found'
import { combineReducers } from 'redux-immutablejs'

import * as Identity from 'domains/identity'

export default combineReducers({
  found: foundReducer,
  [Identity.name]: Identity.reducer,
})
