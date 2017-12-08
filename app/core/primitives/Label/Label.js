import React from 'react'
import { margin, padding, size } from 'polished'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Label as LabelPrimitive } from 'jaak-primitives'

/**
 * @namespace StyledLabel
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledLabel = styled(LabelPrimitive)`
  ${props => margin(...props.margin)};
  ${props => padding(...props.padding)};
  ${props => size(...props.size)};
  background-color: ${({ backgroundColor, theme }) =>
    theme[backgroundColor] || backgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius};
  box-shadow: ${({ boxShadow }) => boxShadow};
  color: ${({ color }) => color};
  cursor: ${({ cursor }) => cursor};
  display: ${({ display }) => display};
`

/**
 * @namespace Box
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Label = ({ children, ...props }) => (
  <StyledLabel {...props}>{children}</StyledLabel>
)

/**
 * @name defaultProps
 * @memberof Label
 * @desc Primitive's default properties
 */
Label.defaultProps = {
  backgroundColor: 'primary',
  borderRadius: '20px',
  boxShadow: 'none',
  color: 'white',
  cursor: 'pointer',
  display: 'inline-block',
  margin: ['0'],
  padding: ['8px', '16px'],
  size: ['auto'],
}

/**
 * @name propTypes
 * @memberof Label
 * @desc Primitive's prop type definitions
 */
Label.propTypes = {
  /** Background colour */
  backgroundColor: PropTypes.string,
  /** Border radius */
  borderRadius: PropTypes.string,
  /** Box shadow */
  boxShadow: PropTypes.string,
  /** Colour */
  color: PropTypes.string,
  /** Cursor */
  cursor: PropTypes.string,
  /** Display */
  display: PropTypes.string,
  /** [Margin shorthand](https://polished.js.org/docs/#margin) */
  margin: PropTypes.array,
  /** [Padding shorthand](https://polished.js.org/docs/#padding) */
  padding: PropTypes.array,
  /** [Size shorthand](https://polished.js.org/docs/#size) */
  size: PropTypes.array,
}

export default Label
