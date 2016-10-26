import React, { PropTypes, Component } from 'react'

export default class Compiled extends Component {
  render() {
    const { contract } = this.props
    return (
      <div className="compiled">
        {contract.bin &&
          <div className="bin">
            <h3>Binary</h3>
            <pre className="wrap">
              <code>{contract.bin}</code>
            </pre>
          </div>
        }
        {contract.opcodes &&
          <div className="opcodes">
            <h3>Opcodes</h3>
            <pre className="wrap">
              <code>{contract.opcodes}</code>
            </pre>
          </div>
        }
      </div>
    )
  }
}

Compiled.propTypes = {
  contract: PropTypes.object,
}
