import React, { Component } from 'react'
import { identity } from 'meta.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { Text, View } from 'core/primitives'
import {
  actions as ClaimsActions,
  selectors as ClaimsSelectors,
} from 'domains/claims'
import { Identity } from './components'

class Search extends Component {
  componentDidMount() {
    const { routeParams } = this.props

    // fetch the searched META Claims Graph
    return this.fetchClaimsGraph(routeParams.id)
  }

  componentWillReceiveProps(nextProps) {
    const { routeParams } = this.props
    const { routeParams: nextRouteParams } = nextProps

    // has `id` route param changed?
    if (routeParams.id !== nextRouteParams.id) {
      // fetch the searched META Claims Graph
      return this.fetchClaimsGraph(nextRouteParams.id)
    }
  }

  fetchClaimsGraph = username => {
    const { actions } = this.props

    // get claims graph name
    const graph = identity.getClaimsGraphFromUsername(username)

    // fetch claims graph
    return actions.readClaimsByGraph(graph)
  }

  render() {
    const { claimsWithProfileData, routeParams } = this.props

    // get claims graph name
    const graph = identity.getClaimsGraphFromUsername(routeParams.id)

    // get claims graph data
    const claims = claimsWithProfileData[graph]

    return (
      <View size={['100%', 'auto']}>
        {claims ? (
          <Identity claims={claims} graph={graph} />
        ) : (
          <Text
            fontSize="22px"
            fontWeight={700}
            margin={['32px', 0, 0]}
            textAlign="center"
          >
            <code>{graph}</code> does not exist or has no claims
          </Text>
        )}
      </View>
    )
  }
}

export default connect(
  createStructuredSelector({
    claimsWithProfileData: ClaimsSelectors.claimsWithProfileData,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...ClaimsActions }, dispatch),
  })
)(Search)
