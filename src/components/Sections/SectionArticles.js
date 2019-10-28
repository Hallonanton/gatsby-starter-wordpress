import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Mega, SmallHeading } from '../UI/Headings'
import ArticleCard, { ArticleCardContainer } from '../UI/ArticleCard'


/*==============================================================================
  # Styles
==============================================================================*/

const Wrapper = styled('div')`
  width: 100%;
  padding: 50px 0px;
  text-align: center;
`

const StyledArticleCardContainer = styled(ArticleCardContainer)`
  ${({theme}) => theme.above.lg} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`


const NoResult = styled(SmallHeading)`
  margin-top: 45px;
`

/*==============================================================================
  # Component
==============================================================================*/

class SectionArticles extends Component {

  render () {

    let { isH1, title, articles } = this.props

    return (
      <Wrapper>
        <Mega size={isH1 ? "h1" : "h2"}>{title}</Mega>

        {articles && articles.length > 0 ? (
          <StyledArticleCardContainer>
          {articles.map((post, i) => (
            <ArticleCard key={i} post={post.article[0]} />
          ))}
          </StyledArticleCardContainer>
        ) : (
          <NoResult>Inga artiklar hittades</NoResult>
        )}

      </Wrapper>
    )
  }
}

export default SectionArticles


