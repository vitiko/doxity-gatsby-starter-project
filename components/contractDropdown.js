import React, { PropTypes, Component } from 'react'
import { prefixLink } from 'gatsby-helpers'
import { Menu, Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router'

export default class ContractDropdown extends Component {
  render() {
    const selected = this.props.pages.find(page => prefixLink(page.path) === this.props.location.pathname)
    return (
      <Dropdown as={Menu.Item} text={selected.page.data.name}>
        <Dropdown.Menu>
          {this.props.pages.map(({ page }) => <Dropdown.Item as={Link} to={prefixLink(page.path)} text={page.data.name} />)}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

ContractDropdown.propTypes = {
  pages: PropTypes.array,
}
