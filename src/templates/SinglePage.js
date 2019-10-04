import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Provider from '../components/Sections/Provider'
import Layout from '../components/Layout/Layout'
import Container from '../components/UI/Container'
import { Mega } from '../components/UI/Headings'

export class PageTemplate extends Component {

  render() {

    const { title, sections } = this.props

    return (
      <Container>
        
        <Mega>{title}</Mega>

        <Provider sections={sections} />

      </Container>
    )
  }
}

const SinglePage = ({ data }) => {

  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <PageTemplate {...frontmatter} />
    </Layout>
  )
}

export default SinglePage

export const pageQuery = graphql`
  query PageTemplate {
    markdownRemark(frontmatter: {templateKey: {eq: "SinglePage"}}) {
    frontmatter {
      title
      sections {
        sectionKey
        title
        number
        image {
          name
        }
      }
    }
  }
  }
`
