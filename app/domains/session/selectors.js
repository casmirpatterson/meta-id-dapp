import { createSelector } from 'reselect'

import { name } from './constants'
import { selectors as Identity } from 'domains/identity'

/**
 * Select the entire domain from the store by `name`
 *
 * @param  {Object} state Redux store
 * @return {Object}       Domain state
 */
const getAll = state => state.get(name)

/**
 * Get session account
 *
 * @type {Object}
 */
const getAccount = createSelector([getAll], state => {
  return state.get('account')
})

/**
 * Get session account address
 *
 * @type {String}
 */
const getAccountAddress = createSelector([getAccount], account => {
  return account.address
})

/**
 * Get session identity
 *
 * @type {Object}
 */
const getSessionIdentity = createSelector(
  [getAccountAddress, Identity.getAll],
  (address, identity) => {
    return identity.get(address)
  }
)

/**
 * Check if active session account
 *
 * @type {Boolean}
 */
const getIsLoggedIn = createSelector([getAccount], account => {
  return Boolean(account)
})

/**
 * Check if a META-ID matches the session account
 *
 * @todo - need to test the efficiency of this selector
 * @see - https://github.com/reactjs/reselect/blob/master/README.md#accessing-react-props-in-selectors
 *
 * @param  {Object}  state Redux store
 * @param  {Object}  props React component props
 * @return {Boolean}
 */
const getIsSessionAccount = (state, { match: { params } }) =>
  state.getIn([name, 'account', 'address']) === params.id

export default {
  account: getAccount,
  accountAddress: getAccountAddress,
  sessionIdentity: getSessionIdentity,
  isLoggedIn: getIsLoggedIn,
  isSessionAccount: getIsSessionAccount,
}
