import React, { PropTypes, Component } from 'react'

export default class ContractInfo extends Component {
  render() {
    const { contract } = this.props
    return (
      <div className="contractInfo">


        {contract.structure.source.imports &&
          <div className="umports">
            <h3>Imports </h3>

            {contract.structure.source.imports.map(function(importClause, i){
              return <div key={i}>{importClause.from} as {importClause.alias}</div>
            })}

          </div>
        }
{/*        {contract.opcodes &&
          <div className="opcodes">
            <h3>Opcodes</h3>
            <pre className="wrap">
              <code>{contract.opcodes}</code>
            </pre>
          </div>
        }*/}
      </div>
    )
  }
}

ContractInfo.propTypes = {
  contract: PropTypes.object,
}
