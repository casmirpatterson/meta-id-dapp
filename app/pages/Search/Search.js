import React, { Component } from 'react'
import { isValidAddress } from 'ethereumjs-util'
import { Box } from 'jaak-primitives'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { Link } from 'core/components'
import { Button, Card, Image, Text, View } from 'core/primitives'
import { routes } from 'core/routes'
import { metaId } from 'core/util'
import {
  actions as IdentityActions,
  selectors as IdentitySelectors,
} from 'domains/identity'

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
      <View>
        {identity && (
          <Card backgroundColor="primary">
            <Image
              backgroundSize="cover"
              display="inline-block"
              margin={[0, '16px', 0, 0]}
              src="img/icon-person.svg"
              size={['32px']}
              verticalAlign="middle"
            />

            <Text
              color="white"
              display="inline-block"
              fontSize="18px"
              fontWeight={700}
            >
              {identity.username} ({identity.owner})
            </Text>
          </Card>
        )}

        {identity.claims &&
          Object.values(identity.claims).map((claim, key) => (
            <Card key={key}>
              <Box align="middle">
                <Image
                  backgroundSize="cover"
                  margin={[0, '16px', 0, 0]}
                  src="img/icon-verified-claim.svg"
                  size={['32px']}
                />

                <Box flexDirection="column">
                  <Text fontWeight={700}>Claim: {claim.claim}</Text>

                  <Text>
                    Verified by:&nbsp;
                    <Link to={`${routes.search.path}/${claim.issuer}`}>
                      {metaId.getTruncatedMetaIdOwner(claim.issuer)}
                    </Link>
                  </Text>
                </Box>
              </Box>
            </Card>
          ))}

        <Link to={routes.claim.path}>
          <Button
            backgroundColor="primary"
            borderRadius="40px"
            borderWidth="0"
            margin={['32px', 'auto']}
            padding={['16px', '24px']}
          >
            <Text color="white" fontWeight={700}>
              Add a new claim
            </Text>
          </Button>
        </Link>
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
