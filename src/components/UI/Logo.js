import React from 'react'
import styled from '@emotion/styled'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

/*==============================================================================
  # Styles
==============================================================================*/

const StyledLink = styled(Link)`
	position: relative;
	display: block;
	width: 130px;
	flex-shrink: 0;
	text-decoration: none;
	user-select: none;
	z-index: 3;

	svg, img {
		display: block;
	}
`


/*==============================================================================
  # Component
==============================================================================*/

const Logo = () => (
	<StaticQuery 
		query={graphql`
      query LogoQuery {
        ...Logo
      }
    `}
    render={data => {

    	const { logo } = data.allWordpressAcfOptions.edges[0].node.options
 
    	return (
		    <StyledLink to="/">
			    {logo && logo.localFile &&
	          <Img 
	            fixed={logo.localFile.childImageSharp.fixed}
	            alt={logo.alt_text}
	          />
	        }
			  </StyledLink>	
    	)
    }}
	/>
)

export default Logo