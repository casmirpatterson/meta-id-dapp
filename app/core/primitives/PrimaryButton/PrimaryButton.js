import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../Button'

/**
 * @namespace StyledPrimaryButton
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledPrimaryButton = styled(Button)`
  background-color: ${({ backgroundColor, theme }) =>
    theme[backgroundColor] || backgroundColor};
  border-bottom-left-radius: ${({ borderRadius, borderBottomLeftRadius }) =>
    borderBottomLeftRadius || borderRadius};
  border-bottom-right-radius: ${({ borderRadius, borderBottomRightRadius }) =>
    borderBottomRightRadius || borderRadius};
  border-top-left-radius: ${({ borderRadius, borderTopLeftRadius }) =>
    borderTopLeftRadius || borderRadius};
  border-top-right-radius: ${({ borderRadius, borderTopRightRadius }) =>
    borderTopRightRadius || borderRadius};
  color: ${({ color, theme }) => theme[color] || color};
  display: ${({ display }) => display};
  font-weight: ${({ fontWeight }) => fontWeight};
`

/**
 * @namespace PrimaryButton
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const PrimaryButton = ({ children, ...props }) => (
  <StyledPrimaryButton {...props}>{children}</StyledPrimaryButton>
)

/**
 * @name defaultProps
 * @memberof PrimaryButton
 * @desc Primitive's default properties
 */
PrimaryButton.defaultProps = {
  backgroundColor: 'accent',
  borderRadius: '4px',
  borderRadiusBottomLeft: null,
  borderRadiusBottomRight: null,
  borderRadiusTopLeft: null,
  borderRadiusTopRight: null,
  borderWidth: '0px',
  color: 'white',
  display: 'block',
  fontWeight: 700,
  padding: ['12px', '24px'],
}

/**
 * @name propTypes
 * @memberof PrimaryButton
 * @desc Primitive's prop type definitions
 */
PrimaryButton.propTypes = {
  /** Border bottom left radius */
  borderBottomLeftRadius: PropTypes.string,
  /** Border bottom right radius */
  borderBottomRightRadius: PropTypes.string,
  /** Border top left radius */
  borderTopLeftRadius: PropTypes.string,
  /** Border top right radius */
  borderTopRightRadius: PropTypes.string,
  /** Display */
  display: PropTypes.string,
  /** Font weight */
  fontWeight: PropTypes.number,
}

export default PrimaryButton
