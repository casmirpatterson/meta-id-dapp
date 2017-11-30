import * as actions from './actionTypes'
import { MetaId } from 'core/services'

/**
 * Register a META Identity
 *
 * @param  {Object} identity           META Identity data
 * @param  {String} identity.owner     Ethereum address of META Identity owner
 * @param  {String} identity.signature `username` signed with `owner` private key
 * @param  {String} identity.username  Unique username
 * @return {Object}                    Flux Standard Action
 */
export const createIdentity = identity => ({
  type: actions.CREATE_IDENTITY,
  promise: MetaId.createIdentity(identity),
})

/**
 * Retrieve a META Identity
 *
 * @param  {String} owner Ethereum address of META Identity owner
 * @return {Object}       Flux Standard Action
 */
export const readIdentity = owner => ({
  type: actions.READ_IDENTITY,
  promise: MetaId.readIdentity({ owner }),
})
