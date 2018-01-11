import queryString from 'query-string'

// import { TWITTER } from 'core/constants'

/**
 * Generate OAuth request URL
 *
 * @param  {String} oAuthToken ...
 * @return {String}            OAuth request URL
 */
export const generateOAuthURL = oAuthToken => {
  return `https://api.twitter.com/oauth/authenticate?oauth_token=${oAuthToken}`
}

/**
 * Extract OAuth access token from callback hash
 *
 * @param  {String} hash Callback URL location hash
 * @return {String}      OAuth access token
 */
export const getOAuthTokenFromCallbackHash = hash => {
  const { access_token } = queryString.parse(hash)

  return access_token
}
