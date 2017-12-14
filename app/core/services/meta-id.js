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
 * Add a new META Identity to the META Identity Index
 *
 * @param  {Object} variables                    Query variables
 * @param  {Object} variables.identity           IdentityInput object
 * @param  {String} variables.identity.owner     Ethereum address of META Identity
 * @param  {String} variables.identity.signature `username` signed with `owner` private key
 * @param  {String} variables.identity.username  Unique username
 * @return {Object}                              Response data
 */
export const createIdentity = variables => {
  return metaNetworkRequest(
    `
      mutation CreateIdentity($identity: IdentityInput!) {
        createIdentity(input: $identity) {
          id
          owner
          signature
          username
        }
      }
    `,
    variables
  )
}

/**
 * Read a META Identity from the META Identity Index by `id`, `owner` or `username`
 *
 * @param  {Object} variables                   Query variables
 * @param  {Object} variables.filter            IdentityFilter object
 * @param  {String} [variables.filter.id]       Hash of username `sha3(username)`
 * @param  {String} [variables.filter.owner]    Ethereum address of META Identity
 * @param  {String} [variables.filter.username] META-ID username
 * @return {Object}                             Response data
 */
export const readIdentity = variables => {
  return metaNetworkRequest(
    `
      query readIdentity($filter: IdentityFilter!) {
        identity(filter: $filter) {
          id
          owner
          signature
          username
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
