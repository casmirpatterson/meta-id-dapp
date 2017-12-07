import React, { Component } from 'react'
import { Text } from 'jaak-primitives'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ThemeProvider } from 'styled-components'

import { Logo } from 'core/components'
import {
  Footer,
  Header,
  Image,
  Main,
  Text as CustomText,
  View,
} from 'core/primitives'
import { theme } from 'core/style'
import { selectors as SessionSelectors } from 'domains/session'

class App extends Component {
  render() {
    const { children, sessionIdentity } = this.props

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
              <Logo maxWidth="314px" size={['58px', 'auto']} />

              {sessionIdentity && (
                <CustomText>{sessionIdentity.owner}</CustomText>
              )}
            </Header>

            {children}
          </Main>

          <Footer>
            <Text display="inline-block" fontSize="12px">
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

export default connect(
  createStructuredSelector({
    sessionIdentity: SessionSelectors.sessionIdentity,
  })
)(App)
