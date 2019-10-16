import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'
import styled from '@emotion/styled'
import { Scrollbars } from 'react-custom-scrollbars';
import Theme from './Theme'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import CookieConsent from './CookieConsent'


/*==============================================================================
  # Styles
==============================================================================*/

const Main = styled('main')`
  flex-grow: 1;
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
        <Helmet>
          <html lang="sv" />
          <title></title>
          <meta name="description" content="" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${withPrefix('/')}img/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`${withPrefix('/')}img/favicon-32x32.png`}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${withPrefix('/')}img/favicon-16x16.png`}
            sizes="16x16"
          />
          <link
            rel="mask-icon"
            href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
            color="#ff4400"
          />

          <meta name="theme-color" content="#fff" />
          <meta property="og:type" content="business.business" />
          <meta property="og:title" content="" />
          <meta property="og:url" content="/" />
          <meta property="og:image" content={`${withPrefix('/')}img/og-image.jpg`} />

        </Helmet>
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
