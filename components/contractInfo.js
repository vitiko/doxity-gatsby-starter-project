import React, {PropTypes, Component} from 'react'
import ReactMarkdown from 'react-markdown'
import {Table, Segment, Label, Header} from 'semantic-ui-react'
import sortBy from 'sort-by'

export default class ContractInfo extends Component {


  showContractInfo(constructorInfo) {


    return (<div className="contractConstructorParams">
      {constructorInfo.title && <ReactMarkdown containerTagName="h4" source={constructorInfo.title}/>}
      {constructorInfo.description && <ReactMarkdown source={constructorInfo.description}/>}

      <Table definition>
        <Table.Body>

          {constructorInfo.paramsSeq
            .map(paramName => constructorInfo.params[paramName])
            .map((paramInfo, i) => {

              return (
                <Table.Row key={`${constructorInfo.name}${paramInfo.name}`} >

                  <Table.Cell>{`${i}`}</Table.Cell>
                  <Table.Cell><code>{paramInfo.name}</code></Table.Cell>

                  <Table.Cell>
                    {paramInfo.description && <ReactMarkdown source={paramInfo.description}/>}
                  </Table.Cell>
                </Table.Row>
              )
            })}
        </Table.Body>
      </Table></div>);

  }

  render() {
    const { contract } = this.props;

    return (
      <div className="contractInfo">


        <div className="imports">
          <h3>Imports </h3>

          { !Object.keys(contract.structure.source.imports).length && <div>none</div> }
          {contract.structure.source.imports.map(function (importClause) {
            return <div key={`import${importClause.alias}`}>{importClause.from} as {importClause.alias}</div>
          })}

        </div>


        <div><br/></div>

        <div className="constructor">
          <h3>Constructor</h3>


          { contract.structure.contract.constructor ?
            this.showContractInfo(contract.structure.contract.constructor) :
            <div>none</div> }

        </div>


        <div><br/></div>

        <div className="functions">
          <h3>Methods</h3>
          { !Object.keys(contract.structure.functions).length && <div>none</div> }

          {Object.keys(contract.structure.functions)
            .map(funcName => contract.structure.functions[funcName])
            .sort(sortBy('title', 'name'))
            .map(function (funcInfo, i) {
              return <div key={i}>{funcInfo.title || funcInfo.name}</div>
            })}

        </div>

        <div><br/></div>
        <div className="cfunctions">
          <h3>Constant functions</h3>
          { !Object.keys(contract.structure.constantFunctions).length && <div>none</div> }

          {Object.keys(contract.structure.constantFunctions)
            .map(funcName => contract.structure.constantFunctions[funcName])
            .sort(sortBy('title', 'name'))
            .map(function (funcInfo, i) {
              return <div key={i}>{funcInfo.title || funcInfo.name}</div>
            })}

        </div>

        <div><br/></div>
        <div className="events">
          <h3>Events</h3>
          { !Object.keys(contract.structure.events).length && <div>none</div> }

          {Object.keys(contract.structure.events)

            .map(eventName => contract.structure.events[eventName])
            .sort(sortBy('title', 'name'))
            .map(function (eventInfo, i) {
              return <div key={i}>{eventInfo.title || eventInfo.name}</div>
            })}

        </div>


        <div><br/></div>
        <div className="structs">
          <h3>Structs</h3>
          { !Object.keys(contract.structure.structs).length && <div>none</div> }

          {Object.keys(contract.structure.structs)
            .map(structName => contract.structure.structs[structName])
            .sort(sortBy('title', 'name'))
            .map(function (structInfo, i) {
              return <div key={i}>{structInfo.title || structInfo.name}</div>
            })}

        </div>

      </div>
    );
  }
}

ContractInfo.propTypes = {
  contract: PropTypes.object,
};
