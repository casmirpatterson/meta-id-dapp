import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { MetaId } from 'core/services'
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

    // construct META-ID object
    const identity = MetaId.createMetaIdObject(account, username)

    // log the new account in
    actions.login(account)

    // create a new META-ID
    return actions.createIdentity(identity)
  }

  render() {
    return (
      <div>
        <h2>Register</h2>

        <Components.Form onSubmit={this.onFormSubmit} />
      </div>
    )
  }
}

export default connect(null, dispatch => ({
  actions: bindActionCreators(
    { ...IdentityActions, ...SessionActions },
    dispatch
  ),
}))(Register)
