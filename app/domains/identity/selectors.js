import { MetaId } from 'core/services'
import { name } from './constants'

/**
 * Select the entire domain from the store by `name`
 *
 * @param  {Object} state Redux store
 * @return {Object}       Domain state
 */
const getAll = state => state.get(name)

/**
 * Select a META Identity by `id`
 *
 * @todo - need to test the efficiency of this selector
 * @see - https://github.com/reactjs/reselect/blob/master/README.md#accessing-react-props-in-selectors
 *
 * @param  {Object} state Redux store
 * @param  {Object} props React component props
 * @return {Object}       META Identity
 */
const getIdentityById = (state, { match: { params } }) => {
  return state.getIn([name, MetaId.getMetaIdFromUsername(params.id)])
}

export default {
  identityById: getIdentityById,
}
