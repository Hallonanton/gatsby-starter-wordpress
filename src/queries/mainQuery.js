'use strict'

module.exports = `
	{
	  allWordpressPage {
	    edges {
	      node {
	        id
	        slug
	        status
	        template
	        link
	      }
	    }
	  }
	  
	  allWordpressWpArticle {
	    edges {
	      node {
	        id  
	        slug
	        status
	        link
	      }
	    }
	  }
	  
	  allWordpressWpArticleCategory {
	    edges {
	      node {
	        id
	        slug
	        link
	      }
	    }
	  }
	}
`