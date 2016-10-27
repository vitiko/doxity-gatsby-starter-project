import React, { Component, PropTypes } from 'react'
import { Menu, Header, Divider, Message } from 'semantic-ui-react'
import Methods from './methods'
import Source from './source'
import Abi from './abi'
import Compiled from './compiled'

const tabs = [
  {
    text: 'Methods',
    available(contract) {
      return contract.abiDocs && contract.abiDocs.length > 0
    },
  }, {
    text: 'ABI',
    available(contract) {
      return contract.abi && contract.abi.length > 0
    },
  }, {
    text: 'Bytecode',
    available(contract) {
      return contract.opcodes || contract.bytecode
    },
  }, {
    text: 'Source Code',
    available(contract) {
      return contract.source
    },
  },
]

export default class Contract extends Component {
  constructor(props) {
    super(props)
    this.state = { tab: 0 }
    this.renderTab = this.renderTab.bind(this)
    this.renderTabMenu = this.renderTabMenu.bind(this)
  }
  handleTabClick(tab) {
    this.setState({ tab })
  }
  renderTabMenu() {
    const { contract } = this.props
    const tabsReady = tabs.map((tab) => ({ ...tab, available: tab.available(contract) }))
    // hide the menu if there are no tabs
    if (!tabsReady.find(tab => tab.available)) { return null }
    // or render it
    return (
      <Menu pointing secondary>
        {tabsReady.map(this.renderTab)}
      </Menu>
    )
  }
  renderTab(tab, i) {
    if (!tab.available) { return null }
    return <Menu.Item name={tab.text} active={this.state.tab === i} onClick={() => this.handleTabClick(i)} />
  }
  renderTabContent() {
    const { contract } = this.props
    return [
      () => <Methods contract={contract} />,
      () => <Abi contract={contract} />,
      () => <Compiled contract={contract} />,
      () => <Source contract={contract} />,
    ][this.state.tab]()
  }
  render() {
    const { contract } = this.props
    const thisTab = tabs[this.state.tab]
    const thisTabAvailable = thisTab.available(contract)
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
        {this.renderTabMenu()}
        {thisTabAvailable ?
          this.renderTabContent()
        :
          <Message compact content={`${thisTab.text} not available for this contract.`} />
        }
      </div>
    )
  }
}

Contract.propTypes = {
  contract: PropTypes.object,
}
