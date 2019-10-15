import React, { Component } from 'react'
import styled from '@emotion/styled'
import Button from '../UI/Button'
import { Link } from 'gatsby'

/*==============================================================================
  # Styles
==============================================================================*/

const Wrapper = styled('div')`
  
  --margin: 5px;

  ${({theme}) => theme.above.sm } {
    --margin: 15px;
  }

  ${({theme}) => theme.above.md } {
    --margin: 30px;
  }

  position: fixed;
  bottom: var(--margin);
  left: 50%;
  width: 100%;
  max-width: calc( 100% - var(--margin) * 2 );
  padding: 30px;
  border-radius: 5px;
  background-color: ${({theme}) => theme.colors.bg};
  text-align: center;
  opacity: 1;
  box-shadow: ${({theme}) => theme.styles.boxshadow};
  transform: translate( -50%, 0 );
  transition: all 450ms ${({theme}) => theme.easings.primary};
  z-index: 100;

  &.animate-out {
    opacity: 0;
    transform: translate( -50%, calc( 100% + var(--margin) ) );
  }
`

const Text = styled('p')`
  
  a {
    color: ${({theme}) => theme.colors.primary};
  }
`

const StyledButton = styled(Button)`
  max-width: 200px;
  margin-top: 15px;
`



/*==============================================================================
  # Component
==============================================================================*/


class CookieConsent extends Component {

  componentDidMount() {
    this.setState({
      display: true
    })
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  state = {
    animateOut: false,
    display: false
  }

  onAllow = (e) => {
    e.preventDefault()
    this.hide()
  }

  hide = () => {
    this.setState({
      animateOut: true,
    }, () => {
      let that = this
      this.timer = setTimeout(() => {
        that.setState({
          display: false
        })
      }, 450)
    })
  }

  render () {

    const { animateOut, display } = this.state

    return !display ? null : (
      <Wrapper className={animateOut ? 'animate-out' : ''}>
        <Text>Vi använder cookies för att ge dig bästa möjliga webbplatsupplevelse. Genom att använda webbplatsnamn godkänner du vår <Link to="/">integritetspolicy.</Link></Text>
        <StyledButton
          onClick={e => this.onAllow(e)}
        >
          Jag förstår
        </StyledButton>
      </Wrapper>
    )
  }
}

export default CookieConsent