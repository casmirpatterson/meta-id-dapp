import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
      <div>
        <h2>Login</h2>

        <Components.Form onSubmit={this.onFormSubmit} />
      </div>
    )
  }
}

export default connect(null, dispatch => ({
  actions: bindActionCreators({ ...SessionActions }, dispatch),
}))(Login)
