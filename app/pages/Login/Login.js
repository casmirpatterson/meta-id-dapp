import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { CenteredPosition, Text, View } from 'core/primitives'
import { accounts } from 'core/util'
import { actions as SessionActions } from 'domains/session'
import { actions as UIActions } from 'domains/ui'
import * as Components from './components'

class Login extends Component {
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

    // log the account in
    return actions.login(account, username)
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
  actions: bindActionCreators({ ...SessionActions, ...UIActions }, dispatch),
}))(Login)
