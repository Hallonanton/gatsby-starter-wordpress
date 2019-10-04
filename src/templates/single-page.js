import React, { Component } from 'react'
import Layout from '../components/Layout/Layout'


export class PageTemplate extends Component {

  render() {

    return (
      <div>
        PageTemplate
      </div>
    )
  }
}

const IndexPage = () => {

  return (
    <Layout>
      <PageTemplate />
    </Layout>
  )
}

export default IndexPage
