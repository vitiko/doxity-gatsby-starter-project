import React, { PropTypes, Component } from 'react'
import { Table, Segment, Label, Header } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

export default class Method extends Component {
  renderParams(params, type) {
    return params.map((param, i) => {
      const inputs = type === 'Inputs'
      return (
        <Table.Row negative={!inputs} positive={inputs}>
          {i === 0 ?
            <Table.Cell rowSpan={params.length}>{type}</Table.Cell>
          :
            <Table.Cell style={{ display: 'none' }}>{type}</Table.Cell>
          }
          <Table.Cell>{`${i}`}</Table.Cell>
          <Table.Cell>{param.type}</Table.Cell>
          <Table.Cell>{param.name}</Table.Cell>
          <Table.Cell>{param.description}</Table.Cell>
        </Table.Row>
      )
    })
  }
  render() {
    const { method, contract } = this.props
    // color segment based on type
    const colors = {
      event: 'blue',
      constructor: 'red',
    }
    const color = colors[method.type]
    return (
      <Segment color={color}>
        <Label ribbon="right" color={color}>
          {method.type}
          {method.payable && ', payable'}
          {method.constant && ', constant'}
        </Label>
        <Header style={{ marginTop: '-1.5rem' }} as="h3">
          <code>{contract.name}{method.name ? `.${method.name}` : ''}</code>
        </Header>
        {method.notice && <ReactMarkdown containerTagName="h4" source={method.notice} />}
        {method.details && <ReactMarkdown containerTagName="p" source={method.details} />}
        {(method.inputs.length || method.outputs) &&
          <Table definition>
            <Table.Body>
              {method.inputs && this.renderParams(method.inputs, 'Inputs')}
              {method.outputs && this.renderParams(method.outputs, 'Outputs')}
            </Table.Body>
          </Table>
        }
      </Segment>
    )
  }
}

Method.propTypes = {
  method: PropTypes.object,
  contract: PropTypes.object,
}
