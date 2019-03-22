import Fade from '@material-ui/core/Fade';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import appState from '../store/appState';
import SectionHeader from './SectionHeader';
import util from './util';

class CourseWorkItem extends Component {
  render() {
    return (
      <section className='courseWork-item item'>
        <p>
          <span className='bold'>{this.props.name}</span>:{' '}
          {this.props.items.join(', ')}
        </p>
      </section>
    );
  }
}

class courseWork extends Component {
  render() {
    if (!toJS(appState.coursework.data)) {
      return <div />;
    } else {
      return (
        appState.coursework.show && (
          <Fade in={true} timeout={500}>
            <section className='courseWork' id='courseWork'>
              <SectionHeader title='Course Work' />
              {util.getListOf(
                CourseWorkItem,
                toJS(appState.coursework.data),
                false
              )}
            </section>
          </Fade>
        )
      );
    }
  }
}

CourseWorkItem.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array
};

export default observer(courseWork);
