import React from 'react'
import { compose, withState } from 'recompose'

import { Link } from 'core/components'
import { routes } from 'core/routes'

const Search = ({ searchInput, setSearchInput }) => (
  <div>
    <input
      onChange={({ target: { value } }) => setSearchInput(value)}
      placeholder="Search for a META-ID"
      type="text"
      value={searchInput}
    />

    <Link to={`${routes.search.path}/${searchInput}`}>
      <button>Search</button>
    </Link>
  </div>
)

const enhance = compose(withState('searchInput', 'setSearchInput', ''))

export default enhance(Search)
