import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { META_CLAIMS_SERVICES } from 'core/constants'
import Protected from 'core/containers/Protected'
import { Text } from 'core/primitives'
import { metaId, spotify } from 'core/util'
import { actions as ClaimsActions } from 'domains/claims'
import {
  actions as SessionActions,
  selectors as SessionSelectors,
} from 'domains/session'

import * as Components from './components'

class Claim extends Component {
  componentDidMount() {
    const { oAuthClaimMessage, routeParams } = this.props

    if (routeParams.provider) {
      return this.onMetaClaimsServiceCallback(
        oAuthClaimMessage,
        routeParams.provider
      )
    }
  }

  onMetaClaimsServiceCallback = (claimMessage, provider) => {
    const { account, actions, location, sessionIdentity } = this.props

    const extraData = {}

    // TODO - this should be smarter 🤓
    if (provider === 'spotify') {
      // extract Spotify OAuth access token from URL location hash
      extraData.oAuthToken = spotify.getOAuthTokenFromCallbackHash(
        location.hash
      )
    }

    // construct the verifiable claim object
    const claim = metaId.createMetaClaimObject(
      account,
      claimMessage,
      sessionIdentity.id,
      extraData
    )

    // request verification of claim from META Claims Service
    // then add to index if verified
    return actions
      .verifyClaim(claim, META_CLAIMS_SERVICES[provider].url)
      .then(({ error, payload }) => !error && actions.createClaim(payload))
  }

  onSpotifyClaimsServiceRequest = claimMessage => {
    const { actions } = this.props

    // store claim message to persist over OAuth flow
    actions.setOAuthClaimMessage(claimMessage)

    // redirect to Spotify OAuth gateway
    return (window.location.href = spotify.generateOAuthURL())
  }

  render() {
    const { oAuthClaimMessage } = this.props

    return (
      <Protected>
        <Text fontSize="24px" fontWeight={700} textAlign="center">
          Add a New Claim
        </Text>

        <Text margin={['8px', 0, '32px']} textAlign="center">
          Select a META Claims Service to request verification of a claim.
        </Text>

        <Components.ClaimsService
          claimDisplayText="JAAK META Claims Service"
          claimInputPlaceholder="META-ID"
          claimProvider="jaak"
          onClaimsServiceRequest={this.onMetaClaimsServiceCallback}
        />

        <Components.ClaimsService
          claimDisplayText="Spotify META Claims Service"
          claimInputDefaultValue={oAuthClaimMessage}
          claimInputPlaceholder="Spotify username"
          claimProvider="spotify"
          onClaimsServiceRequest={this.onSpotifyClaimsServiceRequest}
        />
      </Protected>
    )
  }
}

export default connect(
  createStructuredSelector({
    account: SessionSelectors.account,
    oAuthClaimMessage: SessionSelectors.oAuthClaimMessage,
    sessionIdentity: SessionSelectors.sessionIdentity,
  }),
  dispatch => ({
    actions: bindActionCreators(
      { ...ClaimsActions, ...SessionActions },
      dispatch
    ),
  })
)(Claim)
