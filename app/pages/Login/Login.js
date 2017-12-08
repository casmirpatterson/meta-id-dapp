import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Text, View } from 'core/primitives'
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
      <View margin={['32px', 0, 0]}>
        <Text fontSize="24px" fontWeight={700} textAlign="center">
          Login
        </Text>

        <Text margin={['8px', 0, '32px']} textAlign="center">
          Upload an Ethereum keystore file to access your META-ID.
        </Text>

        <Components.Form onSubmit={this.onFormSubmit} />
      </View>
    )
  }
}

export default connect(null, dispatch => ({
  actions: bindActionCreators({ ...SessionActions }, dispatch),
}))(Login)
