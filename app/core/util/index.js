import { NODE_ENV } from 'core/constants'

/**
 * Check for development mode
 *
 * @type {Boolean}
 */
export const isDevelopment = NODE_ENV === 'development'

/**
 * Check if action belongs to a domain
 *
 * @param  {String}  domain     Redux store domain
 * @param  {String}  actionType Redux action type
 * @return {Boolean}            isDomainAction
 */
export const isDomainAction = (domain, actionType) =>
  actionType.indexOf(domain) === 0

/**
 * Check if async action has started
 *
 * @param  {Object}  action Flux Standard Action
 * @return {Boolean}        hasAsyncActionStarted
 */
export const hasAsyncActionStarted = action => !action.payload && !action.error

/**
 * Check if async action has failed
 *
 * @param  {Object}  action Flux Standard Action
 * @return {Boolean}        hasAsyncActionFailed
 */
export const hasAsyncActionFailed = action => action.payload && action.error

/**
 * Check if async action has succeeded
 *
 * @param  {Object}  action Flux Standard Action
 * @return {Boolean}        hasAsyncActionSucceeded
 */
export const hasAsyncActionSucceeded = action => action.payload && !action.error

/**
 * Check if async action has finished
 *
 * @param  {Object}  action Flux Standard Action
 * @return {Boolean}        hasAsyncActionFinished
 */
export const hasAsyncActionFinished = action => action.payload || action.error
