import React from 'react'
import { compose, withState } from 'recompose'

const ClaimsService = ({
  claimButtonText,
  claimInput,
  claimInputPlaceholder,
  claimProvider,
  onClaimsServiceRequest,
  setClaimInput,
}) => (
  <div>
    <input
      onChange={({ target: { value } }) => setClaimInput(value)}
      placeholder={claimInputPlaceholder}
      type="text"
      value={claimInput}
    />

    <button onClick={() => onClaimsServiceRequest(claimInput, claimProvider)}>
      {claimButtonText}
    </button>
  </div>
)

const enhance = compose(withState('claimInput', 'setClaimInput', ''))

export default enhance(ClaimsService)
