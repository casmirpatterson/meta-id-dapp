import * as actions from './actionTypes'
import { MetaClaims } from 'core/services'

/**
 * Add profile claims data fetched from Swarm
 *
 * @param  {Array} claims Set of META Identity Claim objects
 * @return {Object}       Flux Standard Action
 */
export const addProfileClaims = claims => ({
  type: actions.ADD_PROFILE_CLAIMS,
  promise: MetaClaims.fetchProfileClaims(claims),
})
