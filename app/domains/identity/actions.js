import { MetaId } from 'core/services'
import { metaId } from 'core/util'
import * as actions from './actionTypes'

/**
 * Register a META Identity
 *
 * @param  {Object} account            Ethereum account object
 * @param  {String} account.address    Account Ethereum address
 * @param  {String} account.privateKey Account private key
 * @param  {String} username           Unique username
 * @return {Object}                    Flux Standard Action
 */
export const createIdentity = (account, username) => ({
  type: actions.CREATE_IDENTITY,
  promise: MetaId.createIdentity({
    identity: metaId.createMetaIdObject(account, username),
  }),
})

/**
 * Retrieve a META Identity by `id`
 *
 * @param  {String} username Username of META Identity owner to hash into `id`
 * @return {Object}          Flux Standard Action
 */
export const readIdentityById = username => ({
  type: actions.READ_IDENTITY,
  promise: MetaId.readIdentity({
    filter: {
      id: metaId.getMetaIdFromUsername(username),
    },
  }),
})

/**
 * Retrieve a META Identity by `owner` address
 *
 * @param  {String} owner Ethereum address of META Identity owner
 * @return {Object}       Flux Standard Action
 */
export const readIdentityByOwner = owner => ({
  type: actions.READ_IDENTITY,
  promise: MetaId.readIdentity({ filter: { owner } }),
})

/**
 * Retrieve a META Identity by `username`
 *
 * @param  {String} username Username of META Identity owner
 * @return {Object}          Flux Standard Action
 */
export const readIdentityByUsername = username => ({
  type: actions.READ_IDENTITY,
  promise: MetaId.readIdentity({ filter: { username } }),
})
