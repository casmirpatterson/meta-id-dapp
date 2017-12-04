import { bufferToHex, sha3 } from 'ethereumjs-util'

import MetaNetwork from 'core/services/meta-network'

/**
 * Utility function that wraps `MetaNetwork.request()`
 *
 * @param  {String} query     GraphQL query string
 * @param  {Object} variables GraphQL query variables
 * @return {Object}           Response data
 */
const metaNetworkRequest = (query, variables) =>
  MetaNetwork.request(query, variables)

/**
 * Utility function to convert `username` into META-ID `id`
 *
 * @param  {String} username META-ID username
 * @return {String}
 */
export const getMetaIdFromUsername = username => bufferToHex(sha3(username))

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
    signature: account.sign(username),
    username: username,
  }
}

/**
 * Add a new META Identity to the META Identity Index
 *
 * @param  {Object} variables           Query variables
 * @param  {String} variables.owner     Ethereum address of META Identity
 * @param  {String} variables.signature `username` signed with `owner` private key
 * @param  {String} variables.username  Unique username
 * @return {Object}                     Response data
 */
export const createIdentity = variables => {
  return metaNetworkRequest(
    `
      mutation CreateIdentity(
        $username: String,
        $owner: String,
        $signature: String
      ) {
        createIdentity(username: $username, owner: $owner, signature: $signature) {
          id
          owner
          signature
        }
      }
    `,
    variables
  )
}

/**
 * Read a META Identity from the META Identity Index by `id`
 *
 * @param  {Object} variables    Query variables
 * @param  {String} variables.id Hash of username `sha3(username)`
 * @return {Object}              Response data
 */
export const readIdentityById = variables => {
  return metaNetworkRequest(
    `
      query readIdentity($id: String!) {
        identity(id: $id) {
          id
          owner
          signature
        }
      }
    `,
    variables
  )
}

/**
 * Read a META Identity from the META Identity Index by `owner`
 *
 * @param  {Object} variables       Query variables
 * @param  {String} variables.owner Ethereum address of META Identity
 * @return {Object}                 Response data
 */
export const readIdentityByOwner = variables => {
  return metaNetworkRequest(
    `
      query readIdentity($owner: String!) {
        identity(owner: $owner) {
          id
          owner
          signature
        }
      }
    `,
    variables
  )
}

/**
 * Add a new verifiable claim to the META Claims Index
 *
 * @param  {Object} variables           Query variables
 * @param  {String} variables.claim     Value of the claim
 * @param  {String} variables.issuer    Ethereum address of issuer
 * @param  {String} variables.signature Issuer's signature of the claim
 * @param  {String} variables.subject   Ethereum address of subject
 * @return {Object}                     Response data
 */
export const createClaim = variables => {
  return metaNetworkRequest(
    `
      mutation CreateClaim(
        $issuer: String,
        $subject: String,
        $claim: String,
        $signature: String
      ) {
        createClaim(
          issuer: $issuer,
          subject: $subject,
          claim: $claim,
          signature: $signature
        ) {
          id
          issuer
          subject
          claim
          signature
        }
      }
    `,
    variables
  )
}

/**
 * Read all verifiable claims from the META Claims Index by `issuer`
 *
 * @param  {Object} variables        Query variables
 * @param  {String} variables.issuer Ethereum address of META Identity
 * @return {Object}                  Response data
 */
export const readClaimsByIssuer = variables => {
  return metaNetworkRequest(
    `
      query readClaimsByIssuer($issuer: String) {
        claim (issuer: $issuer) {
          id
          issuer
          subject
          claim
        }
      }
    `,
    variables
  )
}

/**
 * Read all verifiable claims from the META Claims Index by `subject`
 *
 * @param  {Object} variables         Query variables
 * @param  {String} variables.subject Ethereum address of META Identity
 * @return {Object}                   Response data
 */
export const readClaimsBySubject = variables => {
  return metaNetworkRequest(
    `
      query readClaimsBySubject($subject: String) {
        claim (subject: $subject) {
          id
          issuer
          subject
          claim
        }
      }
    `,
    variables
  )
}
