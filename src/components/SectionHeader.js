import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class SectionHeader extends Component {
  render() {
    return <header className='section-header'>{this.props.title}</header>;
  }
}

SectionHeader.propTypes = {
  title: PropTypes.string
};
