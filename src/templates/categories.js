import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/Layout'

class CategoryRoute extends Component {

  render() {

    return (
      <Layout>
        KategoriTemplate
      </Layout>
    )
  }
}

export default CategoryRoute

export const categoryPageQuery = graphql`
  query CategoryPage($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
