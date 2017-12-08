import React, { Component } from 'react'

import { Link } from 'core/components'
import { Button, Image, Text, View } from 'core/primitives'
import { routes } from 'core/routes'
import * as Components from './components'

class Home extends Component {
  render() {
    return (
      <View>
        <Components.Search />

        <Link to={routes.register.path}>
          <Button
            backgroundColor="primary"
            borderRadius="50%"
            borderWidth="0"
            boxShadow="0px 4px 12px rgba(0, 0, 0, 0.4)"
            display="flex"
            margin={[0, 'auto']}
            size={['48px']}
          >
            <Image
              backgroundSize="cover"
              size={['24px']}
              src="/img/icon-add.svg"
            />
          </Button>

          <Text
            fontSize="18px"
            fontWeight={700}
            margin={['16px', 0, 0]}
            textAlign="center"
          >
            Create META-ID
          </Text>
        </Link>
      </View>
    )
  }
}

export default Home
