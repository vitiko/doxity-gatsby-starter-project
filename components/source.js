import React, { PropTypes, Component } from 'react'

export default class Source extends Component {
  render() {
    console.log('render code', this);
    const { contract } = this.props
    return (
      <div className="source">
        <h3>Source Code</h3>
        <pre>
          <code>{contract.source}</code>
        </pre>
      </div>
    )
  }
}

Source.propTypes = {
  contract: PropTypes.object,
}
