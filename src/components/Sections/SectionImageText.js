import React, { Component } from 'react'
import styled from '@emotion/styled'
import Img from "gatsby-image"
import { Mega } from '../UI/Headings'
import Text from '../UI/Text'
import Container, { Row, Col } from '../UI/Grid'

/*==============================================================================
  # Styles
==============================================================================*/

const StyledContainer = styled(Container)`
  padding-top: 50px;
  padding-bottom: 50px;
  text-align: center;
`

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  flex-direction: column;

  ${({theme}) => theme.above.md} {
    order: ${({order}) => order};
  }
`

const StyledText = styled(Text)`
  margin: 30px auto 0px;
`


/*==============================================================================
  # Component
==============================================================================*/

class SectionImageText extends Component {

  render () {

    let { isH1, title, text, image_alignment, image } = this.props

    return (
      <StyledContainer>
          
          <Row>
            <StyledCol col={12} md={6} order={image_alignment === 'left' ? 1 : 2}>
              {image && image.localFile && image.localFile.childImageSharp &&
                <Img 
                  fluid={image.localFile.childImageSharp.fluid}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '550px',
                  }}
                />
              }
            </StyledCol>
            <StyledCol col={12} md={6} order={image_alignment === 'right' ? 1 : 2}>
              <Mega size={isH1 ? "h1" : "h2"}>{title}</Mega>
              <StyledText content={text} small />
            </StyledCol>
          </Row> 


      </StyledContainer>
    )
  }
}

export default SectionImageText


