import React, { Fragment } from 'react'

import { META_ID_USERNAME_SUFFIX } from 'core/constants'
import { Box, Span, TextInput } from 'core/primitives'

const MetaIdInput = ({ onChange }) => (
  <Fragment>
    <Box
      align="center"
      borderColor="grey"
      borderRadius="4px"
      borderStyle="solid"
      borderWidth="1px"
      padding={['12px', '16px']}
      size={['auto', '100%']}
    >
      <TextInput
        display="inline"
        onChange={({ target: { value } }) => onChange(value)}
        padding={[0]}
        placeholder="username"
        size={['auto', '85px']}
        textAlign="right"
        borderWidth="0px"
      />
      <Span color="primary" fontWeight={700}>
        .{META_ID_USERNAME_SUFFIX}
      </Span>
    </Box>
  </Fragment>
)

export default MetaIdInput
