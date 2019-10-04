import React, { Component, Fragment } from 'react'
import SectionImage from './SectionImage'
import SectionNumber from './SectionNumber'
import SectionText from './SectionText'


/*==============================================================================
  # Component
==============================================================================*/

class Provider extends Component {

  state = {
    templates: {
      SectionImage,
      SectionNumber,
      SectionText
    }
  }

  getTemplate = (name) => {
    return this.state.templates[name]
  }

  render () {

    const { sections } = this.props

    return (
      <Fragment>
        {sections && sections.length > 0 ? sections.map((section, i) => {

          const Section = this.getTemplate(section.sectionKey)

          return (
            <Section key={i} {...section} />
          )
        }) : null}
      </Fragment>
    )
  }
}

export default Provider
