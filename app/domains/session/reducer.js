import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import * as actions from './actionTypes'
import * as model from './model'

const createAccount = account => model.accountFactory(account)

export const initialState = Immutable.fromJS({
  account: null,
})

export default createReducer(initialState, {
  [actions.LOGIN]: (state, action) =>
    state.merge({
      account: createAccount(action.payload.account),
    }),

  [actions.LOGOUT]: state => state.merge({ account: null }),
})
