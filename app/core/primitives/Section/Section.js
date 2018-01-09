import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Section as SectionPrimitive } from 'jaak-primitives'

/**
 * @namespace StyledSection
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledSection = styled(SectionPrimitive)`
  background-color: ${({ backgroundColor, theme }) =>
    theme[backgroundColor] || backgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius};
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
 * @namespace Section
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Section = ({ children, ...props }) => (
  <StyledSection {...props}>{children}</StyledSection>
)

/**
 * @name defaultProps
 * @memberof Section
 * @desc Primitive's default properties
 */
Section.defaultProps = {
  backgroundColor: 'none',
  borderRadius: '4px',
  borderRadiusBottomLeft: null,
  borderRadiusBottomRight: null,
  borderRadiusTopLeft: null,
  borderRadiusTopRight: null,
}

/**
 * @name propTypes
 * @memberof Section
 * @desc Primitive's prop type definitions
 */
Section.propTypes = {
  /** Background color */
  backgroundColor: PropTypes.string,
  /** Border radius */
  borderRadius: PropTypes.string,
  /** Border bottom left radius */
  borderBottomLeftRadius: PropTypes.string,
  /** Border bottom right radius */
  borderBottomRightRadius: PropTypes.string,
  /** Border top left radius */
  borderTopLeftRadius: PropTypes.string,
  /** Border top right radius */
  borderTopRightRadius: PropTypes.string,
}

export default Section
