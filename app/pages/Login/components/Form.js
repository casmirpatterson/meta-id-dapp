import React, { Fragment } from 'react'
import { compose, withState } from 'recompose'

import { FILE_INPUT_LABEL_DEFAULT } from 'core/constants'
import {
  Input,
  FileInputLabel,
  PrimaryButton,
  Section,
  Text,
  TextInput,
} from 'core/primitives'
import { readFileAsText } from 'core/util'

const Form = ({
  filename,
  keystore,
  onSubmit,
  password,
  setFilename,
  setKeystore,
  setPassword,
}) => {
  const onFileUpload = file => {
    return readFileAsText(file)
      .then(setKeystore)
      .then(() => setFilename(file.name))
  }

  return (
    <Fragment>
      <Section
        backgroundColor="white"
        borderBottomLeftRadius="0"
        borderBottomRightRadius="0"
        padding={['24px', '16px']}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault()

          const [file] = e.dataTransfer.files

          if (file) return onFileUpload(file)
        }}
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
          {filename}
        </FileInputLabel>

        <Input
          display="none"
          id="uploadKeystore"
          onChange={({ target: { files: [file] } }) => {
            if (!file) return setFilename(FILE_INPUT_LABEL_DEFAULT)

            return onFileUpload(file)
          }}
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
}

const enhance = compose(
  withState('filename', 'setFilename', FILE_INPUT_LABEL_DEFAULT),
  withState('keystore', 'setKeystore', null),
  withState('password', 'setPassword', '')
)

export default enhance(Form)
