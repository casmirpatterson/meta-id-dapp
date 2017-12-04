import {
  hasAsyncActionFailed,
  hasAsyncActionStarted,
  hasAsyncActionSucceeded,
} from 'core/util'
import { actions } from 'domains/ui'

const UIMiddleware = ({ dispatch }) => next => action => {
  if (hasAsyncActionFailed(action)) {
    dispatch(
      actions.update({ error: action.payload.errors, isRequesting: false })
    )
  }

  if (hasAsyncActionStarted(action)) {
    dispatch(actions.update({ error: null, isRequesting: true }))
  }

  if (hasAsyncActionSucceeded(action)) {
    dispatch(actions.update({ isRequesting: false }))
  }

  return next(action)
}

export default UIMiddleware
