import React from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from './SiteMetadata'

/*==============================================================================
  # Component
==============================================================================*/

const PageMetadata = ({ metaTitle, metaDescription }) => {

  const siteMetadata = useSiteMetadata()
  console.log( siteMetadata, metaTitle, metaDescription )

  return (
    <Helmet>
    </Helmet>
  )
}

export default PageMetadata
