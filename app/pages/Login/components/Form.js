import React from 'react'
import { Box, Section } from 'jaak-primitives'
import { compose, withState } from 'recompose'

import { Button, Input, Label, Text } from 'core/primitives'
import { readFileAsText } from 'core/util'

const Form = ({ onSubmit, keystore, setKeystore, password, setPassword }) => (
  <Section>
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
      margin={['32px', 'auto']}
      onClick={() => onSubmit({ keystore, password })}
      padding={['16px', '24px']}
    >
      <Text color="white" fontWeight={700}>
        Login
      </Text>
    </Button>
  </Section>
)

const enhance = compose(
  withState('keystore', 'setKeystore', null),
  withState('password', 'setPassword', '')
)

export default enhance(Form)
