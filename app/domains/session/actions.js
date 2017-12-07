import * as actions from './actionTypes'

/**
 * Start session and set account
 *
 * @param  {Object} account Decrypted Ethereum keystore
 * @return {Object}         Flux Standard Action
 */
export const login = account => ({
  type: actions.LOGIN,
  payload: { account },
})

/**
 * End session and reset account
 *
 * @return {Object} Flux Standard Action
 */
export const logout = () => ({
  type: actions.LOGOUT,
})

/**
 * Store a claim message sent to an OAuth provider for retrieval after callback
 *
 * @param  {String} oAuthClaimMessage Raw claim message
 * @return {Object}                   Flux Standard Action
 */
export const setOAuthClaimMessage = oAuthClaimMessage => ({
  type: actions.SET_OAUTH_CLAIM_MESSAGE,
  payload: { oAuthClaimMessage },
})
