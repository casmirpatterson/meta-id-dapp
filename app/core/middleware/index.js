import { createLogger } from 'redux-logger'
import { middleware as reduxPack } from 'redux-pack'

import IdentityMiddleware from './identity'
import SessionMiddleware from './session'

const createMiddleware = isDevelopment => {
  // default middleware
  const middleware = [reduxPack, IdentityMiddleware, SessionMiddleware]

  // logger middleware in development
  if (isDevelopment) middleware.push(createLogger({ collapsed: true }))

  return middleware
}

export default createMiddleware
