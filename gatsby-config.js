const protocol = 'http'
const siteUrl = 'gatsby-deploy.dev.oas.nu'
const wordpressUrl = 'wordpress.eksjobilaffar.dev.oas.nu'

module.exports = {
  siteMetadata: {
    sitename: 'Gatsby + Wordpress',
    titleSuffix: '|',
    siteUrl: `${protocol}://${wordpressUrl}`,
    wordpressUrl: `${protocol}://${wordpressUrl}`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
          rule: {
            include: `${__dirname}/src/img`
          }
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2048,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: wordpressUrl,
        protocol: protocol,
        useACF: true,
        acfOptionPageIds: [
          'general_fields'
        ],
        verboseOutput: true,
        perPage: 100,
        searchAndReplaceContentUrls: {
          sourceUrl: `${protocol}://${siteUrl}/`,
          replacementUrl: "/",
        },
        concurrentRequests: 10,
        excludedRoutes: [
          "/*/*/comments",
          "/wp-json/yoast/*",
          "/wp-json/wp/v2/users/*",
          "/wp-json/wp/v2/settings/*",
          "/wp-json/wp/v2/themes/*",
          "/wp/v2/block-renderer/*"
        ],
        normalizer: function({ entities }) {
          return entities;
        },
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#2a6cf0',
        showSpinner: false,
      },
    },
  ],
}
