import { CREDENTIALS, META_CLAIMS_SERVICES, NODE_ENV } from 'core/constants'
import { Fetch } from 'core/services'

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
