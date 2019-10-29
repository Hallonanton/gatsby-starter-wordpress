const _ = require('lodash')
const Promise = require('bluebird')
const URL = require('url-parse')
const path = require('path')
const fs = require('fs')
const slash = require('slash')
const mainQuery = require('./src/queries/mainQuery.js')


/*==============================================================================
  # Create pages
==============================================================================*/

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {

    /*
     * Templates
     */

    //Page
    const singlePage = path.resolve("./src/templates/SinglePage.js")

    //Posts
    const singleArticle = path.resolve("./src/templates/SingleArticle.js")

    //Categories
    const archiveArticle = path.resolve("./src/templates/ArchiveArticle.js")


    /*
     * Resolve
     */

    resolve(
      graphql(mainQuery).then(result => {

        /*
         * Pages
         */
        const pages = result.data.allWordpressPage.edges

        pages.forEach(edge => {

          if (edge.node.status === 'publish') {
              
            const pageLink = edge.node.link
            const url = new URL(pageLink)
            const templateName = edge.node.template.substr(9).slice(0,-4)
            const templatePath = path.resolve("./src/templates/page-"+templateName+".js")

            if( templateName === 'dummy' ) {

              //By not creating a page for the dummy-template we are able to fetch all the fields as a backup from the dummy-template whitout creataing a ugly page that users can visit.

            } else if(edge.node.template.indexOf('template-') !== -1 && fs.existsSync(templatePath) ) {

              createPage({
                path: url.pathname, //url.pathname is used to maintain parent/child connection for pages
                component: slash(templatePath),
                context: {
                  id: edge.node.id,
                },
              })

            } else {

              createPage({
                path: url.pathname, //url.pathname is used to maintain parent/child connection for pages
                component: slash(singlePage),
                context: {
                  id: edge.node.id,
                },
              })
            }

          }
        })


        /*
         * Posts
         */
        const article = result.data.allWordpressWpArticle.edges

        const post_type_pages = [
          {
            posts: article,
            slug: 'artiklar',
            template: singleArticle
          },
        ]

        post_type_pages.forEach(post_type => {

          post_type.posts.forEach(edge => {

            if (edge.node.status === 'publish') {

              createPage({
                path: `/${post_type.slug}/${edge.node.slug}/`,
                component: slash(post_type.template),
                context: {
                  id: edge.node.id,
                },
              })

            }
          }) 
        })

        /*
         * Categories
         */
        const articleCat = result.data.allWordpressWpArticleCategory.edges

        const taxonomi_pages = [
          {
            terms: articleCat,
            slug: 'artiklar',
            template: archiveArticle
          },
        ]

        taxonomi_pages.forEach(taxonomi => {

          taxonomi.terms.forEach(edge => {

            createPage({
              path: `/${taxonomi.slug}/${edge.node.slug}/`,
              component: slash(taxonomi.template),
              context: {
                id: edge.node.id,
                categoryName: edge.node.name
              },
            })
          }) 
        })

      })
    )
  })
}


/*==============================================================================
  # Customize GraphQL schema
==============================================================================*/

//https://www.gatsbyjs.org/docs/schema-customization/

//This link might be useful for flexible content: https://medium.com/@Zepro/contentful-reference-fields-with-gatsby-js-graphql-9f14ed90bdf9

//For now I haven't figured out how to implement this on fields with more complex types like images with File etc
//https://github.com/gatsbyjs/gatsby/issues/3344

//This will allow different fields to be left empty without causing a GraphQL error
//The result will be that missing fields default to null instead on beaing declared as undefined

//For flexible content use the dummy-page-template in wordpress instead to define the schema

const AcfOptions = `
  type wordpress__acf_options implements Node {
    options: wordpress__acf_optionsOptions
  }
  type wordpress__acf_optionsOptions {
    socialmedia: wordpress__acf_optionsOptionsSocialmedia
    logo: wordpress__wp_media
  }
  type wordpress__acf_optionsOptionsSocialmedia {
    Facebook: String
    Instagram: String
    LinkedIn: String
    Twitter: String
    Youtube: String
  }
`

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    ${AcfOptions}
  `
  createTypes(typeDefs)
}


/*==============================================================================
  # Fix react warning
==============================================================================*/

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}
