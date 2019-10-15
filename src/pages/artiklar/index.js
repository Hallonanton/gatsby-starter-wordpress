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
        ...AllArticles
      }
    `}
    render={data => <ArchiveArticle data={data} />}
  />
)
