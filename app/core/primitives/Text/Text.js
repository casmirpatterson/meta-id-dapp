import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text as TextPrimitive } from 'jaak-primitives'

/**
 * @namespace StyledText
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledText = styled(TextPrimitive)`
  color: ${({ color, theme }) => theme[color]};
`

/**
 * @namespace Box
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Text = ({ children, ...props }) => (
  <StyledText {...props}>{children}</StyledText>
)

/**
 * @name defaultProps
 * @memberof Text
 * @desc Primitive's default properties
 */
Text.defaultProps = {
  color: 'primary',
}

/**
 * @name propTypes
 * @memberof Text
 * @desc Primitive's prop type definitions
 */
Text.propTypes = {
  /** Display */
  color: PropTypes.string,
}

export default Text