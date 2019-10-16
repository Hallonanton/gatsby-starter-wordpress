import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'
import styled from '@emotion/styled'
import Theme from './Theme'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import CookieConsent from './CookieConsent'
let ScrollArea = null

if ( typeof document !== 'undefined' ) {
  ScrollArea = require('react-scrollbar').default

} else {
  ScrollArea = require('react-scrollbar/dist/no-css').default

}


/*==============================================================================
  # Styles
==============================================================================*/

const Main = styled('main')`
  flex-grow: 1;
`


const containerStyle = {
  width: 8,
  background: 'transparent'
}

const scrollbarStyle = {
  width: 6,
  borderRadius: 2,
  backgroundColor: '#CCC'
}

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
      document.scrollbar.top = values.topPosition
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
        <ScrollArea
          ref={(r) => window.scrollbars = r}
          speed={1.2}
          onScroll={(values) => this.handleScroll(values)}
          horizontalContainerStyle={containerStyle}
          horizontalScrollbarStyle={scrollbarStyle}
          verticalContainerStyle={containerStyle}
          verticalScrollbarStyle={scrollbarStyle}
        >
          <Header />
          <Main>
            {this.props.children}
          </Main>
          <Footer />
          <CookieConsent />
        </ScrollArea>
      </Theme>
    )
  }
} 


export default TemplateWrapper
