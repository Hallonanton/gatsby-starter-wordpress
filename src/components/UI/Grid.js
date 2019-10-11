import React from 'react'
import styled from '@emotion/styled'

/*==============================================================================
  # Styles
==============================================================================*/

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  margin: 0 auto;
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  max-width: ${({ maxWidth }) =>
    maxWidth ? (maxWidth === 'small' ? '1400px' : '1720px') : 'none'};
  margin-top: ${({ theme, marginTop }) =>
    typeof theme.margin[marginTop] !== 'undefined'
      ? theme.margin[marginTop]
      : '0px'};
  padding-left: ${({ fullWidth }) => (fullWidth ? '0px' : '10px')};
  padding-right: ${({ fullWidth }) => (fullWidth ? '0px' : '10px')};

  ${({ theme }) => theme.above.sm} {
    padding-left: ${({ fullWidth }) => (fullWidth ? '0px' : '15px')};
    padding-right: ${({ fullWidth }) => (fullWidth ? '0px' : '15px')};
  }

  ${({ theme }) => theme.above.lg} {
    padding-left: ${({ fullWidth }) => (fullWidth ? '0px' : '60px')};
    padding-right: ${({ fullWidth }) => (fullWidth ? '0px' : '60px')};
  }

  ${({ theme }) => theme.above.xl} {
    padding-left: ${({ fullWidth }) => (fullWidth ? '0px' : '110px')};
    padding-right: ${({ fullWidth }) => (fullWidth ? '0px' : '110px')};
  }
`;

/*==============================================================================
  # Components
==============================================================================*/

const Container = ({ children, ...rest }) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

export default Container;
