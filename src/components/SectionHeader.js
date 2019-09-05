import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class SectionHeader extends Component {
  render() {
    return <header className='section-header'>{this.props.title}</header>;
  }
}

SectionHeader.propTypes = {
  title: PropTypes.string
};
