import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../components/Layout'
import WorkRoll from '../components/WorkRoll'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => <WorkRoll />

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = () => (
  <Layout>
    <IndexPageTemplate />
  </Layout>
)

IndexPage.propTypes = {}

export default IndexPage
