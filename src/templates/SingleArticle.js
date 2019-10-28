import React, { Component, Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import Layout from '../components/Layout/Layout'
import PageMetadata from '../components/Layout/PageMetadata'
import Container from '../components/UI/Grid'
import { Mega, Heading } from '../components/UI/Headings'
import Divider from '../components/UI/Divider'
import Text from '../components/UI/Text'
import ArticleCard, { ArticleCardContainer } from '../components/UI/ArticleCard'


/*==============================================================================
  # Styles
==============================================================================*/

const StyledContainer = styled(Container)`
  margin-top: 15px;
  align-items: center;
`

const CategoryList = styled('div')`
  margin-bottom: 5px;

  a {
    ${({theme}) => theme.styles.linkEase}
  }
`

const Date = styled('span')`
  margin-top: 5px;
  color: ${({theme}) => theme.colors.bgContrast};
  ${({theme}) => theme.fontSizes.description}
`

const StyledText = styled(Text)`
  margin: 40px 0px;
`

const Wrapper = styled('div')`
  width: 100%;
  text-align: center;
`


/*==============================================================================
  # Components
==============================================================================*/

export class ArticlePostTemplate extends Component {

  render() {

    const { title, date, cpt_categories } = this.props
    const { description, featured_image, content } = this.props.acf

    return (
      <StyledContainer>
        
        <CategoryList>
          {cpt_categories.filter(item => item.taxonomy === 'article_category').map((category, i) => (
            <Fragment key={i}>
              {i ? (', ') : null}
              <Link to={category.link}>{category.name}</Link>
            </Fragment>
          ))}
        </CategoryList>

        <Mega>{title}</Mega>

        <Date>{date}</Date>

        <StyledText small content={description} />

        {featured_image && featured_image.localFile &&
          <Img 
            fluid={featured_image.localFile.childImageSharp.fluid}
            alt={title}
            style={{
              position: 'relative',
              width: '100%',
              height: '550px',
            }}
          />
        }

        <StyledText replace={false} content={content} />

      </StyledContainer>
    )
  }
}

const SingleArticle = ({ data }) => {

  let article = data.wordpressWpArticle
  const posts = data.allWordpressWpArticle.edges
  let metaData = article.yoast_meta

  if ( !metaData || (metaData && !metaData.meta_title) ) {
    if ( !metaData ) {
      metaData = {}
    }
    if ( !metaData.meta_title ) {
      metaData.meta_title = article.title
    }
    if ( !metaData.meta_description ) {
      metaData.meta_description = article.acf.description
    }
  }

  return (
    <Layout>
      <PageMetadata {...metaData} />

      <ArticlePostTemplate {...article} />

      <StyledContainer>

        <Divider mt={'25px'} mb={'60px'} />

        {posts && posts.length > 0 ? (
          <Wrapper>

            <Heading>Liknande artiklar</Heading>

            <ArticleCardContainer>
              {posts.map((post, i) => (
                <ArticleCard key={i} post={post.node} />
              ))}
            </ArticleCardContainer>

          </Wrapper>
        ) : null}

      </StyledContainer>
    </Layout>
  )
}

export default SingleArticle

export const articleQuery = graphql`
  query ArticlePostTemplate($id: String!, $category: [Int]) {
    wordpressWpArticle(id: {eq: $id}) {
      ...ArticlePageFragment
    }
    allWordpressWpArticle(
      limit: 3
      filter: {
        id: { ne: $id }
        article_category: {in: $category }
      }
    ) {
      edges {
        node {
          ...ArticleCardFragment
        }
      }
    }
  }
`
