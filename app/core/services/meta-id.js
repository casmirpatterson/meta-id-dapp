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
 * Add a new verifiable claim to a META Claims Graph
 *
 * @param  {Object} variables                 Query variables
 * @param  {Object} variables.claim           ClaimInput object
 * @param  {String} variables.claim.claim     Value of the claim
 * @param  {String} variables.claim.graph     Route of the claim graph
 * @param  {String} variables.claim.issuer    Ethereum address of issuer
 * @param  {String} variables.claim.property  Key of the claim
 * @param  {String} variables.claim.signature Issuer's signature of the claim
 * @param  {String} variables.claim.subject   Ethereum address of subject
 * @return {Object}                           Response data
 */
export const createClaim = variables => {
  return metaNetworkRequest(
    `
      mutation CreateClaim($claim: ClaimInput!) {
        createClaim(input: $claim) {
          id
          claim
          graph
          issuer
          property
          signature
          subject
        }
      }
    `,
    variables
  )
}

/**
 * Read all verifiable claims from a META Claims Graph by `claim`, `graph`, `issuer`, `property` or `subject`
 *
 * @param  {Object} variables                   Query variables
 * @param  {Object} variables.filter            ClaimFilter object
 * @param  {String} [variables.filter.claim]    Value of the claim
 * @param  {String} [variables.filter.graph]    Route of the claim graph
 * @param  {String} [variables.filter.issuer]   Ethereum address of issuer
 * @param  {String} [variables.filter.property] Key of the claim
 * @param  {String} [variables.filter.subject]  Ethereum address of subject
 * @return {Object}                             Response data
 */
export const readClaims = variables => {
  return metaNetworkRequest(
    `
      query readClaims($filter: ClaimFilter!) {
        claim (filter: $filter) {
          id
          claim
          graph
          issuer
          property
          signature
          subject
        }
      }
    `,
    variables
  )
}
