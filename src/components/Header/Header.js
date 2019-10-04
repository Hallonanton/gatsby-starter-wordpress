import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import { Media } from 'react-breakpoints'
import Container from '../UI/Container'
import MobileNav from './Mobile/MobileNav'
import DesktopNav from './Desktop/DesktopNav'

import Facebook from '../../img/social/facebook.svg'
import Twitter from '../../img/social/twitter.svg'
import Instagram from '../../img/social/instagram.svg'

/*==============================================================================
  # Styles
==============================================================================*/

const Header = styled('header')`
  --header-height: 50px;

  ${({theme}) => theme.above.md} {
    --header-height: 70px;
  }

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background-color: ${({theme}) => theme.colors.bg};
  transition: transform 450ms ${({theme}) => theme.easings.easeInOutBack};
  z-index: 99;

  &.scrolled {
    transform: translateY( calc(-1 * var(--header-height)) );
  }

  &.scrolled-back {
    //Style for when header should be visible but not at the top of the page
  }

  &::before {
    display: block;
    content: "";
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({theme}) => theme.colors.bg};
  }
`

const Placeholder = styled('div')`
  flex-shrink: 0;
  width: 100%;
  height: 50px;

  ${({theme}) => theme.above.md} {
    height: 70px;
  }
`

const StyledContainer = styled(Container)`
  height: var(--header-height);
`


/*==============================================================================
  # Component
==============================================================================*/

const isIE11 =
  typeof window !== 'undefined' &&
  !!window.MSInputMethodContext &&
  !!document.documentMode
const scrollY = isIE11 ? 'pageYOffset' : 'scrollY'

class Navbar extends Component {

  componentDidMount() {
    if ( this.state.hideOnScroll ) {
      window.addEventListener('scroll', this.handleScroll);

      this.setState(
        {
          scrollY: window[scrollY],
          prevY: window[scrollY]
        },
        () => this.handleScroll()
      )
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  state = {
    mobileMenuOpen: false,
    hideOnScroll: true,
    hideOffset: 100, //px
    scrollY: 0,
    prevY: 0,
    scrollState: 'not-scrolled',
  }

  handleScroll = e => {  
    const newPos = window[scrollY]
    const oldPos = this.state.scrollY

    let scrollState =
      newPos < this.state.hideOffset
        ? 'not-scrolled'
        : oldPos > newPos
        ? 'scrolled-back'
        : 'scrolled'

    this.setState({
      scrollY: newPos,
      prevY: oldPos,
      scrollState: scrollState,
    })
  }

  handleToggleMobileMenu = menuOpen => {
    this.setState({
      mobileMenuOpen: menuOpen
    })
  }

  render() {

    const mainLinks = [
      {
        title: 'About',
        to: '/about',
        target: false
      },
      {
        title: 'Solutions',
        to: '/',
        target: false,
        children: [
          {
            title: 'Sub Nav Item One',
            to: '/',
            target: false,
          },
          {
            title: 'Sub Nav Item Two',
            to: '/',
            target: false,
          },
          {
            title: 'Sub Nav Item Three',
            to: '/',
            target: false,
          },
          {
            title: 'Sub Nav Item Four',
            to: '/',
            target: false,
          },
          {
            title: 'Sub Nav Item Five',
            to: '/',
            target: false,
          }
        ]
      },
      {
        title: 'Resources',
        to: '/',
        target: false
      },
      {
        title: 'Pricing',
        to: '/',
        target: false
      },
      {
        title: 'Contact',
        to: '/',
        target: false
      }
    ]

    const secondaryLinks = [
      {
        title: 'Facebook',
        to: 'https://www.facebook.com/sv/',
        icon: <Facebook />,
        target: true
      },
      {
        title: 'Twitter',
        to: 'https://www.twitter.com/sv/',
        icon: <Twitter />,
        target: true
      },
      {
        title: 'Instagram',
        to: 'https://www.instagram.com/sv/',
        icon: <Instagram />,
        target: true
      }
    ]

    const {
      mobileMenuOpen
    } = this.state

    return (
      <Fragment>
        <Header className={this.state.scrollState}>
          <StyledContainer maxWidth>
            <Media>
              {({ breakpoints, currentBreakpoint }) => 
                breakpoints[currentBreakpoint] >= breakpoints.md ? (
                  
                  <DesktopNav 
                    mainLinks={mainLinks}
                    secondaryLinks={secondaryLinks}
                  />

                ) : (

                  <MobileNav 
                    mainLinks={mainLinks}
                    secondaryLinks={secondaryLinks}
                    open={mobileMenuOpen}
                    onToggleMenu={menuOpen =>
                      this.handleToggleMobileMenu(menuOpen)
                    }
                  />

                )
              }
            </Media>
          </StyledContainer>
        </Header>

        <Placeholder />
      </Fragment>
    )
  }
}

export default Navbar