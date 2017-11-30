import MetaNetwork from 'core/services/meta-network'

/**
 * Utility function that wraps `MetaNetwork.request()`
 *
 * @param  {String} query     GraphQL query string
 * @param  {Object} variables GraphQL query variables
 * @return {Object}           Response data
 */
const metaNetworkRequest = (query, variables) => MetaNetwork.request(query, variables)
