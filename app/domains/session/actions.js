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
