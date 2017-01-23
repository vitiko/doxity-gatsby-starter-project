import React, {PropTypes, Component} from 'react'
import {Table, Segment, Label, Header} from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

export default class Struct extends Component {
  renderParams(struct) {


    return struct.paramsSeq.map((paramName, i) => {

      const param = struct.params[paramName];

      return (
        <Table.Row key={i}>

          <Table.Cell>{`${i}`}</Table.Cell>
          <Table.Cell>{param.type}{param.typeHint && <code> ({param.typeHint})</code>}</Table.Cell>
          <Table.Cell>
            {param.name && <code>{param.name}</code>}
          </Table.Cell>
          <Table.Cell>
            {param.description && <ReactMarkdown source={param.description}/>}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    const { struct, contract } = this.props;

    const color = 'blue';
    return (
      <Segment color={color}>
        <Label ribbon="right" color={color}>Struct</Label>
        <Header style={{ marginTop: '-1.5rem' }} as="h3">
          <code>{struct.name}</code>
          {' '}
          {/*{event.signatureHash && <code className="signature">{event.signatureHash}</code>}*/}
        </Header>
        <Header as="h4">
          {struct.title }
        </Header>
        {/*{event.notice && <ReactMarkdown containerTagName="h4" source={event.notice} />}*/}
        {struct.description &&
        <ReactMarkdown source={struct.description}/>}
        {struct.paramsSeq.length &&
        <Table definition>
          <Table.Body>
            {this.renderParams(struct, contract)}
          </Table.Body>
        </Table>
        }
      </Segment>
    );
  }
}

Struct.propTypes = {
  struct: PropTypes.object,
  contract: PropTypes.object,
};
