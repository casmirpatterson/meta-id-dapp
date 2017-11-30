import { Record } from 'immutable'

/**
 * META Identity Immutable.Record
 * @type {Record}
 */
const Identity = new Record({
  id: '',
  claimsIssued: [],
  claimsReceived: [],
  owner: '',
  signature: '',
})

/**
 * Factory function to construct new META Identity Record
 *
 * @param  {Object} identity META Identity
 * @return {Record}
 */
export const identityFactory = identity => new Identity(identity)
