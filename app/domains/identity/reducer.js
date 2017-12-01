import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'
import { handle } from 'redux-pack'

import * as actions from './actionTypes'
import * as model from './model'

const createIdentity = identity => model.identityFactory(identity)

export const initialState = Immutable.fromJS({})

export default createReducer(initialState, {
  [actions.CREATE_IDENTITY]: (state, action) =>
    handle(state, action, {
      success: prevState =>
        prevState.merge({
          [action.payload.identity[0].id]: createIdentity(action.payload.identity[0]),
        }),
    }),

  [actions.READ_IDENTITY]: (state, action) =>
    handle(state, action, {
      success: prevState =>
        prevState.merge({
          [action.payload.identity[0].id]: createIdentity(action.payload.identity[0]),
        }),
    }),
})
