import React from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from './SiteMetadata'

/*==============================================================================
  # Component
==============================================================================*/

const PageMetadata = ({ meta_title, meta_description, meta_image_src, meta_canonical }) => {

  const { sitename, titleSuffix } = useSiteMetadata().site.siteMetadata
  let finalTitle = meta_title ? `${meta_title} ${titleSuffix} ${sitename}` : null

  return (
    <Helmet>
      {finalTitle && (
        <title>{finalTitle}</title>
      )}
      {meta_description && (
        <meta name="description" content={meta_description} />
      )}
      {meta_title && (
        <meta property="og:title" content={meta_title} />
      )}
      {meta_image_src && (
        <meta property="og:image" content={meta_image_src} />
      )}
      {meta_canonical && (
        <link rel="canonical" href={meta_canonical} />
      )}
    </Helmet>
  )
}

export default PageMetadata
