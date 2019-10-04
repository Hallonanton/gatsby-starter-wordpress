import React, { Component } from 'react'
import styled from '@emotion/styled'

import SectionText from './SectionText'
import SectionNumber from './SectionNumber'
import SectionImage from './SectionImage'

/*==============================================================================
  # Styles
==============================================================================*/

const Wrapper = styled('div')`
  width: 100%;
  padding: 30px 0px;
  text-align: center;
`


/*==============================================================================
  # Component
==============================================================================*/

class Provider extends Component {

  render () {

    const { sections } = this.props
    console.log( sections )

    return (
      <Wrapper>
        {sections && sections.length > 0 ? sections.map((section, i) => {

          const Tag = section.sectionKey

          return (
            <Tag key={i} />
          )
        }) : null}
      </Wrapper>
    )
  }
}

export default Provider


