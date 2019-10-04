import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { ArchiveTemplate } from '../../templates/ArchiveArticle'
import Layout from '../../components/Layout/Layout'


const ArchiveArticle = ({ data }) => {

  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <ArchiveTemplate 
        title="Alla artiklar" 
        posts={posts}
      />
    </Layout>
  )
}

export default () => (
  <StaticQuery
    query={graphql`
      query ArchiveQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "SingleArticle" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
              }
            }
          }
        }
      }
    `}
    render={data => <ArchiveArticle data={data} />}
  />
)
