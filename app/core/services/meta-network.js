import { GraphQLClient } from 'graphql-request'

import { META_NETWORK_GRAPHQL_ENDPOINT, NODE_ENV } from 'core/constants'

const credentials = NODE_ENV === 'development' ? null : 'include'

/**
 * Create a GraphQL client for sending requests to the META Network API
 *
 * @see https://github.com/graphcool/graphql-request
 *
 * @example MetaNetwork.request(query, variables).then(data => console.log(data))
 *
 * @type {GraphQLClient}
 */
const MetaNetwork = new GraphQLClient(META_NETWORK_GRAPHQL_ENDPOINT, {
  credentials,
  mode: 'cors',
})

export default MetaNetwork
