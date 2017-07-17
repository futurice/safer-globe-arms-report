import React, {Component} from 'react';
import PropTypes from 'prop-types';
import d3 from 'd3';

class DataMap extends Component {
  render() {
    return (
      <div>
        <p>Mapness</p>
      </div>
    );
  }
}

DataMap.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default DataMap;
