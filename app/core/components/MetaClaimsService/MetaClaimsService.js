import React from 'react'
import { Position } from 'jaak-primitives'

import { Anchor, Box, Image, PrimaryButton, Text } from 'core/primitives'

const MetaClaimsService = ({ claimsService }) => {
  return (
    <Box
      flex="none"
      flexDirection="column"
      margin={[0, '32px', 0, 0]}
      size={['auto', '180px']}
    >
      <Image
        backgroundSize="contain"
        margin={[0, 0, '32px', 0]}
        size={['180px', '100%']}
        src={claimsService.image}
      />

      <PrimaryButton cursor="auto" margin={[0, 0, '16px']} padding={['8px']}>
        <Position position="relative">
          <Text
            display="inline"
            fontSize="16px"
            fontWeight={700}
            textTransform="uppercase"
          >
            {claimsService.property}
          </Text>

          <Position position="absolute" right="0" top="-3px">
            <Image
              backgroundSize="cover"
              src="img/icon-tick.svg"
              size={['24px']}
            />
          </Position>
        </Position>
      </PrimaryButton>

      <Text color="primary" fontSize="22px" fontWeight={700}>
        {claimsService.displayName}
      </Text>

      <Anchor
        color="accent"
        href={`//${claimsService.website}`}
        target="_blank"
      >
        {claimsService.website}
      </Anchor>
    </Box>
  )
}

export default MetaClaimsService
