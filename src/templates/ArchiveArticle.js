import React, { Component, Fragment } from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import Layout from '../components/Layout/Layout'
import PageMetadata from '../components/Layout/PageMetadata'
import Container from '../components/UI/Grid'
import Searchbar from '../components/UI/Searchbar'
import Button from '../components/UI/Button'
import { Mega, SmallHeading } from '../components/UI/Headings'
import ArticleCard, { ArticleCardContainer } from '../components/UI/ArticleCard'

/*==============================================================================
  # Styles
==============================================================================*/

const Title = styled(Mega)`
  margin-top: 15px;
`

const NoResult = styled(SmallHeading)`
  margin-top: 45px;
`

const LoadMore = styled(Button)`
  max-width: 200px;
  margin: 0 auto;
  opacity: 0;
  visibility: hidden;
  transform: transalteY(50px) scale(0);
  transition: all 250ms ${({theme}) => theme.easings.secondary},
              transform 800ms ${({theme}) => theme.easings.primary},
              opacity 800ms ${({theme}) => theme.easings.primary};

  &.has-more {
    opacity: 1;
    visibility: visible;
    transform: transalteY(20px) scale(1);
    transition: all 250ms ${({theme}) => theme.easings.secondary},
              transform 250ms ${({theme}) => theme.easings.primary},
              opacity 250ms ${({theme}) => theme.easings.primary};
  }
`


/*==============================================================================
  # Components
==============================================================================*/

export class ArchiveTemplate extends Component {

  state = {
    search: '',
    perPage: 12,
    offset: 0,
  }

  onSearch = search => {
    this.setState({
      search: search,
      offset: 0
    })
  }

  loadMore = () => {
    const { offset, perPage } = this.state
    this.setState({
      offset: offset + perPage
    })
  }

  filterPosts = (posts) => {
    
    let { search } = this.state

    if ( !posts || !search ){
      return posts
    }


    return posts.filter(node => {

      let { node: post } = node

      if ( search ) {

        let { title } = post
        let { description, content } = post.acf

        search = search.toLowerCase()
        title = title && title.toLowerCase()
        content = content && content.toLowerCase()
        description = description && description.toLowerCase()

        if ( title ) {
          if ( title.includes(search) ) {
            return true
          }
        }

        if ( content ) {
          if ( content.includes(search)) {
            return true
          }
        }

        if ( description ) {
          if ( description.includes(search) ) {
            return true
          }
        }

        return false
      }

      return false
    })
  }

  render() {

    let { title, posts } = this.props
    const { offset, perPage } = this.state

    posts = this.filterPosts(posts)

    return (
      <Container>
        
        <Title>{title}</Title>

        <Searchbar onSearch={search => this.onSearch(search)} />

        {posts && posts.length > 0 ? (
          <Fragment>

            <ArticleCardContainer>
              {posts.filter((post, i) => i < (offset+perPage) ).map((post, i) => (
                <ArticleCard key={i} post={post.node} />
              ))}
            </ArticleCardContainer>

            <LoadMore
              secondary
              className={(posts.length > (offset + perPage)) ? 'has-more' : null} 
              onClick={() => this.loadMore()}
            >
              Visa fler
            </LoadMore>

          </Fragment>
        ) : (
          <NoResult>Inga artiklar hittades</NoResult>
        )}
        
      </Container>
    )
  }
}

const ArchiveCategory = ({ data, pageContext }) => {

  const posts = data.allWordpressWpArticle.edges
  const title = `Artiklar i kategorin ${pageContext.categoryName}`
  let metaData = {
    meta_title: pageContext.categoryName
  }

  return (
    <Layout>
      <PageMetadata {...metaData} />
      <ArchiveTemplate 
        title={title}
        posts={posts}
      />
    </Layout>
  )
}

export default ArchiveCategory


/*==============================================================================
  # Query
==============================================================================*/

export const categoryQuery = graphql`
  query CategoryTemplate($category: [Int]) {
    allWordpressWpArticle(
      filter: { 
        article_category: { in: $category }
      }
      sort: {
        fields: [date, title]
        order: [DESC, ASC]
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
