import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { ArchiveTemplate } from '../templates/ArchiveArticle'
import Layout from '../components/Layout/Layout'
import PageMetadata from '../components/Layout/PageMetadata'


const ArchiveArticle = ({ data }) => {

  const posts = data.allWordpressWpArticle.edges
  let meta = {
    meta_title: 'Alla artiklar'
  }

  return (
    <Layout>
      <PageMetadata {...meta} />
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
