import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { CenteredPosition, Text, View } from 'core/primitives'
import { accounts } from 'core/util'
import { actions as IdentityActions } from 'domains/identity'
import { actions as SessionActions } from 'domains/session'
import { actions as UIActions } from 'domains/ui'
import * as Components from './components'

class Register extends Component {
  onFormSubmit = ({ keystore, password, username }) => {
    const { actions } = this.props

    // parse the keystore file into JSON
    const encryptedKeystore = JSON.parse(keystore)

    // create an Ethereum account object
    const account = accounts.create(encryptedKeystore, password)

    // handle keystore decryption failure
    if (account instanceof Error) {
      return actions.update({
        error: [
          new Error('Could not decrypt keystore - please check the password'),
        ],
      })
    }

    // create a new META-ID and log the new account in
    return actions
      .createIdentity(account, username)
      .then(({ error }) => !error && actions.login(account, true))
  }

  render() {
    return (
      <View>
        <CenteredPosition>
          <Text fontSize="24px" fontWeight={900} margin={[0, 0, '8px']}>
            Create your META ID
          </Text>

          <Components.Form onSubmit={this.onFormSubmit} />
        </CenteredPosition>
      </View>
    )
  }
}

export default connect(null, dispatch => ({
  actions: bindActionCreators(
    { ...IdentityActions, ...SessionActions, ...UIActions },
    dispatch
  ),
}))(Register)
