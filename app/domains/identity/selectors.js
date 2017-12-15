import { isValidAddress } from 'ethereumjs-util'

import { name } from './constants'

/**
 * Select the entire domain from the store by `name`
 *
 * @param  {Object} state Redux store
 * @return {Object}       Domain state
 */
const getAll = state => state.get(name)

/**
 * Select a META Identity by `id` or `owner` address
 *
 * @todo - need to test the efficiency of this selector
 * @see - https://github.com/reactjs/reselect/blob/master/README.md#accessing-react-props-in-selectors
 *
 * @param  {Object} state Redux store
 * @param  {Object} props React component props
 * @return {Object}       META Identity
 */
const getIdentityById = (state, { match: { params } }) => {
  let identity

  // check `id` route parameter for `owner` address or `username` hash
  if (isValidAddress(params.id)) {
    // select identity by `owner` address
    identity = state
      .get(name)
      .find(identity => identity.get('owner') === params.id)
      .toObject()
  } else {
    // select identity by `id` (`username` hash)
    identity = state.getIn([name, params.id])
  }

  return identity
}

export default {
  identity: getAll,
  identityById: getIdentityById,
}
