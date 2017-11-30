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
 * Read a META Identity from the META Identity Index
 *
 * @param  {Object} variables       [description]
 * @param  {String} variables.owner [description]
 * @return {Object}                 Response data
 */
export const readIdentity = variables =>
  metaNetworkRequest(
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
