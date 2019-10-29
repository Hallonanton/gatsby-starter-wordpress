import React, { Component } from 'react'
import styled from '@emotion/styled'
import TextCard, { TextCardContainer } from '../UI/TextCard'


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

class SectionTextCards extends Component {

  render () {

    let { cards } = this.props

    return Array.isArray(cards) ? (
      <Wrapper>
        <TextCardContainer>
          {cards.map((card, i) => <TextCard key={i} {...card} />)}
        </TextCardContainer>
      </Wrapper>
    ) : null
  }
}

export default SectionTextCards


