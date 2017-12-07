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
  return state.get('account') && state.get('account').toObject()
})

/**
 * Get session account address
 *
 * @type {String}
 */
const getAccountAddress = createSelector([getAccount], account => {
  return account && account.address
})

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
 * @type {Boolean}
 */
const getIsSessionAccount = createSelector(
  [getAccount, Identity.identityById],
  (account, identity) => {
    return Boolean(
      account && identity && account.address === identity.get('owner')
    )
  }
)

/**
 * Get OAuth claim message
 *
 * @type {String}
 */
const getOAuthClaimMessage = createSelector([getAll], state => {
  return state.get('oAuthClaimMessage')
})

/**
 * Get META Identity of session account
 *
 * @type {Object}
 */
const getSessionIdentity = createSelector(
  [getAccountAddress, Identity.identity],
  (address, identity) => {
    return identity.find(({ owner }) => owner === address)
  }
)

export default {
  account: getAccount,
  accountAddress: getAccountAddress,
  isLoggedIn: getIsLoggedIn,
  isSessionAccount: getIsSessionAccount,
  oAuthClaimMessage: getOAuthClaimMessage,
  sessionIdentity: getSessionIdentity,
}
