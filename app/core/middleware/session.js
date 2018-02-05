import { Actions as farce } from 'farce'

import { STATE_KEY } from 'core/constants'
import { routes } from 'core/routes'
import { isDomainAction } from 'core/util'
import { actions as IdentityActions } from 'domains/identity'
import {
  actions as SessionActions,
  actionTypes as session,
  name,
} from 'domains/session'

const SessionMiddleware = ({ dispatch }) => next => action => {
  // action not in namespace? abort!
  if (!isDomainAction(name, action.type)) return next(action)

  if (session.LOGIN === action.type) {
    // fetch user's META Identity
    dispatch(
      IdentityActions.readIdentityByOwner(action.payload.account.address)
    )

    // redirect to Home page
    dispatch(farce.push(routes.home.path))

    // store `session.account` state
    dispatch(
      SessionActions.setStoredSession(STATE_KEY, {
        session: { account: action.payload.account },
      })
    )
  }

  if (session.LOGOUT === action.type) {
    // delete stored `session.account` state
    dispatch(SessionActions.removeStoredSession(STATE_KEY))
  }

  return next(action)
}

export default SessionMiddleware
