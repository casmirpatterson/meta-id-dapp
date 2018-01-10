import React from 'react'
import { Box } from 'jaak-primitives'

import { MetaIdentity } from 'core/components'
import { Text } from 'core/primitives'

const Onymous = ({ identity }) => {
  return (
    <Box flexDirection="column" size={['100%', 'auto']}>
      <Box flex="0 1 auto" flexDirection="column" padding={['16px']}>
        <MetaIdentity identity={identity} />

        <Text
          fontSize="20px"
          fontWeight={900}
          margin={['32px', 0, '8px']}
          textTransform="uppercase"
        >
          Claims
        </Text>
      </Box>

      <Box backgroundColor="white">Claims go here</Box>
    </Box>
  )
}

export default Onymous
