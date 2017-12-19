import { hasAsyncActionSucceeded, isDomainAction } from 'core/util'
import { actions } from 'domains/claims'
import { actionTypes as identity, name } from 'domains/identity'

const IdentityMiddleware = ({ dispatch }) => next => action => {
  // action not in namespace? abort!
  if (!isDomainAction(name, action.type)) return next(action)

  if (
    identity.READ_IDENTITY === action.type &&
    hasAsyncActionSucceeded(action)
  ) {
    dispatch(actions.readClaimsBySubject(action.payload.identity[0].id))
  }

  return next(action)
}

export default IdentityMiddleware
