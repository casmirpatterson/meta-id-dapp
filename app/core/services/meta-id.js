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
 * @param  {Object} variables           [description]
 * @param  {String} variables.owner     [description]
 * @param  {String} variables.signature [description]
 * @param  {String} variables.username  [description]
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
 * @param  {Object} variables           [description]
 * @param  {String} variables.claim     [description]
 * @param  {String} variables.issuer    [description]
 * @param  {String} variables.signature [description]
 * @param  {String} variables.subject   [description]
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
 * @param  {Object} variables        [description]
 * @param  {String} variables.issuer [description]
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
 * @param  {Object} variables         [description]
 * @param  {String} variables.subject [description]
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
