import React, { Fragment } from 'react'
import { compose, withState } from 'recompose'

import {
  Input,
  FileInputLabel,
  PrimaryButton,
  Section,
  Text,
  TextInput,
} from 'core/primitives'
import { readFileAsText } from 'core/util'

const Form = ({ onSubmit, keystore, setKeystore, password, setPassword }) => (
  <Fragment>
    <Section
      backgroundColor="white"
      borderBottomLeftRadius="0"
      borderBottomRightRadius="0"
      padding={['24px', '16px']}
    >
      <Text color="primary" fontWeight={700} margin={[0, 0, '16px']}>
        Upload an Ethereum keystore file
      </Text>

      <FileInputLabel
        borderBottomLeftRadius="0"
        borderBottomRightRadius="0"
        display="block"
        htmlFor="uploadKeystore"
      >
        Select File
      </FileInputLabel>

      <Input
        display="none"
        id="uploadKeystore"
        onChange={({ target: { files: [file] } }) =>
          readFileAsText(file).then(setKeystore)
        }
        placeholder="Upload Keystore"
        type="file"
      />

      <TextInput
        borderTopLeftRadius="0"
        borderTopRightRadius="0"
        fontSize="14px"
        onChange={({ target: { value } }) => setPassword(value)}
        placeholder="Enter Password"
        size={['auto', '100%']}
        textAlign="center"
        type="password"
        value={password}
      />
    </Section>

    <PrimaryButton
      borderTopLeftRadius="0"
      borderTopRightRadius="0"
      disabled={!keystore || !password}
      fontSize="16px"
      onClick={() => onSubmit({ keystore, password })}
      padding={['20px']}
      size={['auto', '100%']}
    >
      Log In
    </PrimaryButton>
  </Fragment>
)

const enhance = compose(
  withState('keystore', 'setKeystore', null),
  withState('password', 'setPassword', '')
)

export default enhance(Form)
