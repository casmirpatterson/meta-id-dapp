import React from 'react'
import Modal from 'react-modal'
import { compose, withState } from 'recompose'

import {
  Card,
  CenteredPosition,
  PrimaryButton,
  Section,
  Span,
  Text,
  TextInput,
} from 'core/primitives'

const Setup = ({
  displayName,
  isSetupMetaIdModalOpen,
  setDisplayName,
  submitSetup,
}) => (
  <Modal
    ariaHideApp={false}
    isOpen={isSetupMetaIdModalOpen}
    style={{
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      content: {
        background: 'transparent',
        border: 'none',
      },
    }}
  >
    <CenteredPosition>
      <Text fontSize="24px" fontWeight={900} margin={[0, 0, '8px']}>
        Setting Up Your META ID
      </Text>

      <Card
        borderWidth="0"
        boxShadow="0px 4px 60px rgba(0, 0, 0, 0.4)"
        margin={[0]}
        padding={[0]}
      >
        <Section
          backgroundColor="white"
          borderBottomLeftRadius="0"
          borderBottomRightRadius="0"
          padding={['24px', '16px']}
        >
          <Text color="primary" fontWeight={700} margin={[0, 0, '16px']}>
            Choose a{' '}
            <Span color="accent" fontWeight={700}>
              Display Name
            </Span>
          </Text>

          <Text
            color="#555"
            fontSize="12px"
            fontWeight={700}
            margin={[0, 0, '16px']}
          >
            This helps other users idenitfy you on the network.
          </Text>

          <TextInput
            autoFocus
            borderTopLeftRadius="0"
            borderTopRightRadius="0"
            fontSize="14px"
            fontStyle="italic"
            onChange={({ target: { value } }) => setDisplayName(value)}
            onKeyUp={({ keyCode }) =>
              keyCode === 13 && submitSetup(displayName)
            }
            placeholder="enter a display name"
            size={['auto', '100%']}
            textAlign="center"
            value={displayName}
          />
        </Section>

        <PrimaryButton
          borderTopLeftRadius="0"
          borderTopRightRadius="0"
          fontSize="16px"
          onClick={() => submitSetup(displayName)}
          padding={['20px']}
          size={['auto', '100%']}
        >
          Submit
        </PrimaryButton>
      </Card>
    </CenteredPosition>
  </Modal>
)

const enhance = compose(withState('displayName', 'setDisplayName', ''))

export default enhance(Setup)
