import React from 'react'
import styled from 'styled-components'
import { Position } from 'jaak-primitives'

import { media } from 'core/style'

/**
 * @namespace StyledCenteredPosition
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledCenteredPosition = styled(Position)`
  margin-top: 128px;

  ${media.sm`
    margin-top: 0;
    position: static;
    transform: none;
    width: 100%;
  `};
`

/**
 * @namespace CenteredPosition
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const CenteredPosition = ({ children, ...props }) => (
  <StyledCenteredPosition {...props}>{children}</StyledCenteredPosition>
)

/**
 * @name defaultProps
 * @memberof CenteredPosition
 * @desc Primitive's default properties
 */
CenteredPosition.defaultProps = {
  left: '50%',
  position: 'absolute',
  size: ['auto', '380px'],
  transform: 'translate(-50%, 0)',
}

/**
 * @name propTypes
 * @memberof CenteredPosition
 * @desc Primitive's prop type definitions
 */
CenteredPosition.propTypes = {}

export default CenteredPosition
