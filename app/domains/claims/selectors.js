import { createSelector } from 'reselect'

import { name } from './constants'
import { selectors as Identity } from 'domains/identity'

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
 * @param  {Object} state Redux store
 * @param  {Object} props React component props
 * @return {Array}        Claims about META-ID
 */
const getClaimsBySubject = createSelector(
  [getAll, Identity.identityById],
  (claims, identity) => {
    return claims.filter(claim => claim.subject === identity.owner).toArray()
  }
)

export default {
  claimsBySubject: getClaimsBySubject,
}
