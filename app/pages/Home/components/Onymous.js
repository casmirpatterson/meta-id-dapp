import React from 'react'
import { Box } from 'jaak-primitives'

import { MetaIdentity } from 'core/components'
import { Text } from 'core/primitives'
import { Claims } from './'

const Onymous = ({ address, claims, graph, onProfileImageChange }) => {
  return (
    <Box flexDirection="column" size={['100%', 'auto']}>
      <Box
        flex="0 1 auto"
        flexDirection="column"
        margin={[0, 'auto']}
        padding={['16px']}
        size={['auto', '100%']}
        style={{ maxWidth: '1280px' }}
      >
        <MetaIdentity
          address={address}
          claims={claims}
          graph={graph}
          onProfileImageChange={onProfileImageChange}
        />

        <Text
          fontSize="20px"
          fontWeight={900}
          margin={['32px', 0, '8px']}
          textTransform="uppercase"
        >
          Claims
        </Text>
      </Box>

      <Box backgroundColor="white">
        <Box
          margin={[0, 'auto']}
          padding={['32px', '16px', 0]}
          size={['auto', '100%']}
          style={{ maxWidth: '1280px' }}
        >
          <Claims claims={claims} />
        </Box>
      </Box>
    </Box>
  )
}

export default Onymous
