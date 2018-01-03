import React from 'react'
import { compose, withState } from 'recompose'

import { Button, Card, Image, Input, Text } from 'core/primitives'

const ClaimsService = ({
  claimDisplayText,
  claimInput,
  claimInputPlaceholder,
  claimProvider,
  onClaimsServiceRequest,
  setClaimInput,
}) => (
  <Card margin={['32px', 'auto']} maxWidth="304px">
    <Text
      color="accent"
      fontSize="18px"
      fontWeight={700}
      margin={[0, 0, '16px']}
    >
      {claimDisplayText}
    </Text>

    <Input
      display="inline-block"
      onChange={({ target: { value } }) => setClaimInput(value)}
      margin={[0, '16px', 0, 0]}
      padding={['12px', '20px']}
      placeholder={claimInputPlaceholder}
      type="text"
      value={claimInput}
    />

    <Button
      backgroundColor="primary"
      borderRadius="50%"
      borderWidth="0"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.4)"
      display="inline-flex"
      margin={[0, 'auto']}
      onClick={() => onClaimsServiceRequest(claimInput, claimProvider)}
      size={['48px']}
      style={{ verticalAlign: 'middle' }}
    >
      <Image
        backgroundSize="cover"
        src="img/icon-arrow-right.svg"
        size={['24px']}
      />
    </Button>
  </Card>
)

const enhance = compose(
  withState(
    'claimInput',
    'setClaimInput',
    ({ claimInputDefaultValue }) => claimInputDefaultValue || ''
  )
)

export default enhance(ClaimsService)
