import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import { withPrefix } from 'gatsby'
import { useTheme } from 'emotion-theming'

/*==============================================================================
  # Component
==============================================================================*/

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query MetadataQuery {
        site {
          siteMetadata {
            site
            title
            description
          }
        }
      }
    `
  )
  return site.siteMetadata
}

const SiteMetadata = () => {

  const theme = useTheme()
  const { site, title, description } = useSiteMetadata()

  return (
    <Helmet>
      <html lang="sv" />
      <title>{title}</title>
      <meta name="description" content={description} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${withPrefix('/')}img/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        href={`${withPrefix('/')}img/favicon-32x32.png`}
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href={`${withPrefix('/')}img/favicon-16x16.png`}
        sizes="16x16"
      />
      <link
        rel="mask-icon"
        href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
        color="#ff4400"
      />

      <meta name="theme-color" content={theme.colors.bg} />
      <meta property="og:site_name" content={site} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="sv_SE" />
      <meta property="og:image" content={`${withPrefix('/')}img/og-image.jpg`} />

    </Helmet>
  )
}

export default SiteMetadata
