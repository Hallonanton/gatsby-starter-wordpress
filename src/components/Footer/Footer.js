import React, { Component } from 'react'
import styled from '@emotion/styled'
import { StaticQuery, graphql } from 'gatsby'
import HorizontalNav from '../Navigation/HorizontalNav'
import { StyledLink } from '../Navigation/NavigationItem'
import Container from '../UI/Grid'
import Logo from '../UI/Logo'
import InfoList from './InfoList'
import { replaceKeysDeep } from '../../utility/functions'


/*==============================================================================
  # Styles
==============================================================================*/

const FooterWrapper = styled('footer')`
  flex-shrink: 0;
  padding-top: 30px;
  padding-bottom: 30px;
`

const FooterRow = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  padding: 70px 0px;

  ${({theme}) => theme.above.md} {
    justify-content: space-between;
  }
`
const BottomRow = styled(FooterRow)`
  padding: 5px 0px 0px 0px;
  border-top: 1px solid ${({theme}) => theme.colors.bgContrastLower};
`

const NavigationContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;

  ${({theme}) => theme.above.md} {
    width: auto;
    justify-content: flex-end;
  }
`

const DiscreetNav = styled(HorizontalNav)`

  ${({theme}) => theme.below.md} {
    justify-content: center;
  }

  ${StyledLink} {
    color: ${({theme}) => theme.colors.bgContrast};
    ${({theme}) => theme.fontSizes.description}
    text-decoration: underline;
    transition: all 250ms ease;

    &:hover {
      color: ${({theme}) => theme.colors.text};
    }
  }
`


/*==============================================================================
  # Component
==============================================================================*/

class Footer extends Component {

  render() {

    return (
      <StaticQuery 
        query={graphql`
          query FooterQuery {
            ...Footer
          }
        `}
        render={data => {

          let { footermenu, bottommenu } = data.allWordpressAcfOptions.edges[0].node.options

          if ( bottommenu ) {
            bottommenu = bottommenu.map( item => item.link )
            bottommenu = replaceKeysDeep(bottommenu, {url: 'to'})
          }

          return (
            <FooterWrapper>
              <Container>

                <FooterRow>

                  <Logo />

                  <NavigationContainer>
                    {footermenu && footermenu.map( (item, i) => (
                      <InfoList 
                        key={i}
                        title={item.title}
                        items={item.content}
                      />
                    ))}
                  </NavigationContainer>

                </FooterRow>

                <BottomRow>
                  <DiscreetNav links={Object.values(bottommenu)} />
                </BottomRow>

              </Container>
            </FooterWrapper>
          )
        }}
      />
    )
  }
}

export default Footer
