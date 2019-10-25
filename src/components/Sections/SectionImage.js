import React, { Component } from 'react'
import styled from '@emotion/styled'
import Img from "gatsby-image"

/*==============================================================================
  # Styles
==============================================================================*/

const Wrapper = styled('div')`
  width: 100%;
  padding: 50px 0px;
  text-align: center;
`


/*==============================================================================
  # Component
==============================================================================*/

class SectionImage extends Component {

  render () {

    let { image } = this.props

    return image && image.localfile && image.localfile.childImageSharp ? (
      <Wrapper>
        <Img 
          fluid={image.localfile.childImageSharp.fluid}
          style={{
            position: 'relative',
            width: '100%',
            height: '550px',
          }}
        />
      </Wrapper>
    ) : null
  }
}

export default SectionImage


