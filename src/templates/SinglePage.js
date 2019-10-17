import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Provider from '../components/Sections/Provider'
import Layout from '../components/Layout/Layout'
import PageMetadata from '../components/Layout/PageMetadata'
import Container from '../components/UI/Grid'

export class PageTemplate extends Component {

  render() {
    return (
      <Container>
        <Provider sections={this.props.sections} />
      </Container>
    )
  }
}

const SinglePage = ({ data }) => {

  const { frontmatter } = data.markdownRemark
  const metaData = frontmatter.meta

  return (
    <Layout>
      <PageMetadata {...metaData} />
      <PageTemplate {...frontmatter} />
    </Layout>
  )
}

export default SinglePage

export const pageQuery = graphql`
  query PageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      ...PageSectionsFragment
    }
  }
`
