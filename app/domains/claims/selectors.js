import { name } from './constants'

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
 * @todo - need to test the efficiency of this selector
 * @see - https://github.com/reactjs/reselect/blob/master/README.md#accessing-react-props-in-selectors
 *
 * @param  {Object} state Redux store
 * @param  {Object} props React component props
 * @return {Array}        Claims about META-ID
 */
const getClaimsBySubject = (state, { match: { params } }) =>
  state.get(name).map(claim => claim.subject === params.id)

export default {
  claimsBySubject: getClaimsBySubject,
}
