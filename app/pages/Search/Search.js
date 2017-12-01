import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import {
  actions as IdentityActions,
  selectors as IdentitySelectors,
} from 'domains/identity'

class Search extends Component {
  componentDidMount() {
    const { actions, routeParams } = this.props

    return actions.readIdentity(routeParams.id)
  }

  render() {
    const { identity } = this.props

    return (
      <div>
        <h2>Search</h2>
        {identity && <p>Ethereum Address: {identity.owner}</p>}
      </div>
    )
  }
}

export default connect(
  createStructuredSelector({
    identity: IdentitySelectors.identityById,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...IdentityActions }, dispatch),
  })
)(Search)
