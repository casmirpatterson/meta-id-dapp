import React, { Component, Fragment } from 'react'
import { Box, Position } from 'jaak-primitives'
import { META_ID_USERNAME_SUFFIX } from '@meta.js/shared'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { ThemeProvider } from 'styled-components'

import { AppLoader, Fade, Link, Logo, Search } from 'core/components'
import {
  Anchor,
  Box as CustomBox,
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
import {
  actions as SessionActions,
  selectors as SessionSelectors,
} from 'domains/session'
import { actions as UIActions, selectors as UISelectors } from 'domains/ui'

class App extends Component {
  getChildContext() {
    return {
      router: this.props.router,
    }
  }

  onSubmitSearch = searchInput => {
    const { router } = this.props

    // remove META-ID suffix from search input
    const id = searchInput.replace(META_ID_USERNAME_SUFFIX, '')

    return router.push(`${routes.search.path}/${id}`)
  }

  render() {
    const {
      actions,
      children,
      error,
      isInitialLoad,
      isRequesting,
      isLoggedIn,
    } = this.props

    return (
      <ThemeProvider theme={theme}>
        <View display="flex" flexDirection="column" size={['100%', 'auto']}>
          <Fade
            duration={500}
            in={isInitialLoad && isRequesting}
            onExited={() => actions.update({ isInitialLoad: false })}
          >
            <AppLoader />
          </Fade>

          <Main>
            <Header
              maxWidth="1280px"
              margin={[0, 'auto']}
              padding={['32px', '16px', '16px']}
            >
              <Box>
                <CustomBox align="middle" margin={[0, 0, '32px']}>
                  <Link to={routes.home.path}>
                    <Logo maxWidth="157px" size={['29px', '157px']} />
                  </Link>

                  {isLoggedIn && (
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
                </CustomBox>

                <CustomBox align="middle" margin={[0, 0, '32px']}>
                  <Box margin={[0, '16px', 0, 0]}>
                    <Search submitSearch={this.onSubmitSearch} />
                  </Box>

                  <Box flex="none" size={['auto', '100px']}>
                    {isLoggedIn ? (
                      <PrimaryButton onClick={() => actions.logout()}>
                        Logout
                      </PrimaryButton>
                    ) : (
                      <Link to={routes.login.path}>
                        <PrimaryButton>Log In</PrimaryButton>
                      </Link>
                    )}
                  </Box>
                </CustomBox>
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
    isInitialLoad: UISelectors.isInitialLoad,
    isRequesting: UISelectors.isRequesting,
    isLoggedIn: SessionSelectors.isLoggedIn,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...SessionActions, ...UIActions }, dispatch),
  })
)(App)
