import React, {PropTypes, Component} from 'react'


import Enum from './enum'

export default class Enums extends Component {
  render() {
    const { contract } = this.props;

    return (
      <div className="enums">

        {Object.keys(contract.structure.enums).map((enumName) => {
          return <Enum key={`${contract.name}${enumName}`} enumInfo={contract.structure.enums[enumName]}
                       contract={contract}/>
        }) }
      </div>
    );
  }
}

Enums.propTypes = {
  contract: PropTypes.object,
};
