import { CREDENTIALS, META_CLAIMS_SERVICES, NODE_ENV } from 'core/constants'
import { Fetch, Swarm } from 'core/services'
import { metaId } from 'core/util'

/**
 * Fetch profile claims data from Swarm
 *
 * @param  {Array}  claims Set of profile claims
 * @return {Object}        Resolved profile claims data
 */
export const fetchProfileClaims = claims => {
  // filter profile claims from the claims set
  const profileClaims = metaId.getProfileClaimsFromMetaIdentityClaims(claims)

  // fetch profile claim data from Swarm using the raw claim hash
  const promises = profileClaims.map(({ claim }) => Swarm.download(claim))

  // return profile claims data indexed by Swarm hash
  return Promise.all(promises).then(values => {
    return values
      .map((v, i) => ({
        [`${profileClaims[i].claim}`]: new TextDecoder('utf-8').decode(v),
      }))
      .reduce((o, v) => Object.assign({}, o, v), {})
  })
}

/**
 * Verify a META Claim with a META Claims Service
 *
 * @param  {Object} claim   Valid META Claim object
 * @param  {String} service META Claims Service URL
 * @return {Object}         META Claims Service verification response
 */
export const verifyClaim = (claim, provider) => {
  return new Promise(async (resolve, reject) => {
    const res = await Fetch.post(
      claim,
      META_CLAIMS_SERVICES[provider].endpoints[NODE_ENV],
      { credentials: CREDENTIALS }
    )
    const json = await res.json()

    if (json.errors) return reject(json)

    return resolve(json)
  })
}
