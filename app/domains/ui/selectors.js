import { createSelector } from 'reselect'

import { selectors as Session } from 'domains/session'
import { name } from './constants'

/**
 * Select the entire domain from the store by `name`
 *
 * @param  {Object} state Redux store
 * @return {Object}       Domain state
 */
const getAll = state => state.get(name)

/**
 * Get application error status
 *
 * @type {Array}
 */
const getError = createSelector([getAll], state => {
  return state.get('error') && state.get('error').toJS()
})

/**
 * Get application initial load status
 *
 * @type {Boolean}
 */
const getIsInitialLoad = createSelector([getAll], state => {
  return state.get('isInitialLoad')
})

/**
 * Get application network request status
 *
 * @type {Boolean}
 */
const getIsRequesting = createSelector([getAll], state => {
  return state.get('isRequesting')
})

/**
 * Get open state of setup META-ID modal
 *
 * @type {Boolean}
 */
const getIsSetupMetaIdModalOpen = createSelector(
  Session.isNewUser,
  isNewUser => isNewUser
)

export default {
  error: getError,
  isInitialLoad: getIsInitialLoad,
  isRequesting: getIsRequesting,
  isSetupMetaIdModalOpen: getIsSetupMetaIdModalOpen,
}
