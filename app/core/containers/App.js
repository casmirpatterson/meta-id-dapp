import React, { Component } from 'react'
import { Position } from 'jaak-primitives'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { ThemeProvider } from 'styled-components'

import { Link, Logo } from 'core/components'
import {
  Error,
  Footer,
  Header,
  Image,
  Loader,
  Main,
  Text,
  View,
} from 'core/primitives'
import { routes } from 'core/routes'
import { theme } from 'core/style'
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
          padding={['16px']}
          size={['100%', 'auto']}
        >
          <Main>
            <Header padding={['16px']}>
              <Link to={routes.home.path}>
                <Logo maxWidth="314px" size={['58px', 'auto']} />
              </Link>

              {sessionIdentity && (
                <Text margin={['16px', '0']} textAlign="center">
                  {sessionIdentity.owner}
                </Text>
              )}

              {isRequesting && (
                <Position position="absolute" top="16px" right="16px">
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
            {sessionIdentity ? (
              <Text cursor="pointer" onClick={() => actions.logout()}>
                Logout
              </Text>
            ) : (
              <Link to={routes.login.path}>
                <Text cursor="pointer">Login</Text>
              </Link>
            )}

            <Text color="jaak" display="inline-block" fontSize="12px">
              &#60; &#47;&#62; by
            </Text>

            <Image
              backgroundSize="contain"
              display="inline-block"
              margin={[0, 0, 0, '4px']}
              size={['14px', '24px']}
              src="/img/jaak.png"
              verticalAlign="middle"
            />
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
