import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { META_CLAIMS_SERVICES } from 'core/constants'
import { metaId, spotify } from 'core/util'
import { actions as ClaimsActions } from 'domains/claims'
import { selectors as SessionSelectors } from 'domains/session'

import * as Components from './components'

class Claim extends Component {
  componentDidMount() {
    const { routeParams } = this.props

    if (routeParams.provider) {
      // TODO - retrieve `claimMessage` { oauth.provider.claimMessge } from redux store/sessionStorage
      const claimMessage = 'lukehedger' // TEMP

      return this.onMetaClaimsServiceCallback(
        claimMessage,
        routeParams.provider
      )
    }
  }

  onMetaClaimsServiceCallback = (claimMessage, provider) => {
    const { account, actions, location } = this.props

    const extraData = {}

    // TODO - this should be smarter 🤓
    if (provider === 'spotify') {
      // extract Spotify OAuth access token from URL location hash
      extraData.oAuthToken = spotify.getOAuthTokenFromCallbackHash(
        location.hash
      )
    }

    // construct the verified claim object
    const claim = metaId.createMetaClaimObject(account, claimMessage, extraData)

    // request verification of claim from META Claims Service and add to index
    return actions
      .verifyClaim(claim, META_CLAIMS_SERVICES[provider].url)
      .then(({ payload }) => actions.createClaim(payload))
  }

  // eslint-disable-next-line no-unused-vars
  onSpotifyClaimsServiceRequest = claimMessge => {
    // TODO - store `claimMessage` { oauth.provider.claimMessage } in redux store/sessionStorage

    return (window.location.href = spotify.generateOAuthURL())
  }

  render() {
    return (
      <div>
        <h2>Claim</h2>

        <Components.ClaimsService
          claimButtonText="JAAK META Claims Service"
          claimInputPlaceholder="META-ID"
          claimProvider="jaak"
          onClaimsServiceRequest={this.onMetaClaimsServiceCallback}
        />

        <Components.ClaimsService
          claimButtonText="Spotify META Claims Service"
          claimInputPlaceholder="Spotify username"
          claimProvider="spotify"
          onClaimsServiceRequest={this.onSpotifyClaimsServiceRequest}
        />
      </div>
    )
  }
}

export default connect(
  createStructuredSelector({
    account: SessionSelectors.account,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...ClaimsActions }, dispatch),
  })
)(Claim)
