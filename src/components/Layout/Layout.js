import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Scrollbars } from 'react-custom-scrollbars';
import SiteMetadata from './SiteMetadata'
import Theme from './Theme'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import CookieConsent from './CookieConsent'


/*==============================================================================
  # Styles
==============================================================================*/

const Main = styled('main')`
  
`

const Thumb = styled('div')`
  border-radius: 5px;
  background-color: ${({theme}) => theme.colors.bgContrast};
`

const Track = styled('div')`
  z-index: 100;
`

const TrackVertical = styled(Track)`
  top: 2px;
  right: 2px;
  bottom: 2px;
`

const TrackHorizontal = styled(Track)`
  right: 2px;
  left: 2px;
  bottom: 2px;
`


/*==============================================================================
  # Component
==============================================================================*/

class TemplateWrapper extends Component {
  
  componentDidMount() {
    document.scrollbar = new CustomEvent('scrollbar', { 
      detail:   "Triggers when react-component scrollbar scrolls",
      bubbles:  true
    })
  }

  handleScroll = ( values ) => {
    if ( typeof document !== 'undefined' && document.scrollbar ) {
      document.scrollbar.top = values.scrollTop
      document.scrollbar.left = values.scrollLeft
      document.dispatchEvent( document.scrollbar )
    }
  }

  render () {
    
    return (
      <Theme>
        <SiteMetadata />
        <Scrollbars
          style={{ width: '100vw', height: '100vh' }}
          onScrollFrame={this.handleScroll}
          renderTrackVertical={({...props }) => <TrackVertical {...props} />}
          renderTrackHorizontal={({...props }) => <TrackHorizontal {...props} />}
          renderThumbVertical={({...props }) => <Thumb {...props} />}
          renderThumbHorizontal={({...props }) => <Thumb {...props} />}
          autoHide={true}
          autoHideTimeout={1500}
          autoHideDuration={300}
        >
          <Header />
          <Main>
            {this.props.children}
          </Main>
          <Footer />
          <CookieConsent />
        </Scrollbars>
      </Theme>
    )
  }
} 


export default TemplateWrapper
