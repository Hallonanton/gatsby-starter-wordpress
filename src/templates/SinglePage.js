import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Provider, { PrepareProvider } from '../components/Sections/Provider'
import Layout from '../components/Layout/Layout'
import PageMetadata from '../components/Layout/PageMetadata'
import Container from '../components/UI/Grid'

export class PageTemplate extends Component {
  render() {
    return (
      <Container>
        <Provider sections={PrepareProvider( this.props.acf.sections_page )} />
      </Container>
    )
  }
}

const SinglePage = ({ data }) => {

  const { title } = data.wordpressPage
  let metaData = data.wordpressPage.yoast_meta

  if ( !metaData || (metaData && !metaData.meta_title) ) {
    if ( !metaData ) {
      metaData = {}
    }
    metaData.meta_title = title
  }

  return (
    <Layout>
      <PageMetadata {...metaData} />
      <PageTemplate {...data.wordpressPage} />
    </Layout>
  )
}

export default SinglePage

export const pageQuery = graphql`
  query PageTemplate($id: String!) {
    wordpressPage(id: { eq: $id }) {
      ...PageSectionsFragment
    }
  }
`
