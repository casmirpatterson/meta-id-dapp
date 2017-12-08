import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input as InputPrimitive } from 'jaak-primitives'

/**
 * @namespace StyledInput
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledInput = styled(InputPrimitive)`
  border-color: ${({ borderColor, theme }) => theme[borderColor]};
  color: ${({ color, theme }) => theme[color]};
`

/**
 * @namespace Box
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Input = ({ children, ...props }) => (
  <StyledInput {...props}>{children}</StyledInput>
)

/**
 * @name defaultProps
 * @memberof Input
 * @desc Primitive's default properties
 */
Input.defaultProps = {
  borderColor: 'primary',
  color: 'primary',
}

/**
 * @name propTypes
 * @memberof Input
 * @desc Primitive's prop type definitions
 */
Input.propTypes = {
  /** Border colour */
  borderColor: PropTypes.string,
  /** Color */
  color: PropTypes.string,
}

export default Input
