import React from 'react'
import { Box, Section } from 'jaak-primitives'
import { compose, withState } from 'recompose'

import { Button, Input, Label, Text } from 'core/primitives'
import { readFileAsText } from 'core/util'

const Form = ({
  onSubmit,
  keystore,
  setKeystore,
  password,
  setPassword,
  username,
  setUsername,
}) => (
  <Section>
    <Input
      margin={[0, 'auto', '16px']}
      onChange={({ target: { value } }) => setUsername(value)}
      placeholder="Choose an 'id.meta' username"
      size={['auto', '240px']}
      type="text"
      value={username}
    />

    <Box align="center">
      <Label htmlFor="uploadKeystore" margin={[0, '16px', 0, 0]}>
        Upload Keystore
      </Label>

      <Input
        display="none"
        id="uploadKeystore"
        onChange={({ target: { files: [file] } }) =>
          readFileAsText(file).then(setKeystore)
        }
        placeholder="Upload Keystore"
        type="file"
      />

      <Input
        display="inline-block"
        onChange={({ target: { value } }) => setPassword(value)}
        placeholder="Unlock keystore"
        type="password"
        value={password}
      />
    </Box>

    <Button
      backgroundColor="primary"
      borderRadius="40px"
      borderWidth="0"
      margin={['32px', 'auto', 0]}
      padding={['16px', '24px']}
      onClick={() => onSubmit({ keystore, password, username })}
    >
      <Text color="white" cursor="pointer" fontWeight={700}>
        Create META-ID
      </Text>
    </Button>
  </Section>
)

const enhance = compose(
  withState('keystore', 'setKeystore', null),
  withState('password', 'setPassword', ''),
  withState('username', 'setUsername', '')
)

export default enhance(Form)
