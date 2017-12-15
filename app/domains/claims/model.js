import { Record } from 'immutable'

/**
 * Verifiable claim Immutable.Record
 * @type {Record}
 */
const Claim = new Record({
  id: '',
  claim: '',
  issuer: '',
  property: '',
  signature: '',
  subject: '',
})

/**
 * Factory function to construct new verifiable claim Record
 *
 * @param  {Object} claim Verifiable claim data
 * @return {Record}
 */
export const claimFactory = claim => new Claim(claim)
