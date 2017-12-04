import { Actions as farce } from 'farce'

import { routes } from 'core/routes'
import { isDomainAction } from 'core/util'
import { actionTypes as session, name } from 'domains/session'

const SessionMiddleware = ({ dispatch }) => next => action => {
  // action not in namespace? abort!
  if (!isDomainAction(name, action.type)) return next(action)

  if (session.LOGIN === action.type) {
    dispatch(
      farce.push(`${routes.search.path}/${action.payload.account.address}`)
    )
  }

  return next(action)
}

export default SessionMiddleware
