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
 * Add a new verifiable claim to the META Claims Index
 *
 * @param  {Object} variables           [description]
 * @param  {String} variables.claim     [description]
 * @param  {String} variables.issuer    [description]
 * @param  {String} variables.signature [description]
 * @param  {String} variables.subject   [description]
 * @return {Object}                     Response data
 */
export const createClaim = variables =>
  metaNetworkRequest(
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
