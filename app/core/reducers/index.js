import { foundReducer } from 'found'
import { combineReducers } from 'redux-immutablejs'

import * as Identity from 'domains/identity'
import * as Session from 'domains/session'

export default combineReducers({
  found: foundReducer,
  [Identity.name]: Identity.reducer,
  [Session.name]: Session.reducer,
})
