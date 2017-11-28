import Immutable from 'immutable'
import { createStore, applyMiddleware, compose } from 'redux'

import { STATE_KEY } from 'core/constants'
import createMiddleware from 'core/middleware'
import rootReducer from 'core/reducers'
import { WebStorage } from 'core/services'
import { isDevelopment } from 'core/util'

// create middleware
const middleware = createMiddleware(isDevelopment)

// create store with middleware - and devTools if dev
const finalCreateStore = compose(
  applyMiddleware(...middleware),
  window.devToolsExtension && isDevelopment
    ? window.devToolsExtension()
    : f => f
)(createStore)

// persist stored state
const persistState = JSON.parse(WebStorage.getLocalItem(STATE_KEY)) || {}

// expose create store method
export const configureStore = (state = persistState) => {
  const store = finalCreateStore(rootReducer, Immutable.fromJS(state))

  // store state on change
  store.subscribe(() => {
    WebStorage.setLocalItem(STATE_KEY, JSON.stringify(store.getState()))
  })

  return store
}
