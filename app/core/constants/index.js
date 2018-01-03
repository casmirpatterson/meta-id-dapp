import META_CLAIMS_SERVICES from './metaClaimsServices'
import * as SPOTIFY from './spotify'

export { META_CLAIMS_SERVICES, SPOTIFY }

export const {
  APP_URL,
  BASE_NAME,
  META_NETWORK_GRAPHQL_ENDPOINT,
  NODE_ENV,
  SWARM_HOST,
} = process.env

export const CREDENTIALS = NODE_ENV === 'production' ? 'include' : null

export const META_ID_USERNAME_SUFFIX = 'id.meta'

export const STATE_KEY = '@MetaId:store'
