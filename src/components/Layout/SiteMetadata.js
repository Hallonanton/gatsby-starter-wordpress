import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery, withPrefix } from 'gatsby'
import { useTheme } from 'emotion-theming'

/*==============================================================================
  # Component
==============================================================================*/

export const useSiteMetadata = () => {
  const result = useStaticQuery(
    graphql`
      query MetadataQuery {
        ...SiteMetaQuery
      }
    `
  )
  return result
}

const SiteMetadata = () => {

  const theme = useTheme()
  const { site, allFile } = useSiteMetadata()
  const { sitename, title, titleSuffix, description } = site.siteMetadata
  const favicons = allFile.edges[0].node
  const finalTitle = `${title} ${titleSuffix} ${sitename}`

  return (
    <Helmet>
      <html lang="sv" />
      <title>{finalTitle}</title>
      <meta name="description" content={description} />

      {Object.keys(favicons.icons).map((icon, i) => (
        <link key={i} rel="icon" href={icon.src} type="image/png" sizes={`${icon.width}x${icon.height}`} />
      ))}
      {Object.keys(favicons.appleTouchIcons).map((icon, i) => (
        <link key={i} rel="apple-touch-icon" href={icon.src} type="image/png" sizes={`${icon.width}x${icon.height}`} />
      ))}

      <meta name="theme-color" content={theme.colors.bg} />
      <meta property="og:site_name" content={sitename} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="sv_SE" />
      <meta property="og:image" content={`${withPrefix('/')}img/og-image.jpg`} />

    </Helmet>
  )
}

export default SiteMetadata
