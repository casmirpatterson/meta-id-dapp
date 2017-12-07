import React, { Component } from 'react'
import { Text } from 'jaak-primitives'
import { ThemeProvider } from 'styled-components'

import { Logo } from 'core/components'
import { Footer, Header, Image, Main, View } from 'core/primitives'
import { theme } from 'core/style'

class App extends Component {
  render() {
    const { children } = this.props

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

export default App
