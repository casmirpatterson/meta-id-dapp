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
import {
  actions as SessionActions,
  selectors as SessionSelectors,
} from 'domains/session'
import { selectors as UISelectors } from 'domains/ui'

import * as Components from './components'

class Home extends Component {
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
    const { isSetupMetaIdModalOpen, sessionIdentity } = this.props

    return (
      <View size={['100%', 'auto']}>
        <Components.SetupMetaId
          isSetupMetaIdModalOpen={isSetupMetaIdModalOpen}
          submitSetup={this.onSubmitSetup}
        />

        {!sessionIdentity && <Components.Anonymous />}
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
