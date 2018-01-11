import React, { Component } from 'react'
import { isValidAddress } from 'ethereumjs-util'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { Text, View } from 'core/primitives'
import {
  actions as IdentityActions,
  selectors as IdentitySelectors,
} from 'domains/identity'
import { Identity } from './components'

class Search extends Component {
  componentDidMount() {
    const { routeParams } = this.props

    // fetch the searched META Identity
    return this.fetchIdentity(routeParams.id)
  }

  componentWillReceiveProps(nextProps) {
    const { routeParams } = this.props
    const { routeParams: nextRouteParams } = nextProps

    // has `id` route param changed?
    if (routeParams.id !== nextRouteParams.id) {
      // fetch the searched META Identity
      return this.fetchIdentity(nextRouteParams.id)
    }
  }

  fetchIdentity = id => {
    const { actions } = this.props

    let readIdentity

    // check `id` for `owner` address or `id` hash
    if (isValidAddress(id)) {
      readIdentity = actions.readIdentityByOwner
    } else {
      readIdentity = actions.readIdentityById
    }

    // fetch identity by `owner` || `id`
    return readIdentity(id)
  }

  render() {
    const { identityWithClaims, routeParams } = this.props

    const identity = identityWithClaims[routeParams.id]

    return (
      <View size={['100%', 'auto']}>
        {identity ? (
          <Identity identity={identity} />
        ) : (
          <Text
            fontSize="22px"
            fontWeight={700}
            margin={['32px', 0, 0]}
            textAlign="center"
          >
            No META ID found
          </Text>
        )}
      </View>
    )
  }
}

export default connect(
  createStructuredSelector({
    identityWithClaims: IdentitySelectors.identityWithClaims,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...IdentityActions }, dispatch),
  })
)(Search)
