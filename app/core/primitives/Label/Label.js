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
  color: ${({ color, theme }) => theme[color] || color};
  cursor: ${({ cursor }) => cursor};
  display: ${({ display }) => display};
  font-weight: ${({ fontWeight }) => fontWeight};
`

/**
 * @namespace Label
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
  backgroundColor: 'none',
  borderRadius: '0px',
  color: 'inherit',
  cursor: 'pointer',
  display: 'inline-block',
  fontWeight: 300,
  margin: ['0'],
  padding: ['0'],
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
  /** Colour */
  color: PropTypes.string,
  /** Cursor */
  cursor: PropTypes.string,
  /** Display */
  display: PropTypes.string,
  /** Font weight */
  fontWeight: PropTypes.number,
  /** [Margin shorthand](https://polished.js.org/docs/#margin) */
  margin: PropTypes.array,
  /** [Padding shorthand](https://polished.js.org/docs/#padding) */
  padding: PropTypes.array,
  /** [Size shorthand](https://polished.js.org/docs/#size) */
  size: PropTypes.array,
}

export default Label
