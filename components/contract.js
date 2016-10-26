import sortBy from 'sort-by'
import React, { Component, PropTypes } from 'react'
import { Menu, Header, Divider } from 'semantic-ui-react'
import Method from './method'
import Source from './source'
import Compiled from './compiled'

export default class Contract extends Component {
  constructor(props) {
    super(props)
    this.state = { tab: 0 }
    this.renderTab = this.renderTab.bind(this)
  }
  handleTabClick(tab) {
    this.setState({ tab })
  }
  renderTab(tab, i) {
    return <Menu.Item name={tab} active={this.state.tab === i} onClick={() => this.handleTabClick(i)} />
  }
  renderTabContent() {
    const { contract } = this.props
    return [
      () => contract.abiDocs.sort(sortBy('type', 'name')).map(method => <Method method={method} contract={contract} />),
      () => <Compiled contract={contract} />,
      () => <Source contract={contract} />,
    ][this.state.tab]()
  }
  render() {
    const { contract } = this.props
    return (
      <div className="contract">
        <Header as="h2" floated="left">
          {contract.title || contract.name}
          {contract.fileName &&
            <Header.Subheader>
              {contract.fileName}
            </Header.Subheader>
          }
        </Header>
        {contract.author &&
          <Header as="h3" disabled floated="right">
            {contract.author}
          </Header>
        }
        <Divider hidden style={{ clear: 'both' }} />
        <Menu pointing secondary>
          {['Methods', 'Bytecode', 'Source Code'].map(this.renderTab)}
        </Menu>
        {this.renderTabContent()}
      </div>
    )
  }
}

Contract.propTypes = {
  contract: PropTypes.object,
}
