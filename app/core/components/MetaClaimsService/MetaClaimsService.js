import React, { Fragment } from 'react'
import { compose, withState } from 'recompose'
import { Position } from 'jaak-primitives'

import {
  Anchor,
  Box,
  Image,
  PrimaryButton,
  Text,
  TextInput,
} from 'core/primitives'

const MetaClaimsService = ({
  claimInput,
  claimsService,
  onClaimsServiceRequest,
  setClaimInput,
}) => {
  const renderCTA = onClaimsServiceRequest ? (
    <Fragment>
      <TextInput
        display="inline-block"
        margin={[0, 0, '16px']}
        onChange={({ target: { value } }) => setClaimInput(value)}
        padding={['8px', '12px']}
        placeholder={claimsService.property}
        size={['auto', '100%']}
        value={claimInput}
      />

      <PrimaryButton
        fontSize="16px"
        margin={[0, 0, '16px']}
        onClick={() => onClaimsServiceRequest(claimInput)}
        padding={['8px']}
      >
        Connect
      </PrimaryButton>
    </Fragment>
  ) : (
    <PrimaryButton cursor="auto" margin={[0, 0, '16px']} padding={['8px']}>
      <Position position="relative" zIndex="0">
        <Text fontSize="16px" fontWeight={700} textTransform="uppercase">
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
  )

  return (
    <Box
      flex="none"
      flexDirection="column"
      margin={[0, '32px', 0, 0]}
      size={['auto', '180px']}
    >
      <Image
        backgroundSize="contain"
        boxShadow="0px 4px 60px rgba(0, 0, 0, 0.4)"
        margin={[0, 0, '32px', 0]}
        size={['180px', '100%']}
        src={claimsService.image}
      />

      {renderCTA}

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

const enhance = compose(
  withState(
    'claimInput',
    'setClaimInput',
    ({ claimInputDefaultValue }) => claimInputDefaultValue || ''
  )
)

export default enhance(MetaClaimsService)
