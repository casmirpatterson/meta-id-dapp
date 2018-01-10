import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button as ButtonPrimitive } from 'jaak-primitives'

/**
 * @namespace StyledButton
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledButton = styled(ButtonPrimitive)`
  background-color: ${({ backgroundColor, theme }) =>
    theme[backgroundColor] || backgroundColor};
  cursor: ${({ cursor }) => cursor};
  display: ${({ display }) => display};
`

/**
 * @namespace Button
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)

/**
 * @name defaultProps
 * @memberof Button
 * @desc Primitive's default properties
 */
Button.defaultProps = {
  backgroundColor: 'none',
  cursor: 'pointer',
  display: 'block',
}

/**
 * @name propTypes
 * @memberof Button
 * @desc Primitive's prop type definitions
 */
Button.propTypes = {
  /** Background colour */
  backgroundColor: PropTypes.string,
  /** Cursor */
  cursor: PropTypes.string,
  /** Display */
  display: PropTypes.string,
}

export default Button
