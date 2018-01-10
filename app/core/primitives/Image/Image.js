import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Image as ImagePrimitive } from 'jaak-primitives'

/**
 * @namespace StyledImage
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledImage = styled(ImagePrimitive)`
  display: ${({ display }) => display};
  max-width: ${({ maxWidth }) => maxWidth};
  min-height: ${({ minHeight }) => minHeight};
  vertical-align: ${({ verticalAlign }) => verticalAlign};
`

/**
 * @namespace Box
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Image = ({ children, ...props }) => (
  <StyledImage {...props}>{children}</StyledImage>
)

/**
 * @name defaultProps
 * @memberof Image
 * @desc Primitive's default properties
 */
Image.defaultProps = {
  display: 'block',
  maxWidth: 'initial',
  minHeight: 'auto',
  verticalAlign: 'baseline',
}

/**
 * @name propTypes
 * @memberof Image
 * @desc Primitive's prop type definitions
 */
Image.propTypes = {
  /** Display */
  display: PropTypes.string,
  /** Maximum width */
  maxWidth: PropTypes.string,
  /** Minimum height */
  minHeight: PropTypes.string,
  /** Vertical alignment */
  verticalAlign: PropTypes.string,
}

export default Image
