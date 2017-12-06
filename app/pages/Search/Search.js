import React, { Component } from 'react'
import { isValidAddress } from 'ethereumjs-util'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { Link } from 'core/components'
import { routes } from 'core/routes'
import { selectors as ClaimsSelectors } from 'domains/claims'
import {
  actions as IdentityActions,
  selectors as IdentitySelectors,
} from 'domains/identity'
import { selectors as SessionSelectors } from 'domains/session'

class Search extends Component {
  componentDidMount() {
    const { actions, routeParams } = this.props

    let readIdentity

    // check `id` route parameter for `owner` address or `username` string
    if (isValidAddress(routeParams.id)) {
      readIdentity = actions.readIdentityByOwner
    } else {
      readIdentity = actions.readIdentityByUsername
    }

    // fetch identity by `owner` || `username`
    return readIdentity(routeParams.id)
  }

  render() {
    const { claims, identity, isSessionAccount, routeParams } = this.props

    return (
      <div>
        <h2>Search</h2>
        <p>{routeParams.id}</p>
        {identity && <p>Ethereum Address: {identity.owner}</p>}
        {claims &&
          claims.map((claim, key) => (
            <div key={key}>
              <h4>Claim: {claim.claim}</h4>

              <p>
                Claim verified by:&nbsp;
                <Link to={`${routes.search.path}/${claim.issuer}`}>
                  {claim.issuer}
                </Link>
              </p>
            </div>
          ))}
        {isSessionAccount && (
          <Link to={routes.claim.path}>
            <button>New Claim</button>
          </Link>
        )}
      </div>
    )
  }
}

export default connect(
  createStructuredSelector({
    claims: ClaimsSelectors.claimsBySubject,
    identity: IdentitySelectors.identityById,
    isSessionAccount: SessionSelectors.isSessionAccount,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...IdentityActions }, dispatch),
  })
)(Search)
