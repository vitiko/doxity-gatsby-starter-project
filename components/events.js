import React, { PropTypes, Component } from 'react'

import sortBy from 'sort-by'

import Event from './event'

export default class Events extends Component {
  render() {
    const { contract } = this.props


    return (
      <div className="events">
        {contract.abiDocs.sort(sortBy('type', 'name'))
          .filter ((abiPart) => abiPart.type == 'event')
          .map((event) => {
          return <Event key={`${contract.name}${event.signature}`} event={event} contract={contract} />
        })}
      </div>
    )
  }
}

Events.propTypes = {
  contract: PropTypes.object,
}
