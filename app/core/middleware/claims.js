import { Actions as farce } from 'farce'

import { routes } from 'core/routes'
import { hasAsyncActionSucceeded, isDomainAction } from 'core/util'
import { actionTypes as claims } from 'domains/claims'

const ClaimsMiddleware = ({ dispatch }) => next => action => {
  // action not in namespace? abort!
  if (!isDomainAction(name, action.type)) return next(action)

  if (claims.CREATE_CLAIM === action.type && hasAsyncActionSucceeded(action)) {
    dispatch(
      farce.push(`${routes.search.path}/${action.payload.createClaim.subject}`)
    )
  }

  return next(action)
}

export default ClaimsMiddleware
