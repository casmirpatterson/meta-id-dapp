import React from 'react'
import { Box } from 'jaak-primitives'
import { compose, withState } from 'recompose'

import { Input } from 'core/primitives'

const Search = ({ searchInput, setSearchInput, submitSearch }) => (
  <Box align="center" margin={['16px', 0, '48px']}>
    <Input
      borderColor="primary"
      borderRadius="4px"
      onChange={({ target: { value } }) => setSearchInput(value)}
      onKeyUp={({ keyCode }) => keyCode === 13 && submitSearch(searchInput)}
      padding={['12px', '20px']}
      placeholder="🔍  Search for a META-ID"
      size={['auto', '220px']}
      type="text"
      value={searchInput}
    />
  </Box>
)

const enhance = compose(withState('searchInput', 'setSearchInput', ''))

export default enhance(Search)
