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
  border-bottom-left-radius: ${({ borderRadius, borderBottomLeftRadius }) =>
    borderBottomLeftRadius || borderRadius};
  border-bottom-right-radius: ${({ borderRadius, borderBottomRightRadius }) =>
    borderBottomRightRadius || borderRadius};
  border-top-left-radius: ${({ borderRadius, borderTopLeftRadius }) =>
    borderTopLeftRadius || borderRadius};
  border-top-right-radius: ${({ borderRadius, borderTopRightRadius }) =>
    borderTopRightRadius || borderRadius};
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
  borderRadiusBottomLeft: null,
  borderRadiusBottomRight: null,
  borderRadiusTopLeft: null,
  borderRadiusTopRight: null,
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
  /** Border bottom left radius */
  borderBottomLeftRadius: PropTypes.string,
  /** Border bottom right radius */
  borderBottomRightRadius: PropTypes.string,
  /** Border top left radius */
  borderTopLeftRadius: PropTypes.string,
  /** Border top right radius */
  borderTopRightRadius: PropTypes.string,
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
