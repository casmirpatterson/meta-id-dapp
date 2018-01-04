import React from 'react'
import Modal from 'react-modal'
import { Box } from 'jaak-primitives'
import { compose, withState } from 'recompose'

import { Input } from 'core/primitives'

const Setup = ({
  displayName,
  isSetupMetaIdModalOpen,
  setDisplayName,
  submitSetup,
}) => (
  <Modal ariaHideApp={false} isOpen={isSetupMetaIdModalOpen}>
    <Box align="center" margin={['16px', 0, '48px']}>
      <Input
        onChange={({ target: { value } }) => setDisplayName(value)}
        onKeyUp={({ keyCode }) => keyCode === 13 && submitSetup(displayName)}
        placeholder="Enter a display name"
        size={['auto', '220px']}
        type="text"
        value={displayName}
      />
    </Box>
  </Modal>
)

const enhance = compose(withState('displayName', 'setDisplayName', ''))

export default enhance(Setup)
