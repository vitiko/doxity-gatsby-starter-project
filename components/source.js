import React, { PropTypes, Component } from 'react'

import hljs from 'highlight.js'
import hljsDefineSolidity from 'highlightjs-solidity'
import '../css/hljs-atom-one.css'

hljsDefineSolidity(hljs)

export default class Source extends Component {
  componentDidMount() {
    hljs.highlightBlock(this.refs.highlight)
  }
  render() {
    const { contract } = this.props
    return (
      <div className="source">
        <h3>Source Code</h3>
        <pre ref="highlight">
          <code>{contract.source}</code>
        </pre>
      </div>
    )
  }
}

Source.propTypes = {
  contract: PropTypes.object,
}
