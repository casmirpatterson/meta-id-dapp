import { bufferToHex, ecsign, sha3, toBuffer, toRpcSig } from 'ethereumjs-util'
import slugify from 'slugify'

import { META_ID_USERNAME_SUFFIX, PROFILE_CLAIM_PREFIX } from 'core/constants'
import { accounts } from 'core/util'

/**
 * Utility function to convert `username` into META-ID `id`
 *
 * @param  {String} username META-ID username
 * @return {String}          META-ID id
 */
export const getMetaIdFromUsername = username => bufferToHex(sha3(username))

/**
 * Utility function to create a valid META Claim object to verify a new claim
 *
 * @param  {Object} account            Ethereum account object
 * @param  {String} account.address    Account Ethereum address
 * @param  {String} account.privateKey Account private key
 * @param  {Object} claimMessage       Raw claim message
 * @param  {String} subject            META-ID `id` of subject (hash of `username`)
 * @param  {Object} extraData          Any extra properties to add to claim object
 * @return {Object}                    META Claim object
 */
export const createMetaClaimObject = (
  account,
  claimMessage,
  subject,
  extraData = {}
) => {
  return {
    address: account.address,
    claimHash: bufferToHex(sha3(claimMessage)),
    claimMessage: claimMessage,
    subject: subject,
    signature: accounts.signMessage(claimMessage, account.privateKey),
    ...extraData,
  }
}

/**
 * Utility function to create a valid META-ID object to register a new identity
 *
 * @param  {Object} account  Ethereum account object
 * @param  {String} username Identity username
 * @return {Object}          META-ID object
 */
export const createMetaIdObject = (account, username) => {
  return {
    owner: account.address,
    signature: accounts.signMessage(username, account.privateKey),
    username: username,
  }
}

/**
 * Create a valid META Identity Claim object for a profile claim
 * This is a self-issued claim, usually referencing a Swarm hash of profile data
 *
 * @param  {String} claimMessage      Raw identity claim message
 * @param  {Object} issuer            Claim issuer data object
 * @param  {String} issuer.id         META Identity `id` of claim issuer
 * @param  {String} issuer.privateKey Private key of claim issuer
 * @param  {String} subProperty       Type of profile claim contained in `claimMessage`
 * @return {Object}                   Verified META Identity Claim object
 */
export const createProfileMetaIdentityClaim = (
  claimMessage,
  issuer,
  subProperty
) => {
  return createVerifiedIdentityClaimObject(
    claimMessage,
    {
      id: issuer.id,
      privateKey: issuer.privateKey,
      property: `${PROFILE_CLAIM_PREFIX}.${subProperty}`,
    },
    issuer.id
  )
}

/**
 * Create a valid META Identity Claim object to add to META Claims index
 *
 * @param  {String} claimMessage            Raw claim value
 * @param  {Object} claimService            Claim service configuration object
 * @param  {String} claimService.id         META Identity `id` of claim service (issuer)
 * @param  {String} claimService.privateKey Private key of claim service (issuer)
 * @param  {String} claimService.property   Property of identity claim
 * @param  {String} subject                 META Identity `id` of claim subject
 * @return {Object}                         Verified identity claim object
 */
export const createVerifiedIdentityClaimObject = (
  claimMessage,
  claimService,
  subject
) => {
  // generate verified claim buffer
  const verifiedClaimBuffer = sha3(
    Buffer.concat([
      toBuffer(claimService.id),
      toBuffer(subject),
      toBuffer(claimService.property),
      toBuffer(claimMessage),
    ])
  )

  // generate ECDSA signature of verified claim buffer using the MCS private key
  const signatureObject = ecsign(
    verifiedClaimBuffer,
    Buffer.from(claimService.privateKey, 'hex')
  )

  // convert ECDSA signature buffer to hex value
  const signature = toRpcSig(
    signatureObject.v,
    signatureObject.r,
    signatureObject.s
  )

  // return verified identity claim object
  return {
    claim: claimMessage,
    issuer: claimService.id,
    property: claimService.property,
    signature: signature,
    subject: subject,
  }
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
  username.replace(new RegExp(META_ID_USERNAME_SUFFIX, 'i'), '')

/**
 * Filter all profile claims from a set of META Identity Claim objects
 *
 * @param  {Array} claims Set of META Identity Claim objects
 * @return {Array}        Filtered profile claims
 */
export const getProfileClaimsFromMetaIdentityClaims = claims => {
  return claims.filter(claim => isProfileClaim(claim))
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
        [getProfileClaimSubPropertyFromProperty(claim.property)]: claim,
      }),
    {}
  )
}

/**
 * Get the sub-property of a META Identity Profile Claim from the claim's property
 *
 * @example getProfileClaimSubPropertyFromProperty('profile.name') // => 'name'
 *
 * @param  {String} property Profile claim property
 * @return {String}          Profile claim sub-property
 */
export const getProfileClaimSubPropertyFromProperty = property => {
  return property.replace(new RegExp(`${PROFILE_CLAIM_PREFIX}.`, 'i'), '')
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

/**
 * Get a META Identity `username` from a common name
 *
 * @param  {String} commonName Common name to use for META Identity username
 * @return {String}            META Identity username
 */
export const getUsernameFromName = commonName =>
  `${slugify(commonName.toLowerCase())}.${META_ID_USERNAME_SUFFIX}`

/**
 * Check whether a claim is a profile claim
 *
 * @param  {Object}  claim META Identity Claim object
 * @return {Boolean}       Profile claim boolean
 */
export const isProfileClaim = claim => {
  return claim.property.startsWith(`${PROFILE_CLAIM_PREFIX}.`)
}
