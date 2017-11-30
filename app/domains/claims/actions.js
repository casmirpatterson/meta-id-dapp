import * as actions from './actionTypes'
import { MetaId } from 'core/services'

/**
 * Add a verifiable claim to the META Claims Index
 *
 * @param  {Object} claim            Verifiable claim data
 * @param  {String} claim.claim      Body of verifiable claim
 * @param  {String} claim.issuer     Ethereum address of claim issuer
 * @param  {String} claim.subject    Ethereum address of claim subject
 * @param  {String} claim.signature  `claim` signed with `issuer` private key
 * @return {Object}                  Flux Standard Action
 */
export const createClaim = claim => ({
  type: actions.CREATE_CLAIM,
  promise: MetaId.createClaim(claim),
})
