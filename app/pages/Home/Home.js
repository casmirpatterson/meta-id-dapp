import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Box } from 'jaak-primitives'

import { Link } from 'core/components'
import { PROFILE_CLAIM_SUB_PROPERTY } from 'core/constants'
import { Button, Image, Text, View } from 'core/primitives'
import { routes } from 'core/routes'
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
    const { isSetupMetaIdModalOpen } = this.props

    return (
      <View margin={['32px', 0, 0]}>
        <Components.SetupMetaId
          isSetupMetaIdModalOpen={isSetupMetaIdModalOpen}
          submitSetup={this.onSubmitSetup}
        />

        <Box margin={[0, 'auto']} size={['auto', '148px']}>
          <Link to={routes.register.path}>
            <Button
              backgroundColor="primary"
              borderRadius="50%"
              borderWidth="0"
              boxShadow="0px 4px 12px rgba(0, 0, 0, 0.4)"
              display="flex"
              margin={[0, 'auto']}
              size={['48px']}
            >
              <Image
                backgroundSize="cover"
                size={['24px']}
                src="img/icon-add.svg"
              />
            </Button>

            <Text
              fontSize="18px"
              fontWeight={700}
              margin={['16px', 0, 0]}
              textAlign="center"
            >
              Create META-ID
            </Text>
          </Link>
        </Box>
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
