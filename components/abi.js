import React, { PropTypes, Component } from 'react'

export default class Abi extends Component {
  render() {
    const { contract } = this.props
    return (
      <div className="abi">
        <h3>ABI</h3>
        <pre>
          <code>{JSON.stringify(contract.abi, null, 2)}</code>
        </pre>
      </div>
    )
  }
}

Abi.propTypes = {
  contract: PropTypes.object,
}
