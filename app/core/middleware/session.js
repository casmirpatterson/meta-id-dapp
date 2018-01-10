import { Actions as farce } from 'farce'

import { routes } from 'core/routes'
import { isDomainAction } from 'core/util'
import { actions as identity } from 'domains/identity'
import { actionTypes as session, name } from 'domains/session'

const SessionMiddleware = ({ dispatch }) => next => action => {
  // action not in namespace? abort!
  if (!isDomainAction(name, action.type)) return next(action)

  if (session.LOGIN === action.type) {
    // fetch user's META Identity
    dispatch(identity.readIdentityByOwner(action.payload.account.address))

    // redirect to Home page
    dispatch(farce.push(routes.home.path))
  }

  return next(action)
}

export default SessionMiddleware
