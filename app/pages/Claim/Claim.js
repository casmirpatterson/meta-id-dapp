import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { actions as ClaimsActions } from 'domains/claims'
import { selectors as SessionSelectors } from 'domains/session'

class Claim extends Component {
  onMetaClaimsServiceRequest = () => {
    const { account, actions } = this.props

    // construct the verified claim object
    // TODO - send MCS request (not used for now)
    // createMetaClaimObject(account, 'someClaimMessage')

    // construct the verified claim object
    // TODO - handle MCS response (mocked for now)
    const claim = {
      claim: 'abcdefg',
      issuer: '0x06b94c7d6039f4009dcad7c9b3cd0e5a0ba4a928',
      subject: account.address,
      signature:
        '0x445e600c32a87c3471d91400f45b7e57306dc6ff768cc6656bd0aa11a2466b523dddb45db91e570b8bd7f9bc8dd3728e797314ea75542139f96ae20bcfdab63700',
    }

    actions.createClaim(claim)
  }

  render() {
    const { routeParams } = this.props

    return (
      <div>
        <h2>Claim</h2>

        <p>{routeParams.id}.id.meta</p>

        <button onClick={() => this.onMetaClaimsServiceRequest()}>
          JAAK META Claims Service
        </button>

        <button onClick={() => this.onMetaClaimsServiceRequest()}>
          Spotify META Claims Service
        </button>

        <button onClick={() => this.onMetaClaimsServiceRequest()}>
          Twitter META Claims Service
        </button>
      </div>
    )
  }
}

export default connect(
  createStructuredSelector({
    account: SessionSelectors.account,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...ClaimsActions }, dispatch),
  })
)(Claim)
