import { MetaId } from 'core/services'
import * as actions from './actionTypes'

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
 * Retrieve a META Identity by `username`
 *
 * @param  {String} username Username of META Identity owner
 * @return {Object}          Flux Standard Action
 */
export const readIdentity = username => ({
  type: actions.READ_IDENTITY,
  promise: MetaId.readIdentity({ id: MetaId.getMetaIdFromUsername(username) }),
})
