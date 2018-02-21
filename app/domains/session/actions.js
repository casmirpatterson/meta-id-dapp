import { getClaimsGraphFromUsername } from '@meta.js/identity'

import { WebStorage } from 'core/services'
import * as actions from './actionTypes'

/**
 * Retrieve stored session state from IndexedDB
 *
 * @param  {String} key Stored state key
 * @return {Object}     Flux Standard Action
 */
export const getStoredSession = key => ({
  type: actions.GET_STORED_SESSION,
  promise: WebStorage.getIndexedDBItem(key),
})

/**
 * Start session and set account
 *
 * @param  {Object}  account           Decrypted Ethereum keystore
 * @param  {String}  username          META ID username
 * @param  {Boolean} [isNewUser=false] Flag a newly created user during login process
 * @return {Object}                    Flux Standard Action
 */
export const login = (account, username, isNewUser = false) => ({
  type: actions.LOGIN,
  payload: { account, graph: getClaimsGraphFromUsername(username), isNewUser },
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
 * Delete stored session state from IndexedDB
 *
 * @param  {String} key Key to delete stored state from
 * @return {Object}     Flux Standard Action
 */
export const removeStoredSession = key => ({
  type: actions.REMOVE_STORED_SESSION,
  promise: WebStorage.removeIndexedDBItem(key),
})

/**
 * Set the newly created user flag
 *
 * @param  {Boolean} isNewUser Newly created user flag
 * @return {Object}            Flux Standard Action
 */
export const setIsNewUser = isNewUser => ({
  type: actions.SET_IS_NEW_USER,
  payload: { isNewUser },
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

/**
 * Store session state in IndexedDB
 *
 * @param  {String} key   Key to store state on
 * @param  {*}      value State to store
 * @return {Object}       Flux Standard Action
 */
export const setStoredSession = (key, value) => ({
  type: actions.SET_STORED_SESSION,
  promise: WebStorage.setIndexedDBItem(key, value),
})
