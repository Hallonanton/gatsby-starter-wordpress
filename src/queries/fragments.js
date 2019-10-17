import { graphql } from "gatsby"

export const Header = graphql`
  fragment Header on Query {
    allDataJson {
      edges {
        node {
          mainmenu {
            title
            to
            submenu {
              title
              to
            }
          }
          socialmedia {
            Facebook
            Instagram
            Twitter
            LinkedIn
            Youtube
          }
        }
      }
    }
  }
`

export const Footer = graphql`
  fragment Footer on Query {
    allDataJson(filter: {
      footermenu: {
        elemMatch: {
          links: {
            elemMatch: {
              title: {ne: null}
            }
          }
        }
      }
    }) {
      edges {
        node {
          footermenu {
            title
            links {
              type
              title
              to
            }
          }
          bottommenu {
            title
            to
          }
        }
      }
    }
  }
`

export const CookieConsent = graphql`
  fragment CookieConsent on Query {
    allDataJson(
      filter: {
        integritypage: {ne: null}
      }
    ) {
      edges {
        node {
          integritypage
        }
      }
    }
  }
`

export const PageSectionsFragment = graphql`
  fragment PageSectionsFragment on MarkdownRemark {
    frontmatter {
      title
      sections {
        sectionKey
        title
        textBody
        alignment
        link {
          title
          to
        }
        text
        category
        cards {
          text
          title
          link {
            title
            to
          }
        }
        imageHalf {
          childImageSharp {      
            fluid(maxWidth: 600, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        imageFull {
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

export const AllArticles = graphql`
  fragment AllArticles on Query {
    allMarkdownRemark(
      filter: { 
        frontmatter: { 
          templateKey: { eq: "SingleArticle" } 
        }
      }
      sort: {
        fields: [frontmatter___date, frontmatter___title]
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
  fragment ArticleCardFragment on MarkdownRemark {
    id
    excerpt(pruneLength: 150)
    rawMarkdownBody
    fields {
      slug
    }
    frontmatter {
      title
      categories
      date(formatString: "YYYY-MM-DD")
      description
      featuredimage {
        childImageSharp {
          fixed(width: 300, height: 300) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`

export const ArticlePageFragment = graphql`
  fragment ArticlePageFragment on MarkdownRemark {
    id
    html
    frontmatter {
      title
      categories
      date(formatString: "YYYY-MM-DD")
      description
      featuredimage {
        childImageSharp {      
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

/*export const MetaFragment = graphql`
  fragment Meta on MarkdownRemarkFrontmatter {
    meta {
      metaDescription
      metaTitle
      metaImage {
        name
      }
    }
  }
`*/