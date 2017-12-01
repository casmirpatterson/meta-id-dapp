import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'
import { handle } from 'redux-pack'

import * as actions from './actionTypes'
import * as model from './model'

const createClaim = claim => model.claimFactory(claim)

export const initialState = Immutable.fromJS({})

export default createReducer(initialState, {
  [actions.CREATE_CLAIM]: (state, action) =>
    handle(state, action, {
      success: prevState =>
        prevState.merge({
          [action.payload.claim[0].id]: createClaim(action.payload.claim[0]),
        }),
    }),

  // TODO - this needs to map over returned claims array
  [actions.READ_CLAIMS]: (state, action) =>
    handle(state, action, {
      success: prevState =>
        prevState.merge({
          [action.payload.claim[0].id]: createClaim(action.payload.claim[0]),
        }),
    }),
})
