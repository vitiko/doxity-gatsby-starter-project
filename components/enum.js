import React, {PropTypes, Component} from 'react'
import {Table, Segment, Label, Header} from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

export default class Enum extends Component {
  renderParams(enumInfo) {


    return enumInfo.members.map((memberName, i) => {


      const param = enumInfo.params[memberName];

      return (
        <Table.Row key={i}>

          <Table.Cell>{`${i}`}</Table.Cell>
          <Table.Cell><code>{memberName}</code></Table.Cell>

          <Table.Cell>
            {param && param.description && <ReactMarkdown source={param.description}/>}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    const { enumInfo } = this.props;

    const color = 'blue';
    return (
      <Segment color={color}>
        <Label ribbon="right" color={color}>Struct</Label>
        <Header style={{ marginTop: '-1.5rem' }} as="h3">
          <code>{enumInfo.name}</code>
          {' '}
          {/*{event.signatureHash && <code className="signature">{event.signatureHash}</code>}*/}
        </Header>
        <Header as="h4">
          {enumInfo.title }
        </Header>
        {/*{event.notice && <ReactMarkdown containerTagName="h4" source={event.notice} />}*/}
        {enumInfo.description &&
        <ReactMarkdown source={enumInfo.description}/>}
        {enumInfo.members.length &&
        <Table definition>
          <Table.Body>
            {this.renderParams(enumInfo)}
          </Table.Body>
        </Table>
        }
      </Segment>
    );
  }
}

Enum.propTypes = {
  enumInfo: PropTypes.object,
  contract: PropTypes.object,
};
