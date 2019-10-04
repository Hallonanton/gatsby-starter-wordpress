const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              title
              categories
            }
          }
        }
      }
      allDataJson {
        edges {
          node {
            homepage
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    /*
     * Variables
     */

    const { allDataJson, allMarkdownRemark } = result.data
    const hompage = allDataJson.edges[0].node.homepage
    const posts = allMarkdownRemark.edges
    let allCategories = []

    /*
     * Create pages for Sidor, Artiklar
     */

    posts.forEach(edge => {

      const { id } = edge.node
      let { slug } = edge.node.fields

      // Save categories for later use
      if (_.get(edge, `node.frontmatter.categories`)) {
        allCategories = allCategories.concat(edge.node.frontmatter.categories)
      }

      // Exclude settings pages from page creation
      if ( !slug.includes('settings') ) {    

        let { categories, templateKey, title } = edge.node.frontmatter

        // If template is page, remove "sidor" directory from path
        if ( templateKey === 'SinglePage' ) {

          if ( title === hompage ) {
            slug = "/"

          } else {
            slug = slug.replace("/sidor", "")

          }
        }

        createPage({
          path: slug,
          categories: categories,
          component: path.resolve(`src/templates/${String(templateKey)}.js`),
          // Additional data can be passed via context to be used in graphql queries
          context: {
            id,
          },
        })

      }
    })


    /*
     * Create category pages
     */

     if ( allCategories.length > 0 ) {

      // Eliminate duplicate categories
      allCategories = _.uniq(allCategories)

      // Make category pages
      allCategories.forEach(category => {
        const categoryPath = `/artiklar/${_.kebabCase(category)}/`

        createPage({
          path: categoryPath,
          component: path.resolve(`src/templates/ArchiveArticle.js`),
          // Additional data can be passed via context to be used in graphql queries
          context: {
            category,
          },
        })
      })
     }


  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}
