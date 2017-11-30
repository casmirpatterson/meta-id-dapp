import { createSelector } from 'reselect'

import { name } from './constants'
import { seletors as Identity } from 'domains/identity'

/**
 * Select the entire domain from the store by `name`
 *
 * @param  {Object} state Redux store
 * @return {Object}       Domain state
 */
const getAll = state => state.get(name)

/**
 * Get all claims where META-ID is the `subject`
 *
 * @return {Array}
 */
const getClaimsAboutIdentity = createSelector(
  [getAll, Identity.getIdentityById],
  (claims, identity) => {
    return identity.claimsReceived.map(claim => claims[claim])
  }
)

/**
 * Get all claims where META-ID is the `issuer`
 *
 * @type {Array}
 */
const getClaimsByIdentity = createSelector(
  [getAll, Identity.getIdentityById],
  (claims, identity) => {
    return identity.claimsIssued.map(claim => claims[claim])
  }
)

export default {
  claimsAboutIdentity: getClaimsAboutIdentity,
  claimsByIdentity: getClaimsByIdentity,
}
