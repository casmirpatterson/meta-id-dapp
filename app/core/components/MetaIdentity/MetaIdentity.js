import React from 'react'
import { Box } from 'jaak-primitives'

import { MetaIdDisplay } from 'core/components'
import { PROFILE_IMAGE_DEFAULT } from 'core/constants'
import { Image, Text } from 'core/primitives'
import { metaId, toCapitalised } from 'core/util'

const MetaIdentity = ({ identity }) => {
  // TODO - move profile claim selector to a memoized function
  const profile = metaId.getProfileClaimsKeyedBySubProperty(
    metaId.getProfileClaimsFromMetaIdentityClaims(
      Object.values(identity.claims)
    )
  )

  return (
    <Box>
      <Box flex="none" margin={[0, '32px', 0, 0]} size={['auto', '130px']}>
        <Image
          backgroundSize="cover"
          borderRadius="11px"
          size={['130px', '130px']}
          src={(profile.image && profile.image.claim) || PROFILE_IMAGE_DEFAULT}
        />
      </Box>

      <Box align="right" flexDirection="column">
        <Text fontSize="32px" fontWeight={700}>
          {toCapitalised(profile.name.claim)}
        </Text>

        <Text fontSize="16px" fontWeight={700} margin={[0, 0, '8px']}>
          <MetaIdDisplay username={identity.username} />
        </Text>

        <Text
          borderColor="accent"
          borderRadius="4px"
          borderWidth="1px"
          fontWeight={700}
          padding={['8px']}
          size={['auto', 'max-content']}
        >
          {identity.owner}
        </Text>
      </Box>
    </Box>
  )
}

export default MetaIdentity
