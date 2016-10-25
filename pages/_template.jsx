import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import { Menu, Container } from 'semantic-ui-react'

import '../css/style.scss'

import ContractDropdown from '../components/contractDropdown'

export default class Index extends Component {
  render() {
    // const activeItem = prefixLink(child.path) === this.props.location.pathname
    const onIndex = prefixLink('/') === this.props.location.pathname;
    const docsRoute = this.props.route.childRoutes.find(route => route.path === '/docs/')
    const docsPath = docsRoute.childRoutes[0].path;
    // TODO active page
    // TODO dynamic github link
    return (
      <div style={{ paddingTop: '60px' }}>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item header as={Link} to={prefixLink('/')}>{config.siteTitle}</Menu.Item>
            <Menu.Menu position="right">
              {/* TODO render currently selected documentaiton item with dropdown */}
              {onIndex ?
                <Menu.Item as={Link} to={prefixLink(docsPath)}>Contracts</Menu.Item>
              :
                <ContractDropdown pages={docsRoute.childRoutes} location={this.props.location} />
              }
              <Menu.Item as={'a'} target="_blank" href="https://github.com/gatsbyjs/gatsby">
                 Github
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        <Container>
          {this.props.children}
        </Container>
      </div>
    )
  }
}
Index.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
}
