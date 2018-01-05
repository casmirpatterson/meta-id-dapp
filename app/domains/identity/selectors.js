import Immutable from 'immutable'
import { createSelector } from 'reselect'

import { selectors as Claims } from 'domains/claims'
import { name } from './constants'

/**
 * Select the entire domain from the store by `name`
 *
 * @param  {Object} state Redux store
 * @return {Object}       Domain state
 */
const getAll = state => state.get(name)

/**
 * Get all identities augmented with claim data
 *
 * @return {Object}
 */
const getIdentityWithClaims = createSelector(
  [Claims.claimsWithProfileData, getAll],
  (claims, identities) => {
    const identitiesWithClaims = identities.map(identity => {
      // filter claims about this identity
      const identityClaims = claims.filter(
        claim => claim.get('subject') === identity.get('id')
      )

      // augment identity object with identity's claims
      const identityWithClaims = Immutable.Map(identity).set(
        'claims',
        identityClaims
      )

      // return combined identity and claims object
      return identityWithClaims
    })

    return identitiesWithClaims.toJS()
  }
)

export default {
  identity: getAll,
  identityWithClaims: getIdentityWithClaims,
}
