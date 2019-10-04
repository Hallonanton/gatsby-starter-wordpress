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
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    /*
     * Create pages for Sidor, Artiklar
     */

    posts.forEach(edge => {

      const { id } = edge.node
      let { slug } = edge.node.fields

      // Exclude settings pages from page creation
      if ( !slug.includes('settings') ) {    

        let { categories, templateKey } = edge.node.frontmatter

        // If template is page, remove "sidor" directory from path
        if ( templateKey === 'SinglePage' ) {
          slug = slug.replace("/sidor", "")
        }

        createPage({
          path: slug,
          categories: categories,
          component: path.resolve(
            `src/templates/${String(templateKey)}.js`
          ),
          // Additional data can be passed via context
          context: {
            id,
          },
        })

      }
    })


    /*
     * Create category pages
     */

    /*let categories = []

    // Iterate through each post, putting all found categories into `categories`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.categories`)) {
        categories = categories.concat(edge.node.frontmatter.categories)
      }
    })
    // Eliminate duplicate categories
    categories = _.uniq(categories)

    // Make category pages
    categories.forEach(category => {
      const categoryPath = `/kategori/${_.kebabCase(category)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/categories.js`),
        context: {
          category,
        },
      })
    })*/


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
