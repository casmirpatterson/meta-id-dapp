import React from 'react'
import { margin, padding } from 'polished'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @namespace StyledCard
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledCard = styled.div`
  ${props => margin(...props.margin)};
  ${props => padding(...props.padding)};
  background-color: ${({ backgroundColor, theme }) =>
    theme[backgroundColor] || backgroundColor};
  border-color: ${({ borderColor, theme }) => theme[borderColor]};
  border-radius: ${({ borderRadius }) => borderRadius};
  border-style: ${({ borderStyle }) => borderStyle};
  border-width: ${({ borderWidth }) => borderWidth};
  box-shadow: ${({ boxShadow }) => boxShadow};
  max-width: ${({ maxWidth }) => maxWidth};
`

/**
 * @namespace Box
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Card = ({ children, ...props }) => (
  <StyledCard {...props}>{children}</StyledCard>
)

/**
 * @name defaultProps
 * @memberof Card
 * @desc Primitive's default properties
 */
Card.defaultProps = {
  backgroundColor: 'none',
  borderColor: 'primary',
  borderRadius: '4px',
  borderStyle: 'solid',
  borderWidth: '0px',
  boxShadow: '0px 4px 16px rgba(204, 204, 204, 0.5)',
  margin: ['16px'],
  maxWidth: 'initial',
  padding: ['16px'],
}

/**
 * @name propTypes
 * @memberof Card
 * @desc Primitive's prop type definitions
 */
Card.propTypes = {
  /** Background colour */
  backgroundColor: PropTypes.string,
  /** Border colour */
  borderColor: PropTypes.string,
  /** Border radius */
  borderRadius: PropTypes.string,
  /** Border style */
  borderStyle: PropTypes.string,
  /** Border width */
  borderWidth: PropTypes.string,
  /** Box shadow */
  boxShadow: PropTypes.string,
  /** [Margin shorthand](https://polished.js.org/docs/#margin) */
  margin: PropTypes.array,
  /** Maximum width */
  maxWidth: PropTypes.string,
  /** [Padding shorthand](https://polished.js.org/docs/#padding) */
  padding: PropTypes.array,
}

export default Card
