import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/Layout'
import Container from '../components/UI/Container'
import { Mega } from '../components/UI/Headings'

export class ArticlePostTemplate extends Component {

  render() {

    const { title } = this.props

    return (
      <Container>
        
        <Mega>{title}</Mega>

      </Container>
    )
  }
}

const SingleArticle = ({ data }) => {

  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <ArticlePostTemplate {...frontmatter} />
    </Layout>
  )
}

export default SingleArticle

export const articleQuery = graphql`
  query ArticlePostTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`
