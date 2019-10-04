import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/Layout'
import Container from '../components/UI/Container'
import { Mega } from '../components/UI/Headings'

export class ArchiveTemplate extends Component {

  render() {

    const { title, posts } = this.props

    return (
      <Container>
        
        <Mega>{title}</Mega>

        {posts && posts.length > 0 ? posts.map((post, i) => {

          return (
            <div key={i}>Artikel</div>
          )
        }) : null}

      </Container>
    )
  }
}

const ArchiveCategory = ({ data }) => {

  console.log( data )

  return (
    <Layout>
      <ArchiveTemplate 
        title="Kategori" 
        posts={[]}
      />
    </Layout>
  )
}

export default ArchiveCategory

export const categoryQuery = graphql`
  query CategoryTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`
