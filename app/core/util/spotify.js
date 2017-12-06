import randomString from 'randomstring'
import queryString from 'query-string'

import { SPOTIFY } from 'core/constants'

/**
 * Check or set the Spotify API `state` query parameter
 *
 * @see https://developer.spotify.com/web-api/authorization-guide/#implicit-grant-flow
 *
 * @param  {String} [state] State string to verify
 * @return {String}         A random string for use with the `state` query param
 */
const spotifyState = state => {
  // eslint-disable-next-line prefer-const
  let storedState

  if (state && state === storedState) {
    return true
  }

  const newState = randomString.generate()

  // TODO - this needs to be saved to/restored from sessionStorage
  storedState = newState

  return newState
}

/**
 * Generate OAuth request URL
 *
 * @return {String} OAuth request URL
 */
export const generateOAuthURL = () => {
  return `https://accounts.spotify.com/en/authorize?response_type=token&client_id=${
    SPOTIFY.CLIENT_ID
  }&scope=${SPOTIFY.SCOPE}&redirect_uri=${encodeURI(
    SPOTIFY.REDIRECT_URI
  )}&state=${spotifyState()}&show_dialog=${SPOTIFY.SHOW_DIALOG}`
}

/**
 * Extract OAuth access token from callback hash
 *
 * @param  {String} hash Callback URL location hash
 * @return {String}      OAuth access token
 */
export const getOAuthTokenFromCallbackHash = hash => {
  // TODO - switch this on once Spotify state saved to sessionStorage
  // if (hash.state !== spotifyState(hash.state)) {
  //   throw new Error('Unauthorized request')
  // }

  const { access_token } = queryString.parse(hash)

  return access_token
}
