import React, { Component } from 'react'
import { identityClaims } from 'meta.js'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { EXAMPLE_IDENTITY, PROFILE_CLAIM_SUB_PROPERTY } from 'core/constants'
import { View } from 'core/primitives'
import { Swarm } from 'core/services'

import { actions as ClaimsActions } from 'domains/claims'
import {
  actions as SessionActions,
  selectors as SessionSelectors,
} from 'domains/session'
import { selectors as UISelectors } from 'domains/ui'

import * as Components from './components'

class Home extends Component {
  onProfileImageChange = profileImage => {
    const { account, actions, graph, sessionIdentityId } = this.props

    // upload profile image to Swarm
    // then create a self-issued verified profile claim object
    // then push the profile claim to the META Claims index
    return Swarm.upload(profileImage)
      .then(hash =>
        identityClaims.createProfileMetaIdentityClaim(
          hash,
          graph,
          { id: sessionIdentityId, privateKey: account.privateKey },
          PROFILE_CLAIM_SUB_PROPERTY.image
        )
      )
      .then(claim => actions.createClaim(claim))
  }

  onSubmitSetup = displayName => {
    const { account, actions, graph, sessionIdentityId } = this.props

    // upload display name profile claim data to Swarm
    // then create a self-issued verified profile claim object
    // then push the profile claim to the META Claims index
    Swarm.upload(displayName)
      .then(hash =>
        identityClaims.createProfileMetaIdentityClaim(
          hash,
          graph,
          { id: sessionIdentityId, privateKey: account.privateKey },
          PROFILE_CLAIM_SUB_PROPERTY.name
        )
      )
      .then(claim => actions.createClaim(claim))

    // reset the newly created user flag so modal closes and is not reopened
    return actions.setIsNewUser(false)
  }

  render() {
    const {
      accountAddress,
      graph,
      isSetupMetaIdModalOpen,
      sessionClaimsGraph,
    } = this.props

    return (
      <View size={['100%', 'auto']}>
        <Components.SetupMetaId
          isSetupMetaIdModalOpen={isSetupMetaIdModalOpen}
          submitSetup={this.onSubmitSetup}
        />

        {graph ? (
          <Components.Onymous
            address={accountAddress}
            claims={sessionClaimsGraph}
            graph={graph}
            onProfileImageChange={this.onProfileImageChange}
          />
        ) : (
          <Components.Anonymous exampleIdentity={EXAMPLE_IDENTITY} />
        )}
      </View>
    )
  }
}

Home.contextTypes = {
  router: PropTypes.object,
}

export default connect(
  createStructuredSelector({
    account: SessionSelectors.account,
    accountAddress: SessionSelectors.accountAddress,
    graph: SessionSelectors.graph,
    isSetupMetaIdModalOpen: UISelectors.isSetupMetaIdModalOpen,
    sessionClaimsGraph: SessionSelectors.sessionClaimsGraph,
    sessionIdentityId: SessionSelectors.sessionIdentityId,
  }),
  dispatch => ({
    actions: bindActionCreators(
      { ...ClaimsActions, ...SessionActions },
      dispatch
    ),
  })
)(Home)
