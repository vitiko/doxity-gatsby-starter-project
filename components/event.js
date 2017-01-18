import React, {PropTypes, Component} from 'react'
import {Table, Segment, Label, Header} from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

export default class Event extends Component {
  renderParams(event, contract) {
    return event.inputs.map((param, i) => {

      const paramDesc = param.description || contract.structure.events[event.name].params[param.name].description

      return (
        <Table.Row key={i}>
          {/*{i === 0 ?*/}
          {/*<Table.Cell rowSpan={params.length}>{type}</Table.Cell>*/}
          {/*:*/}
          {/*<Table.Cell style={{ display: 'none' }}>{type}</Table.Cell>*/}
          {/*}*/}
          <Table.Cell>{`${i}`}</Table.Cell>
          <Table.Cell>{param.type}</Table.Cell>
          <Table.Cell>
            {param.name && <code>{param.name}</code>}
          </Table.Cell>
          <Table.Cell>
            {paramDesc && <ReactMarkdown source={paramDesc} />}
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  render() {
    const {event, contract} = this.props
    // color segment based on type
    const colors = {
      event: 'blue',
      constructor: 'red',
    }
    const color = colors[event.type]
    return (
      <Segment color={color}>
        <Label ribbon="right" color={color}>
          {event.type}
          {event.payable && ', payable'}
          {event.constant && ', constant'}
        </Label>
        <Header style={{marginTop: '-1.5rem'}} as="h3">
          <code>{event.name || contract.name}</code>
          {' '}
          {event.signatureHash && <code className="signature">{event.signatureHash}</code>}
        </Header>
        <Header as="h4">
          {contract.structure.events[event.name].title  }
        </Header>
        {/*{event.notice && <ReactMarkdown containerTagName="h4" source={event.notice} />}*/}
        {contract.structure.events[event.name].description &&
        <ReactMarkdown source={contract.structure.events[event.name].description}/>}
        {(event.inputs.length || event.outputs) &&
        <Table definition>
          <Table.Body>
            {event.inputs && this.renderParams(event, contract)}
            {/*{event.outputs && this.renderParams(event.outputs, 'Outputs')}*/}
          </Table.Body>
        </Table>
        }
      </Segment>
    )
  }
}

Event.propTypes = {
  event: PropTypes.object,
  contract: PropTypes.object,
}
