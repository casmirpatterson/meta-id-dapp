import React from 'react'
import { compose, withState } from 'recompose'

import { TextInput } from 'core/primitives'

const Search = ({ searchInput, setSearchInput, submitSearch }) => (
  <TextInput
    borderWidth="0"
    placeholder="Search"
    onChange={({ target: { value } }) => setSearchInput(value)}
    onKeyUp={({ keyCode }) => keyCode === 13 && submitSearch(searchInput)}
    size={['auto', '100%']}
    value={searchInput}
  />
)

const enhance = compose(withState('searchInput', 'setSearchInput', ''))

export default enhance(Search)
