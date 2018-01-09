import React from 'react'
import PropTypes from 'prop-types'
import { placeholder } from 'polished'
import styled from 'styled-components'

import Input from '../Input'

/**
 * @namespace StyledTextInput
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledTextInput = styled(Input)`
  ${({ placeholderColor, theme }) =>
    placeholder({ color: theme[placeholderColor] || placeholderColor })};
  border-color: ${({ borderColor, theme }) =>
    theme[borderColor] || borderColor};
  color: ${({ color, theme }) => theme[color] || color};
  font-family: ${({ fontFamily }) => fontFamily};
  text-align: ${({ textAlign }) => textAlign};
`

/**
 * @namespace TextInput
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const TextInput = ({ children, ...props }) => (
  <StyledTextInput {...props}>{children}</StyledTextInput>
)

/**
 * @name defaultProps
 * @memberof TextInput
 * @desc Primitive's default properties
 */
TextInput.defaultProps = {
  borderColor: 'grey',
  borderRadius: '4px',
  color: 'primary',
  fontFamily: 'inherit',
  fontWeight: 700,
  padding: ['12px', '16px'],
  placeholderColor: 'grey',
  textAlign: 'left',
}

/**
 * @name propTypes
 * @memberof TextInput
 * @desc Primitive's prop type definitions
 */
TextInput.propTypes = {
  /** Border colour */
  borderColor: PropTypes.string,
  /** Color */
  color: PropTypes.string,
  /** Font family */
  fontFamily: PropTypes.string,
  /** Placeholder colour */
  placeholderColor: PropTypes.string,
  /** Text align */
  textAlign: PropTypes.string,
}

export default TextInput
