import { MetaId } from 'core/services'
import * as actions from './actionTypes'

/**
 * Register a META Identity
 *
 * @param  {Object}   account         Ethereum account object
 * @param  {String}   account.address Account Ethereum address
 * @param  {Function} account.sign    Account message signing method
 * @param  {String}   username        Unique username
 * @return {Object}                   Flux Standard Action
 */
export const createIdentity = (account, username) => ({
  type: actions.CREATE_IDENTITY,
  promise: MetaId.createIdentity(MetaId.createMetaIdObject(account, username)),
})

/**
 * Retrieve a META Identity by `username`
 *
 * @param  {String} username Username of META Identity owner
 * @return {Object}          Flux Standard Action
 */
export const readIdentity = username => ({
  type: actions.READ_IDENTITY,
  promise: MetaId.readIdentity({ id: MetaId.getMetaIdFromUsername(username) }),
})
