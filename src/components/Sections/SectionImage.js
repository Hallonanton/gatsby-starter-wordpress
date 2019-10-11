import React, { Component } from 'react'
import styled from '@emotion/styled'
import Img from "gatsby-image"

/*==============================================================================
  # Styles
==============================================================================*/

const Wrapper = styled('div')`
  width: 100%;
  padding: 30px 0px;
  text-align: center;
`


/*==============================================================================
  # Component
==============================================================================*/

class SectionImage extends Component {

  render () {

    let { imageFull } = this.props

    return (
      <Wrapper>
        <Img 
          fluid={imageFull.childImageSharp.fluid}
          style={{
            position: 'relative',
            width: '100%',
            height: '550px',
          }}
        />
      </Wrapper>
    )
  }
}

export default SectionImage


