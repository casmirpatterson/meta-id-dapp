import { identityClaims, shared } from 'meta.js'

import {
  META_CLAIMS_SERVICES,
  META_CLAIMS_SERVICES_BY_PROPERTY,
} from 'core/constants'

/**
 * Get profile data for a set of META Identity Claims
 *
 * @todo Claim issuer profile data should be resolved from the profile claim Swarm hash
 *       This is a temporary hack
 *
 * @param  {Array} claims Set of META Identity Claim objects
 * @return {Array}        Claim issuer profile data
 */
export const getClaimIssuerProfilesFromClaims = claims => {
  return claims
    .map(
      claim =>
        META_CLAIMS_SERVICES[META_CLAIMS_SERVICES_BY_PROPERTY[claim.property]]
    )
    .filter(claim => claim)
}

/**
 * Get a common name from a META Identity `username`
 *
 * @example getNameFromUsername('luke.id.meta') // => 'luke'
 *
 * @param  {String} username META Identity username
 * @return {String}          Common name extracted from username
 */
export const getNameFromUsername = username =>
  username.replace(new RegExp(shared.META_ID_USERNAME_SUFFIX, 'i'), '')

/**
 * Filter all profile claims from a set of META Identity Claim objects
 *
 * @param  {Array} claims Set of META Identity Claim objects
 * @return {Array}        Filtered profile claims
 */
export const getProfileClaimsFromMetaIdentityClaims = claims => {
  return claims.filter(claim => identityClaims.isProfileClaim(claim))
}

/**
 * Convert array of profile claims into object keyed by claim sub-property
 *
 * @param  {Array}  claims Set of META Identity Profile Claim objects
 * @return {Object}        Profile claims object keyed by claim sub-property
 */
export const getProfileClaimsKeyedBySubProperty = claims => {
  return claims.reduce(
    (obj, claim) =>
      Object.assign({}, obj, {
        [identityClaims.getProfileClaimSubPropertyFromProperty(
          claim.property
        )]: claim,
      }),
    {}
  )
}

/**
 * Truncate a META-ID owner
 *
 * @example 0x2f138CC4179cA8FF8504cbE74e52f321F855B541 => 0x2f1...541
 *
 * @param  {String} owner Ethereum address to truncate
 * @return {String}       Truncated address
 */
export const getTruncatedMetaIdOwner = (owner = '') => {
  return `${owner.substring(0, 5)}...${owner.substring(39)}`
}
