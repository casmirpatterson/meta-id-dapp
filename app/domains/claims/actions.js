import * as actions from './actionTypes'
import { MetaClaims, MetaId } from 'core/services'

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
  meta: { graph: claim.graph },
  type: actions.CREATE_CLAIM,
  promise: MetaId.createClaim({ claim }),
})

/**
 * Read verifiable claims from a META Claims Graph
 *
 * @param  {String} graph Claims graph
 * @return {Object}       Flux Standard Action
 */
export const readClaimsByGraph = graph => ({
  meta: { graph },
  type: actions.READ_CLAIMS,
  promise: MetaId.readClaims({ filter: { graph } }),
})

/**
 * Verify a META Claim with a META Claims Service
 *
 * @param  {Object} claim    Valid META Claim object
 * @param  {String} provider META Claims Service provider key
 * @return {Object}          Flux Standard Action
 */
export const verifyClaim = (claim, provider) => ({
  type: actions.VERIFY_CLAIM,
  promise: MetaClaims.verifyClaim(claim, provider),
})
