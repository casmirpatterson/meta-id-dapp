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
  border-color: ${({ borderColor, theme }) =>
    theme[borderColor] || borderColor};
  border-radius: ${({ borderRadius }) => borderRadius};
  border-style: ${({ borderStyle }) => borderStyle};
  border-width: ${({ borderWidth }) => borderWidth};
  color: ${({ color, theme }) => theme[color] || color};
  cursor: ${({ cursor }) => cursor};
  font-style: ${({ fontStyle }) => fontStyle};
  max-width: ${({ maxWidth }) => maxWidth};
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
  borderColor: 'primary',
  borderRadius: '0',
  borderStyle: 'solid',
  borderWidth: '0',
  color: 'white',
  cursor: 'auto',
  fontStyle: 'normal',
  maxWidth: 'initial',
}

/**
 * @name propTypes
 * @memberof Text
 * @desc Primitive's prop type definitions
 */
Text.propTypes = {
  /** Border colour */
  borderColor: PropTypes.string,
  /** Border radius */
  borderRadius: PropTypes.string,
  /** Border style */
  borderStyle: PropTypes.string,
  /** Border width */
  borderWidth: PropTypes.string,
  /** Color */
  color: PropTypes.string,
  /** Cursor */
  cursor: PropTypes.string,
  /** Font style */
  fontStyle: PropTypes.string,
  /** Maximum width */
  maxWidth: PropTypes.string,
}

export default Text
