import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Text, View } from 'core/primitives'
import { accounts } from 'core/util'
import { actions as IdentityActions } from 'domains/identity'
import { actions as SessionActions } from 'domains/session'
import * as Components from './components'

class Register extends Component {
  onFormSubmit = ({ keystore, password, username }) => {
    const { actions } = this.props

    // parse the keystore file into JSON
    const encryptedKeystore = JSON.parse(keystore)

    // create an Ethereum account object
    const account = accounts.create(encryptedKeystore, password)

    // create a new META-ID and log the new account in
    return actions
      .createIdentity(account, username)
      .then(() => actions.login(account))
  }

  render() {
    return (
      <View margin={['32px', 0, 0]}>
        <Text fontSize="24px" fontWeight={700} textAlign="center">
          Create a new META-ID
        </Text>

        <Text margin={['8px', 0, '32px']} textAlign="center">
          Choose a username and upload an Ethereum keystore file to create your
          META-ID.
        </Text>

        <Components.Form onSubmit={this.onFormSubmit} />
      </View>
    )
  }
}

export default connect(null, dispatch => ({
  actions: bindActionCreators(
    { ...IdentityActions, ...SessionActions },
    dispatch
  ),
}))(Register)
