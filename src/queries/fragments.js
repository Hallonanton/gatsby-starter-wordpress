import { graphql } from "gatsby"


/*==============================================================================
  # Fragments
==============================================================================*/

/*
 * General
 */

export const SiteMetaQuery = graphql`
  fragment SiteMetaQuery on Query {
    site {
      siteMetadata {
        sitename
        titleSuffix
      }
    }
    allWordpressSiteMetadata {
      edges {
        node {
          name
          description        
        }
      }
    }
    favicon: allFile(filter: {
      name: {eq: "favicon"}
    }) {
      edges {
        node {
          icons: childImageSharp {
            standard: fixed(width: 16, height: 16) {
              ...GatsbyImageSharpFixed
            }
            standardLarge: fixed(width: 32, height: 32) {
              ...GatsbyImageSharpFixed
            }
            googleTV: fixed(width: 96, height: 96) {
              ...GatsbyImageSharpFixed
            }
            win8icon: fixed(width: 128, height: 128) {
              ...GatsbyImageSharpFixed
            }
            ie10metro: fixed(width: 192, height: 192) {
              ...GatsbyImageSharpFixed
            }
            androidHome: fixed(width: 196, height: 196) {
              ...GatsbyImageSharpFixed
            }
            loadingSplash: fixed(width: 512, height: 512) {
              ...GatsbyImageSharpFixed
            }
          }
          appleTouchIcons: childImageSharp {
            iPhoneRetina: fixed(width: 120, height: 120) {
              ...GatsbyImageSharpFixed
            }
            iPad: fixed(width: 152, height: 152) {
              ...GatsbyImageSharpFixed
            }
            iPadRetina: fixed(width: 167, height: 167) {
              ...GatsbyImageSharpFixed
            }
            iPhonePlus: fixed(width: 180, height: 180) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
    ogImage: allFile(filter: {
      name: {eq: "default-og-image"}
    }) {
      edges {
        node {
          childImageSharp {
            fixed(width: 1200, height: 630) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`

export const Header = graphql`
  fragment Header on Query {
    wordpressMenusMenusItems(name: {eq: "Huvudmeny"}) {
      name
      items {
        title
        target
        url
        child_items {
          title
          target
          url
        }
      }
    }
    wordpressAcfOptions {
      options {
        socialmedia {
          Facebook
          Instagram
          Twitter
        }
      }
    }
  }
`

export const Footer = graphql`
  fragment Footer on Query {
    allWordpressAcfOptions {
      edges {
        node {
          options {
            footermenu {
              title
              content {              
                title
                link {
                  title
                  target
                  url
                }
              }
            }
            bottommenu {
              link {
                title
                target
                url
              }
            }
          }
        }
      }
    }
  }
`

export const Logo = graphql`
  fragment Logo on Query {
    allWordpressAcfOptions {
      edges {
        node {
          options {
            logo {
              alt_text
              localFile {
                childImageSharp {
                  fixed(height: 50) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const CookieConsent = graphql`
  fragment CookieConsent on Query {
    allWordpressAcfOptions {
      edges {
        node {
          options {
            integritypage {
              link
            }
          }
        }
      }
    }
  }
`

/*
 * Articles
 */

export const AllArticles = graphql`
  fragment AllArticles on Query {
    allWordpressWpArticle(
      sort: {
        fields: [date, title]
        order: [DESC, ASC]
      }
    ) {
      edges {
        node {
          ...ArticleCardFragment
        }
      }
    }
  }
`

export const ArticleCardFragment = graphql`
  fragment ArticleCardFragment on Node {
    ... on wordpress__wp_article {
      id
      title
      link
      date(formatString: "YYYY-MM-DD")
      cpt_categories {
        taxonomy 
        name
        link
      }
      acf {
        description
        content
        featured_image {
          localFile {
            childImageSharp {
              fixed(width: 300, height: 300) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`

export const ArticlePageFragment = graphql`
  fragment ArticlePageFragment on wordpress__wp_article {
    id
    title
    date(formatString: "YYYY-MM-DD")
    cpt_categories {
      taxonomy 
      name
      link
    }
    yoast_meta {
      meta_title
      meta_description
      meta_canonical
    }
    acf {
      description
      content
      featured_image {
        localFile {
          childImageSharp {      
            fluid(maxWidth: 1200, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

/*
 * Pages and ACF-sections
 */ 

export const PageSectionsFragment = graphql`
  fragment PageSectionsFragment on wordpress__PAGE {
    title
    yoast_meta {
      meta_title
      meta_description
      meta_canonical
    }
    acf {
      sections_page {
        __typename
        ...on Node {
          ...on WordPressAcf_SectionArticles {
            ...SectionArticles
          }
          ...on WordPressAcf_SectionImage {
            ...SectionImage
          }
          ...on WordPressAcf_SectionImageText {
            ...SectionImageText
          }
          ...on WordPressAcf_SectionText {
            ...SectionText
          }
          ...on WordPressAcf_SectionTextCards {
            ...SectionTextCards
          }
        }
      }
    }
  }
`

export const SectionArticles = graphql`
  fragment SectionArticles on WordPressAcf_SectionArticles {
    __typename
    articles {
      article {
        post_title
        link
        acf {
          description
          content
          featured_image {
            localFile {
              childImageSharp {
                fixed(width: 300, height: 300) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`

export const SectionImage = graphql`
  fragment SectionImage on WordPressAcf_SectionImage {
    __typename
    image {
      localFile {
        childImageSharp {      
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

export const SectionImageText = graphql`
  fragment SectionImageText on WordPressAcf_SectionImageText {
    __typename
    title
    text
    link {
      title
      target
      url
    }
    image {
      localFile {
        childImageSharp {      
          fluid(maxWidth: 600, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    image_alignment
  }
`

export const SectionText = graphql`
  fragment SectionText on WordPressAcf_SectionText {
    __typename
    title
    text
  }
`

export const SectionTextCards = graphql`
  fragment SectionTextCards on WordPressAcf_SectionTextCards {
    __typename
    cards {
      title
      text
      link {
        title
        target
        url
      }
    }
  }
`