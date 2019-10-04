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
      date
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

