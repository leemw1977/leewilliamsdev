/**
* The currently active environment.
* This is used to set the corresponding Tag Manager environment config.
*/
const activeEnv =
 process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
console.log(`Using environment config: '${activeEnv}'`)

// The Tag Manager Container ID.
const gtmContainerId = "GTM-NNMCM6T"

/**
* Tag Manager Environment values to configure gatsby-plugin-google-tagmanager.
* null values will cause the default (live/production) snippet to load.
*/
const gtmEnv = {
 // If tag manager plugin is configured with includeInDevelopment set to
 // true then you should create a corresponding Development environment in
 // Tag Manager and replace the null values with the container environment
 // auth and preview values. Otherwise the production snippet will load.
 development: {
  gtmAuth: "_UWyJVqLzPwthLNvvwNxiw",
  gtmPreview: "env-3",
 },

 staging: {
   gtmAuth: "_UWyJVqLzPwthLNvvwNxiw",
   gtmPreview: "env-3",
 },

 // According to GTM docs you should use standard tag for prod so we'll set to null.
 production: {
   gtmAuth: null,
   gtmPreview: null,
 },
}

module.exports = {
  siteMetadata: {
    title: `Lee Williams Dot Dev`,
    author: {
      name: `Lee Williams`,
      summary: `who lives and works in Staffordshire, UK. A developer for 21 years they recently moved in to the infosec space.`,
    },
    description: `A blog put together for Lee Williams to remember things.`,
    siteUrl: `https://gatsbystarterblogsource.gatsbyjs.io/`,
    social: {
      twitter: `leemw1977`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: gtmContainerId,
        includeInDevelopment: false,
   
        // GTM environment details.
        gtmAuth: gtmEnv[activeEnv].gtmAuth,
        gtmPreview: gtmEnv[activeEnv].gtmPreview,
      },
    },
  ],
}
