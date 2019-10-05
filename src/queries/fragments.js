import { graphql } from "gatsby"

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
    rawMarkdownBody
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