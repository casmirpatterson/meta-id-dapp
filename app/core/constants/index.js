import META_CLAIMS_SERVICES from './metaClaimsServices'
import * as SPOTIFY from './spotify'

export { META_CLAIMS_SERVICES, SPOTIFY }

export const { META_NETWORK_GRAPHQL_ENDPOINT, NODE_ENV } = process.env

export const META_ID_USERNAME_SUFFIX = 'id.meta'

export const STATE_KEY = '@MetaId:store'
