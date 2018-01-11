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

export const META_CLAIMS_SERVICES_BY_PROPERTY = {
  dpid: 'ddex',
  pplid: 'ppl',
  spotifyid: 'spotify',
  twitterid: 'twitter',
}

export const META_ID_USERNAME_SUFFIX = 'id.meta'

export const PROFILE_CLAIM_PREFIX = 'profile'

export const PROFILE_CLAIM_SUB_PROPERTY = {
  image: 'image',
  name: 'name',
}

export const PROFILE_IMAGE_DEFAULT = 'img/default-profile.png'

export const STATE_KEY = '@MetaId:store'
