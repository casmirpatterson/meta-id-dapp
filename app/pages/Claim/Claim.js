import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import MediaQuery from 'react-responsive'
import { Box, List } from 'jaak-primitives'

import { MetaClaimsService } from 'core/components'
import { META_CLAIMS_SERVICES } from 'core/constants'
import Protected from 'core/containers/Protected'
import { Text } from 'core/primitives'
import { breakpoints } from 'core/style'
import { metaId, spotify } from 'core/util'
import { actions as ClaimsActions } from 'domains/claims'
import {
  actions as SessionActions,
  selectors as SessionSelectors,
} from 'domains/session'

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
      .verifyClaim(claim, provider)
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
        <Box flexDirection="column" size={['100%', 'auto']}>
          <Box
            flex="0 1 auto"
            flexDirection="column"
            margin={[0, 'auto']}
            padding={['16px']}
            size={['auto', '100%']}
            style={{ maxWidth: '1280px' }}
          >
            <Text
              fontSize="20px"
              fontWeight={900}
              margin={['8px', 0]}
              textTransform="uppercase"
            >
              Providers
            </Text>
          </Box>

          <Box backgroundColor="white">
            <Box
              margin={[0, 'auto']}
              padding={['32px', '16px', 0]}
              size={['auto', '100%']}
              style={{ maxWidth: '1280px' }}
            >
              <MediaQuery query={`(${breakpoints.MEDIUM})`}>
                <Box flex="none" size={['auto', '200px']}>
                  <List>
                    <Text
                      color="accent"
                      fontWeight={700}
                      padding={[0, 0, '8px']}
                    >
                      All
                    </Text>
                    <Text
                      color="primary"
                      fontWeight={700}
                      padding={[0, 0, '8px']}
                    >
                      Music
                    </Text>
                    <Text
                      color="primary"
                      fontWeight={700}
                      padding={[0, 0, '8px']}
                    >
                      Social
                    </Text>
                    <Text
                      color="primary"
                      fontWeight={700}
                      padding={[0, 0, '8px']}
                    >
                      Media
                    </Text>
                  </List>
                </Box>
              </MediaQuery>

              <Box flexDirection="column">
                <Text
                  color="primary"
                  fontSize="20px"
                  fontWeight={900}
                  margin={[0, 0, '16px']}
                  textTransform="uppercase"
                >
                  Featured
                </Text>

                <Box>
                  <MetaClaimsService
                    claimInputDefaultValue={oAuthClaimMessage}
                    claimsService={META_CLAIMS_SERVICES.spotify}
                    onClaimsServiceRequest={this.onSpotifyClaimsServiceRequest}
                  />

                  <MetaClaimsService
                    claimsService={META_CLAIMS_SERVICES.ddex}
                    onClaimsServiceRequest={claimMessage =>
                      this.onMetaClaimsServiceCallback(claimMessage, 'ddex')
                    }
                  />

                  <MetaClaimsService
                    claimsService={META_CLAIMS_SERVICES.ppl}
                    onClaimsServiceRequest={claimMessage =>
                      this.onMetaClaimsServiceCallback(claimMessage, 'ppl')
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
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
