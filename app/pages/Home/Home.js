import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { PROFILE_CLAIM_SUB_PROPERTY } from 'core/constants'
import { View } from 'core/primitives'
import { Swarm } from 'core/services'
import { metaId } from 'core/util'

import { actions as ClaimsActions } from 'domains/claims'
import { selectors as IdentitySelectors } from 'domains/identity'
import {
  actions as SessionActions,
  selectors as SessionSelectors,
} from 'domains/session'
import { selectors as UISelectors } from 'domains/ui'

import * as Components from './components'

class Home extends Component {
  onProfileImageChange = profileImage => {
    const { account, actions, sessionIdentity } = this.props

    // upload profile image to Swarm
    // then create a self-issued verified profile claim object
    // then push the profile claim to the META Claims index
    return Swarm.upload(profileImage)
      .then(hash =>
        metaId.createProfileMetaIdentityClaim(
          hash,
          { id: sessionIdentity.id, privateKey: account.privateKey },
          PROFILE_CLAIM_SUB_PROPERTY.image
        )
      )
      .then(claim => actions.createClaim(claim))
  }

  onSubmitSetup = displayName => {
    const { account, actions, sessionIdentity } = this.props

    // upload display name profile claim data to Swarm
    // then create a self-issued verified profile claim object
    // then push the profile claim to the META Claims index
    Swarm.upload(displayName)
      .then(hash =>
        metaId.createProfileMetaIdentityClaim(
          hash,
          { id: sessionIdentity.id, privateKey: account.privateKey },
          PROFILE_CLAIM_SUB_PROPERTY.name
        )
      )
      .then(claim => actions.createClaim(claim))

    // reset the newly created user flag so modal closes and is not reopened
    return actions.setIsNewUser(false)
  }

  render() {
    const {
      identityWithClaims,
      isSetupMetaIdModalOpen,
      sessionIdentity,
    } = this.props

    const identity = sessionIdentity && identityWithClaims[sessionIdentity.id]

    return (
      <View size={['100%', 'auto']}>
        <Components.SetupMetaId
          isSetupMetaIdModalOpen={isSetupMetaIdModalOpen}
          submitSetup={this.onSubmitSetup}
        />

        {sessionIdentity ? (
          <Components.Onymous
            identity={identity}
            onProfileImageChange={this.onProfileImageChange}
          />
        ) : (
          <Components.Anonymous />
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
    identityWithClaims: IdentitySelectors.identityWithClaims,
    isSetupMetaIdModalOpen: UISelectors.isSetupMetaIdModalOpen,
    sessionIdentity: SessionSelectors.sessionIdentity,
  }),
  dispatch => ({
    actions: bindActionCreators(
      { ...ClaimsActions, ...SessionActions },
      dispatch
    ),
  })
)(Home)
