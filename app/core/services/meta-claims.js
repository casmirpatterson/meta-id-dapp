import { Fetch } from 'core/services'

/**
 * Verify a META Claim with a META Claims Service
 *
 * @param  {Object} claim   Valid META Claim object
 * @param  {String} service META Claims Service URL
 * @return {Object}         META Claims Service verification response
 */
export const verifyClaim = (claim, service) => {
  return new Promise(async (resolve, reject) => {
    const res = await Fetch.post(claim, service)
    const json = await res.json()

    if (json.errors) return reject(json)

    return resolve(json)
  })
}
