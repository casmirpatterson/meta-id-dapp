import React from 'react'
import { margin, padding } from 'polished'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @namespace StyledError
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledError = styled.div`
  ${props => margin(...props.margin)};
  ${props => padding(...props.padding)};
  border-color: ${({ borderColor, theme }) => theme[borderColor]};
  border-radius: ${({ borderRadius }) => borderRadius};
  border-style: ${({ borderStyle }) => borderStyle};
  border-width: ${({ borderWidth }) => borderWidth};
`

/**
 * @namespace Box
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Error = ({ children, ...props }) => (
  <StyledError {...props}>{children}</StyledError>
)

/**
 * @name defaultProps
 * @memberof Error
 * @desc Primitive's default properties
 */
Error.defaultProps = {
  borderColor: 'error',
  borderRadius: '4px',
  borderStyle: 'dotted',
  borderWidth: '2px',
  margin: ['16px'],
  padding: ['16px'],
}

/**
 * @name propTypes
 * @memberof Error
 * @desc Primitive's prop type definitions
 */
Error.propTypes = {
  /** Border colour */
  borderColor: PropTypes.string,
  /** Border radius */
  borderRadius: PropTypes.string,
  /** Border style */
  borderStyle: PropTypes.string,
  /** Border width */
  borderWidth: PropTypes.string,
  /** [Margin shorthand](https://polished.js.org/docs/#margin) */
  margin: PropTypes.array,
  /** [Padding shorthand](https://polished.js.org/docs/#padding) */
  padding: PropTypes.array,
}

export default Error
