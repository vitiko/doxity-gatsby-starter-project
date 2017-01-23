import React, {PropTypes, Component} from 'react'


import Struct from './struct'

export default class Structs extends Component {
  render() {
    const { contract } = this.props;

    return (
      <div className="structs">


        {Object.keys(contract.structure.structs).map((structName) => {
        return <Struct key={`${contract.name}${structName}`} struct={contract.structure.structs[structName]} contract={contract} />
      }) }
      </div>
    );
  }
}

Structs.propTypes = {
  contract: PropTypes.object,
};
