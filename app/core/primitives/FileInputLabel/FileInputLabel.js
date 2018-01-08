import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Label from '../Label'

/**
 * @namespace StyledFileInputLabel
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledFileInputLabel = styled(Label)`
  border-bottom-left-radius: ${({ borderRadius, borderBottomLeftRadius }) =>
    borderBottomLeftRadius || borderRadius};
  border-bottom-right-radius: ${({ borderRadius, borderBottomRightRadius }) =>
    borderBottomRightRadius || borderRadius};
  border-top-left-radius: ${({ borderRadius, borderTopLeftRadius }) =>
    borderTopLeftRadius || borderRadius};
  border-top-right-radius: ${({ borderRadius, borderTopRightRadius }) =>
    borderTopRightRadius || borderRadius};
`

/**
 * @namespace FileInputLabel
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const FileInputLabel = ({ children, ...props }) => (
  <StyledFileInputLabel {...props}>{children}</StyledFileInputLabel>
)

/**
 * @name defaultProps
 * @memberof FileInputLabel
 * @desc Primitive's default properties
 */
FileInputLabel.defaultProps = {
  backgroundColor: 'accent',
  borderRadius: '4px',
  borderRadiusBottomLeft: null,
  borderRadiusBottomRight: null,
  borderRadiusTopLeft: null,
  borderRadiusTopRight: null,
  color: 'white',
  fontWeight: 700,
  padding: ['12px', '24px'],
}

/**
 * @name propTypes
 * @memberof FileInputLabel
 * @desc Primitive's prop type definitions
 */
FileInputLabel.propTypes = {
  /** Border bottom left radius */
  borderBottomLeftRadius: PropTypes.string,
  /** Border bottom right radius */
  borderBottomRightRadius: PropTypes.string,
  /** Border top left radius */
  borderTopLeftRadius: PropTypes.string,
  /** Border top right radius */
  borderTopRightRadius: PropTypes.string,
}

export default FileInputLabel
