import React from 'react'
import { Position } from 'jaak-primitives'

import { Logo } from 'core/components'
import { View } from 'core/primitives'

const AppLoader = () => (
  <Position
    position="absolute"
    size={['100%']}
    style={{ pointerEvents: 'none' }}
    zIndex="999"
  >
    <View backgroundColor="primary" size={['100%']}>
      <Position
        left="50%"
        position="absolute"
        size={['auto', '100%']}
        top="50%"
        transform="translate(-50%, -50%)"
      >
        <Logo size={['28.5px', '100%']} />
      </Position>
    </View>
  </Position>
)

export default AppLoader
