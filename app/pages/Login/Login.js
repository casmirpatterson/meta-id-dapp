import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { CenteredPosition, Text, View } from 'core/primitives'
import { accounts } from 'core/util'
import { actions as SessionActions } from 'domains/session'
import * as Components from './components'

class Login extends Component {
  onFormSubmit = ({ keystore, password }) => {
    const { actions } = this.props

    // parse the keystore file into JSON
    const encryptedKeystore = JSON.parse(keystore)

    // create an Ethereum account object
    const account = accounts.create(encryptedKeystore, password)

    // log the account in
    return actions.login(account)
  }

  render() {
    return (
      <View>
        <CenteredPosition>
          <Text fontSize="24px" fontWeight={900} margin={[0, 0, '8px']}>
            Import Account
          </Text>

          <Components.Form onSubmit={this.onFormSubmit} />
        </CenteredPosition>
      </View>
    )
  }
}

export default connect(null, dispatch => ({
  actions: bindActionCreators({ ...SessionActions }, dispatch),
}))(Login)
