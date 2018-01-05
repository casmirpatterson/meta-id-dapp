import { Actions as farce } from 'farce'

import { routes } from 'core/routes'
import {
  hasAsyncActionFailed,
  hasAsyncActionSucceeded,
  isDomainAction,
} from 'core/util'
import { actionTypes as claims } from 'domains/claims'
import { actions as profile } from 'domains/profile'

const ClaimsMiddleware = ({ dispatch }) => next => action => {
  // action not in namespace? abort!
  if (!isDomainAction(name, action.type)) return next(action)

  if (
    (hasAsyncActionFailed(action) && claims.CREATE_CLAIM === action.type) ||
    (hasAsyncActionFailed(action) && claims.VERIFY_CLAIM === action.type)
  ) {
    dispatch(farce.push(`${routes.claim.path}`))
  }

  if (claims.CREATE_CLAIM === action.type && hasAsyncActionSucceeded(action)) {
    dispatch(
      farce.push(`${routes.search.path}/${action.payload.createClaim.subject}`)
    )
  }

  if (claims.READ_CLAIMS === action.type && hasAsyncActionSucceeded(action)) {
    dispatch(profile.addProfileClaims(action.payload.claim))
  }

  return next(action)
}

export default ClaimsMiddleware
