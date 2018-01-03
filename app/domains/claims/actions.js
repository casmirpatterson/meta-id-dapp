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
  type: actions.CREATE_CLAIM,
  promise: MetaId.createClaim({ claim }),
})

/**
 * Read verifiable claims from the META Claims Index by `issuer`
 *
 * @param  {String} issuer Ethereum address of claim issuer
 * @return {Object}        Flux Standard Action
 */
export const readClaimsByIssuer = issuer => ({
  type: actions.READ_CLAIMS,
  promise: MetaId.readClaims({ filter: { issuer } }),
})

/**
 * Read verifiable claims from the META Claims Index by `subject`
 *
 * @param  {String} subject Ethereum address of claim subject
 * @return {Object}         Flux Standard Action
 */
export const readClaimsBySubject = subject => ({
  type: actions.READ_CLAIMS,
  promise: MetaId.readClaims({ filter: { subject } }),
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
