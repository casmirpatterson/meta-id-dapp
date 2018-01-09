import React, { Component, Fragment } from 'react'
import { Box, Position } from 'jaak-primitives'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { ThemeProvider } from 'styled-components'

import { Link, Logo, Search } from 'core/components'
import {
  Anchor,
  Error,
  Footer,
  Header,
  HeaderLink,
  Image,
  Loader,
  Main,
  PrimaryButton,
  Text,
  View,
} from 'core/primitives'
import { routes } from 'core/routes'
import { theme } from 'core/style'
import { metaId } from 'core/util'
import {
  actions as SessionActions,
  selectors as SessionSelectors,
} from 'domains/session'
import { selectors as UISelectors } from 'domains/ui'

class App extends Component {
  getChildContext() {
    return {
      router: this.props.router,
    }
  }

  onSubmitSearch = searchInput => {
    const { router } = this.props

    return router.push(
      `${routes.search.path}/${metaId.getMetaIdFromUsername(searchInput)}`
    )
  }

  render() {
    const {
      actions,
      children,
      error,
      isRequesting,
      sessionIdentity,
    } = this.props

    return (
      <ThemeProvider theme={theme}>
        <View
          display="flex"
          flexDirection="column"
          maxWidth="1280px"
          margin={[0, 'auto']}
          padding={['16px']}
          size={['100%', 'auto']}
        >
          <Main>
            <Header padding={['16px']}>
              <Box>
                <Box align="middle">
                  <Link to={routes.home.path}>
                    <Logo maxWidth="157px" size={['29px', '157px']} />
                  </Link>

                  {sessionIdentity && (
                    <Fragment>
                      <Link
                        activePropName={HeaderLink.defaultProps.activePropName}
                        Component={HeaderLink}
                        exact
                        to={routes.home.path}
                      >
                        My ID
                      </Link>

                      <Link
                        activePropName={HeaderLink.defaultProps.activePropName}
                        Component={HeaderLink}
                        to={routes.claim.path}
                      >
                        Providers
                      </Link>
                    </Fragment>
                  )}
                </Box>

                <Box align="middle">
                  <Box margin={[0, '16px', 0, 0]}>
                    <Search submitSearch={this.onSubmitSearch} />
                  </Box>

                  <Box flex="none" size={['auto', '100px']}>
                    {sessionIdentity ? (
                      <PrimaryButton onClick={() => actions.logout()}>
                        Logout
                      </PrimaryButton>
                    ) : (
                      <Link to={routes.login.path}>
                        <PrimaryButton>Login</PrimaryButton>
                      </Link>
                    )}
                  </Box>
                </Box>
              </Box>

              {isRequesting && (
                <Position position="absolute" top="8px" right="8px">
                  <Loader />
                </Position>
              )}

              {error && (
                <Error>
                  {error.map((e, key) => (
                    <Text color="error" key={key}>
                      {e.message}
                    </Text>
                  ))}
                </Error>
              )}
            </Header>

            {children}
          </Main>

          <Footer>
            <Anchor href="https://jaak.io/" target="_blank">
              <Image
                backgroundSize="contain"
                display="inline-block"
                margin={[0, 0, 0, '4px']}
                size={['14px', '24px']}
                src="img/jaak.png"
                verticalAlign="middle"
              />
            </Anchor>
          </Footer>
        </View>
      </ThemeProvider>
    )
  }
}

App.childContextTypes = {
  router: PropTypes.object,
}

export default connect(
  createStructuredSelector({
    error: UISelectors.error,
    isRequesting: UISelectors.isRequesting,
    sessionIdentity: SessionSelectors.sessionIdentity,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...SessionActions }, dispatch),
  })
)(App)
