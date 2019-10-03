import React, { Component } from 'react'
import styled from '@emotion/styled'
import HorizontalNav from '../Navigation/HorizontalNav'
import { StyledLink } from '../Navigation/NavigationItem'
import Container from '../UI/Container'
import Logo from '../UI/Logo'
import InfoList from './InfoList'


/*==============================================================================
  # Styles
==============================================================================*/

const FooterWrapper = styled('footer')`
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
    color: ${({theme}) => theme.colors.bgContrastMed};
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

    const infoText = [
      {
        title: 'Adressvägen 1'
      },
      {
        title: '12 345 Ankeborg'
      },
      {
        title: '123 - 45 67 89'
      },
      {
        title: 'info@mejl.com'
      }
    ]

    const infoLinks = [
      {
        title: 'Placeholder 1',
        to: '/',
        target: false
      },
      {
        title: 'Placeholder 2',
        to: '/',
        target: false
      },
      {
        title: 'Placeholder 3',
        to: '/',
        target: false
      },
      {
        title: 'Placeholder 4',
        to: '/',
        target: false
      },
      {
        title: 'Placeholder 5',
        to: '/',
        target: false
      }
    ]

    const bottomLinks = [
      {
        title: 'Användarvillkor',
        to: '/',
        target: false
      },
      {
        title: 'Cookies',
        to: '/',
        target: false
      }
    ]

    return (
      <FooterWrapper>
        <Container maxWidth>

          <FooterRow>

            <Logo />

            <NavigationContainer>
              <InfoList 
                title="Om oss"
                items={infoText}
              />
              <InfoList 
                title="Tjänster"
                items={infoLinks}
              />
              <InfoList 
                title="Produkter"
                items={infoLinks}
              />
            </NavigationContainer>

          </FooterRow>

          <BottomRow>
            <DiscreetNav links={bottomLinks} />
          </BottomRow>

        </Container>
      </FooterWrapper>
    )
  }
}

export default Footer
