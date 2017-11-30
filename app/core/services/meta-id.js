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
 * @param  {Object} variables           [description]
 * @param  {String} variables.owner     [description]
 * @param  {String} variables.signature [description]
 * @param  {String} variables.username  [description]
 * @return {Object}                     Response data
 */
export const createIdentity = variables =>
  metaNetworkRequest(
    `
  mutation CreateIdentity(
    $username: String,
    $owner: String,
    $signature: String
  ) {
    createIdentity(username: $username, owner: $owner, signature: $signature) {
      id
      owner
    }
  }
`,
    variables
  )
