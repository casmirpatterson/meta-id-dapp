import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Box } from 'jaak-primitives'

import { Link } from 'core/components'
import { Button, Image, Text, View } from 'core/primitives'
import { routes } from 'core/routes'

import { actions as SessionActions } from 'domains/session'
import { selectors as UISelectors } from 'domains/ui'

import * as Components from './components'

class Home extends Component {
  onSubmitSetup = displayName => {
    const { actions } = this.props

    // TODO: Handle setup submit
    console.log(displayName)

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
    isSetupMetaIdModalOpen: UISelectors.isSetupMetaIdModalOpen,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...SessionActions }, dispatch),
  })
)(Home)
